import { AlchemyProvider } from "ethers";
import { Address } from "@alchemy/aa-core";
import { abi } from "./abis/SubscriptionPlugin.json";
import { abi as bridgeAbi } from "./abis/SubscriptionTokenBridge.json";

import {
  SS_ALCHEMY_API_KEY,
  SS_ACCOUNT_ABSTRATION_POLICY_ID,
} from "../utils/constants";

const subscriptionPluginAddr: Address =
  "0x37604f45111AB488aeC38DBb17F90Ef1CC90cc32";
const ccipBridgeAddr: Address = "0x28689f559337a8851b53ab5f3e0ddd39e5d145eb";

const ALCHEMY_API_KEY = SS_ALCHEMY_API_KEY;
const ACCOUNT_ABSTRATION_POLICY_ID = SS_ACCOUNT_ABSTRATION_POLICY_ID;

const provider = new AlchemyProvider("matic-amoy", ALCHEMY_API_KEY);

export const clientConfig = {
  // Contract abi(s)
  abi,
  bridgeAbi,

  // Alchemy
  ALCHEMY_API_KEY,
  ACCOUNT_ABSTRATION_POLICY_ID,

  // Provider
  provider,

  // Addresses
  ccipBridgeAddr,
  subscriptionPluginAddr,
};
