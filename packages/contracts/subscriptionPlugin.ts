import {
  Address,
  UserOperationCallData,
  BatchUserOperationCallData,
} from "@alchemy/aa-core";
import {
  accountLoupeActions,
  pluginManagerActions,
} from "@alchemy/aa-accounts";
import { AlchemySmartAccountClient } from "@alchemy/aa-alchemy";
import { ethers, Contract, Networkish, AlchemyProvider } from "ethers";
import { SubscriptionPlugin, SubscriptionTokenBridge } from "./typechain-types";

class PluginClient {
  // signer: Wallet;
  chain: Networkish;
  pluginAddress: Address;
  pluginContract: SubscriptionPlugin;
  bridgeContract: SubscriptionTokenBridge;
  smartAccountClient: AlchemySmartAccountClient;

  constructor(
    chain: Networkish,
    pluginAddr: Address,
    pluginAbi: ethers.Interface | ethers.InterfaceAbi,
    bridgeAddr: Address,
    bridgeAbi: ethers.Interface | ethers.InterfaceAbi,
    client: AlchemySmartAccountClient,
    provider: AlchemyProvider
    // signer: Wallet
  ) {
    this.chain = chain;
    // this.signer = signer;
    this.pluginAddress = pluginAddr;
    this.pluginContract = new Contract(
      pluginAddr,
      pluginAbi,
      provider
    ) as unknown as SubscriptionPlugin;
    this.bridgeContract = new Contract(
      bridgeAddr,
      bridgeAbi,
      provider
    ) as unknown as SubscriptionTokenBridge;
    this.smartAccountClient = client;
  }

  async getInstalledPluginsForSmartAccount() {
    const accountLoupeActionsExtendedClient =
      this.smartAccountClient.extend(accountLoupeActions);
    //@ts-ignore
    return await accountLoupeActionsExtendedClient.getInstalledPlugins({});
  }

  async isPluginInstalled() {
    const accountLoupeActionsExtendedClient =
      this.smartAccountClient.extend(accountLoupeActions);
    const installedPlugins =
      //@ts-ignore
      await accountLoupeActionsExtendedClient.getInstalledPlugins({});

    console.log(installedPlugins);
    if (
      installedPlugins
        .map((addr) => addr.toLowerCase())
        .includes(this.pluginAddress.toLowerCase())
    ) {
      return true;
    }
    return false;
  }

  async installPlugin() {
    const pluginDependency0 = (await this.pluginContract.pack(
      "0xcE0000007B008F50d762D155002600004cD6c647",
      0
    )) as unknown as `0x${string}`;
    const pluginDependency1 = (await this.pluginContract.pack(
      "0xcE0000007B008F50d762D155002600004cD6c647",
      1
    )) as unknown as `0x${string}`;
    const accountLoupeActionsExtendedClient =
      this.smartAccountClient.extend(pluginManagerActions);
    //@ts-ignore
    await accountLoupeActionsExtendedClient.installPlugin({
      pluginAddress: this.pluginAddress,
      dependencies: [pluginDependency0, pluginDependency1],
    });
  }

  async execute(
    param: string | UserOperationCallData | BatchUserOperationCallData
  ) {
    const userOp = await this.smartAccountClient.sendUserOperation({
      //@ts-ignore
      uo: param,
    });
    const hash = await this.smartAccountClient.waitForUserOperationTransaction({
      hash: userOp.hash,
    });
    return hash;
  }

  async subscribe(planId: number, endTime: number) {
    if (!(await this.isPluginInstalled())) {
      await this.installPlugin();
    }
    const param = this.pluginContract.interface.encodeFunctionData(
      "subscribe",
      [planId, endTime]
    );
    const hash = await this.execute(param);
    console.log(`Subscribe Txn Hash: ${hash}`);
    return hash;
  }
}

export default PluginClient;
