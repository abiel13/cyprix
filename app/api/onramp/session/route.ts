import { NextRequest, NextResponse } from "next/server";
import { generateJwt } from "@coinbase/cdp-sdk/auth";

export async function POST(request: NextRequest) {
    try {
        // Parse request body
        const body = await request.json();
        const { address, network = "base", assets } = body;

        if (!address) {
            return NextResponse.json(
                { error: "Wallet address is required" },
                { status: 400 }
            );
        }

        const apiKeyId = process.env.KEY_NAME || '661e54da-e4c6-49ff-94f4-ed9149c87be5';
        const apiKeySecret = process.env.KEY_SECRET || 'OyoybmdpfpZr3dsZOom0vqDRYhWkg55ngBIU3RTyhRYMawMOMNqx+GgaMTHfiJ8pTZZZ7YqfvStSC4JA60I70Q==';

        // Get client IP address for security validation
        const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
            request.headers.get('x-real-ip') ||
            '127.0.0.1';

        console.log("Client IP from headers:", clientIp);
        console.log("API Key ID:", apiKeyId);

        // Map network names to blockchain identifiers
        const NETWORK_TO_BLOCKCHAIN: Record<string, string> = {
            ethereum: "ethereum",
            bitcoin: "bitcoin",
            cardano: "cardano",
            solana: "solana",
            xrp: "xrp",
            base: "base",
            polygon: "polygon"
        };

        const blockchain = NETWORK_TO_BLOCKCHAIN[network] || network;

        // Prepare addresses array for the Session Token API
        const addresses = [{
            address: address,
            blockchains: [blockchain]
        }];

        // Prepare request payload
        const tokenRequestPayload: any = {
            addresses: addresses,
            clientIp: clientIp
        };

        // Add assets if provided
        if (assets && Array.isArray(assets) && assets.length > 0) {
            tokenRequestPayload.assets = assets;
        }

        // Generate JWT for authentication using CDP SDK
        // The CDP SDK handles all the JWT generation complexity for us
        let jwtToken: string;
        try {
            jwtToken = await generateJwt({
                apiKeyId: apiKeyId,
                apiKeySecret: apiKeySecret,
                requestMethod: 'POST',
                requestHost: 'api.developer.coinbase.com',
                requestPath: '/onramp/v1/token',
                expiresIn: 120 // 2 minutes (default)
            });
            console.log("JWT generated successfully");
            console.log("JWT Token (first 50 chars):", jwtToken.substring(0, 50) + "...");
            console.log("JWT Token (full):", jwtToken);
        } catch (jwtError: any) {
            console.error("JWT generation error:", jwtError);
            throw new Error(`Failed to generate JWT: ${jwtError.message}`);
        }

        // Call the Session Token API with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

        console.log("Calling Session Token API...");
        console.log("Request payload:", JSON.stringify(tokenRequestPayload, null, 2));

        let sessionTokenResponse: Response;
        try {
            const apiUrl = 'https://api.developer.coinbase.com/onramp/v1/token';
            console.log("Making request to:", apiUrl);

            sessionTokenResponse = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`,
                    'Accept': 'application/json'
                },
                body: JSON.stringify(tokenRequestPayload),
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            console.log("Session Token API response status:", sessionTokenResponse.status);
            console.log("Response headers:", Object.fromEntries(sessionTokenResponse.headers.entries()));
        } catch (fetchError: any) {
            clearTimeout(timeoutId);
            console.error("Fetch error details:", {
                name: fetchError.name,
                message: fetchError.message,
                cause: fetchError.cause,
                stack: fetchError.stack
            });
            if (fetchError.name === 'AbortError' || fetchError.cause?.code === 'ETIMEDOUT') {
                throw new Error('Request to Coinbase API timed out. This is likely due to IP whitelisting. Please add your server IP to the Coinbase API key allowlist.');
            }
            throw new Error(`Failed to connect to Coinbase API: ${fetchError.message || 'Network error'}`);
        }

        if (!sessionTokenResponse.ok) {
            const errorText = await sessionTokenResponse.text();
            console.error("Session Token API error:", sessionTokenResponse.status, errorText);
            throw new Error(`Failed to create session token: ${sessionTokenResponse.status} ${errorText}`);
        }

        const sessionTokenData = await sessionTokenResponse.json();
        const sessionToken = sessionTokenData.token || sessionTokenData.sessionToken;

        if (!sessionToken) {
            throw new Error("Session token not found in API response");
        }

        // Build the onramp URL with the session token
        const onrampBaseUrl = "https://pay.coinbase.com/buy/select-asset";
        const onrampUrl = `${onrampBaseUrl}?sessionToken=${sessionToken}`;

        return NextResponse.json({
            sessionToken: sessionToken,
            onrampUrl: onrampUrl,
            clientSecret: sessionToken, // For FundButton compatibility
        });

    } catch (err: any) {
        console.error("Onramp session error:", err);
        return NextResponse.json(
            { error: err.message || "Failed to create onramp session" },
            { status: 500 }
        );
    }
}
