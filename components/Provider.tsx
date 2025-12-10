'use client';

import type { ReactNode } from 'react';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { base } from 'wagmi/chains'; 
export function Provider(props: { children: ReactNode }) {
  return (
    <OnchainKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={base} 
      projectId={process.env.NEXT_PUBLIC_CDP_PROJECT_ID}
    >
      {props.children}
    </OnchainKitProvider>
  );
}