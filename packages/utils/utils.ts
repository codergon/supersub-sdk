import { createWalletClient, custom } from "viem";
import { ConnectedWallet } from "@privy-io/react-auth";
import { polygonAmoy, WalletClientSigner } from "@alchemy/aa-core";
import { createModularAccountAlchemyClient } from "@alchemy/aa-alchemy";

import { clientConfig } from "../contracts/data";
import PluginClient from "../contracts/subscriptionPlugin";

import {
  SS_ALCHEMY_API_KEY,
  SS_ACCOUNT_ABSTRATION_POLICY_ID,
} from "./constants";

type SuperSubSmartWallet = {
  smartAccountClient: any;
  pluginClient: any;
  account: any;
};

const generateSuperSubSmartWallet = async (
  privyEoa: ConnectedWallet
): Promise<SuperSubSmartWallet> => {
  const privyProvider = await privyEoa.getEthereumProvider();
  const privyClient = createWalletClient({
    account: privyEoa.address as `0x${string}`,
    transport: custom(privyProvider),
  });
  const privySigner = new WalletClientSigner(privyClient, "json-rpc");

  const smartAccountClient = await createModularAccountAlchemyClient({
    chain: polygonAmoy,
    signer: privySigner,
    apiKey: SS_ALCHEMY_API_KEY,
    gasManagerConfig: {
      policyId: SS_ACCOUNT_ABSTRATION_POLICY_ID,
    },
  });

  const client = new PluginClient(
    polygonAmoy,
    clientConfig.subscriptionPluginAddr,
    clientConfig.abi,
    clientConfig.ccipBridgeAddr,
    clientConfig.bridgeAbi,

    smartAccountClient,
    clientConfig.provider
  );

  return {
    smartAccountClient,
    pluginClient: client,
    account: smartAccountClient.account,
  };
};

export { generateSuperSubSmartWallet };
