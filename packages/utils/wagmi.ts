import { http } from "wagmi";
import { polygonAmoy } from "wagmi/chains";
import { createConfig } from "@privy-io/wagmi";

export const config = createConfig({
  chains: [polygonAmoy],
  transports: {
    [polygonAmoy.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
