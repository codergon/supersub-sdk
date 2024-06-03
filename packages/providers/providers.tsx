import React from "react";

import AcctProvider from "./AccountProvider";

import { config } from "../utils/wagmi";
import { WagmiProvider } from "@privy-io/wagmi";
import { PrivyProvider } from "@privy-io/react-auth";
import { SS_PRIVY_APP_ID } from "../utils/constants";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

interface SupersubProviderProps {
  children: JSX.Element;
}

export const SuperSubProvider = ({
  children,
}: SupersubProviderProps): JSX.Element => {
  return (
    <>
      <PrivyProvider
        appId={`${SS_PRIVY_APP_ID}`}
        config={{
          mfa: {
            noPromptOnMfaRequired: false,
          },
          appearance: {
            theme: "dark",
            logo: `https://res.cloudinary.com/alphaglitch/image/upload/v1717259453/eq5qecksgo2ilp1pye2u.webp`,
          },
          loginMethods: ["email", "google"],
          embeddedWallets: {
            createOnLogin: "users-without-wallets",
            noPromptOnSignature: false,
          },
        }}
      >
        <QueryClientProvider client={queryClient}>
          <WagmiProvider config={config}>
            <AcctProvider>{children}</AcctProvider>
          </WagmiProvider>
        </QueryClientProvider>
      </PrivyProvider>
    </>
  );
};

export default SuperSubProvider;
