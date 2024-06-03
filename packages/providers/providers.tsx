import React from "react";

import AcctProvider from "./AccountProvider";

import { Toaster } from "sonner";
import { config } from "../utils/wagmi";
import { WagmiProvider } from "@privy-io/wagmi";
import { PrivyProvider } from "@privy-io/react-auth";
import { SS_PRIVY_APP_ID } from "../utils/constants";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Info,
  XCircle,
  CheckCircle,
  WarningCircle,
} from "@phosphor-icons/react";

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
            logo: `https://res.cloudinary.com/alphaglitch/image/upload/v1717428083/dnyj76cptuilpvw7o8mt.png`,
          },
          loginMethods: ["email"],
          embeddedWallets: {
            createOnLogin: "users-without-wallets",
            noPromptOnSignature: false,
          },
        }}
      >
        <QueryClientProvider client={queryClient}>
          <WagmiProvider config={config}>
            <AcctProvider>
              {children}

              <Toaster
                theme="dark"
                position="top-center"
                className="toast-block"
                icons={{
                  info: <Info size={16} weight="fill" color="#eba267" />,
                  error: <XCircle size={16} weight="fill" color="#ff5c5c" />,
                  success: (
                    <CheckCircle size={18} weight="fill" color="#16f19d" />
                  ),
                  warning: (
                    <WarningCircle size={16} weight="fill" color="#eba267" />
                  ),
                }}
              />
            </AcctProvider>
          </WagmiProvider>
        </QueryClientProvider>
      </PrivyProvider>
    </>
  );
};

export default SuperSubProvider;
