/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export interface SubscriptionTokenBridgeInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "acceptOwnership"
      | "addDestinationChainSupport"
      | "allowedDestinationChains"
      | "owner"
      | "transferOwnership"
      | "transferToken"
      | "transferTokenPayNative"
      | "withdrawNative"
      | "withdrawToken"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "OwnershipTransferRequested"
      | "OwnershipTransferred"
      | "TokenTransferred"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "acceptOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "addDestinationChainSupport",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "allowedDestinationChains",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "transferToken",
    values: [
      BigNumberish,
      AddressLike,
      AddressLike,
      BigNumberish,
      BigNumberish,
      BigNumberish,
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "transferTokenPayNative",
    values: [
      BigNumberish,
      AddressLike,
      AddressLike,
      BigNumberish,
      BigNumberish,
      BigNumberish,
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawNative",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawToken",
    values: [AddressLike, AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "acceptOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addDestinationChainSupport",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "allowedDestinationChains",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferTokenPayNative",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawNative",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawToken",
    data: BytesLike
  ): Result;
}

export namespace OwnershipTransferRequestedEvent {
  export type InputTuple = [from: AddressLike, to: AddressLike];
  export type OutputTuple = [from: string, to: string];
  export interface OutputObject {
    from: string;
    to: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [from: AddressLike, to: AddressLike];
  export type OutputTuple = [from: string, to: string];
  export interface OutputObject {
    from: string;
    to: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TokenTransferredEvent {
  export type InputTuple = [
    messageId: BytesLike,
    destinationChainSelector: BigNumberish,
    receipient: AddressLike,
    token: AddressLike,
    feeToken: AddressLike,
    amount: BigNumberish,
    fees: BigNumberish,
    subscriptionId: BigNumberish,
    planId: BigNumberish,
  ];
  export type OutputTuple = [
    messageId: string,
    destinationChainSelector: bigint,
    receipient: string,
    token: string,
    feeToken: string,
    amount: bigint,
    fees: bigint,
    subscriptionId: bigint,
    planId: bigint,
  ];
  export interface OutputObject {
    messageId: string;
    destinationChainSelector: bigint;
    receipient: string;
    token: string;
    feeToken: string;
    amount: bigint;
    fees: bigint;
    subscriptionId: bigint;
    planId: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface SubscriptionTokenBridge extends BaseContract {
  connect(runner?: ContractRunner | null): SubscriptionTokenBridge;
  waitForDeployment(): Promise<this>;

  interface: SubscriptionTokenBridgeInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  acceptOwnership: TypedContractMethod<[], [void], "nonpayable">;

  addDestinationChainSupport: TypedContractMethod<
    [_chainSelector: BigNumberish],
    [void],
    "nonpayable"
  >;

  allowedDestinationChains: TypedContractMethod<
    [arg0: BigNumberish],
    [boolean],
    "view"
  >;

  owner: TypedContractMethod<[], [string], "view">;

  transferOwnership: TypedContractMethod<
    [to: AddressLike],
    [void],
    "nonpayable"
  >;

  transferToken: TypedContractMethod<
    [
      _chainSelector: BigNumberish,
      _receiver: AddressLike,
      _token: AddressLike,
      _amount: BigNumberish,
      _subId: BigNumberish,
      _planId: BigNumberish,
    ],
    [void],
    "nonpayable"
  >;

  transferTokenPayNative: TypedContractMethod<
    [
      _chainSelector: BigNumberish,
      _receiver: AddressLike,
      _token: AddressLike,
      _amount: BigNumberish,
      _subId: BigNumberish,
      _planId: BigNumberish,
    ],
    [void],
    "nonpayable"
  >;

  withdrawNative: TypedContractMethod<
    [_beneficiary: AddressLike],
    [void],
    "nonpayable"
  >;

  withdrawToken: TypedContractMethod<
    [_beneficiary: AddressLike, _token: AddressLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "acceptOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "addDestinationChainSupport"
  ): TypedContractMethod<[_chainSelector: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "allowedDestinationChains"
  ): TypedContractMethod<[arg0: BigNumberish], [boolean], "view">;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[to: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "transferToken"
  ): TypedContractMethod<
    [
      _chainSelector: BigNumberish,
      _receiver: AddressLike,
      _token: AddressLike,
      _amount: BigNumberish,
      _subId: BigNumberish,
      _planId: BigNumberish,
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "transferTokenPayNative"
  ): TypedContractMethod<
    [
      _chainSelector: BigNumberish,
      _receiver: AddressLike,
      _token: AddressLike,
      _amount: BigNumberish,
      _subId: BigNumberish,
      _planId: BigNumberish,
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "withdrawNative"
  ): TypedContractMethod<[_beneficiary: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "withdrawToken"
  ): TypedContractMethod<
    [_beneficiary: AddressLike, _token: AddressLike],
    [void],
    "nonpayable"
  >;

  getEvent(
    key: "OwnershipTransferRequested"
  ): TypedContractEvent<
    OwnershipTransferRequestedEvent.InputTuple,
    OwnershipTransferRequestedEvent.OutputTuple,
    OwnershipTransferRequestedEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;
  getEvent(
    key: "TokenTransferred"
  ): TypedContractEvent<
    TokenTransferredEvent.InputTuple,
    TokenTransferredEvent.OutputTuple,
    TokenTransferredEvent.OutputObject
  >;

  filters: {
    "OwnershipTransferRequested(address,address)": TypedContractEvent<
      OwnershipTransferRequestedEvent.InputTuple,
      OwnershipTransferRequestedEvent.OutputTuple,
      OwnershipTransferRequestedEvent.OutputObject
    >;
    OwnershipTransferRequested: TypedContractEvent<
      OwnershipTransferRequestedEvent.InputTuple,
      OwnershipTransferRequestedEvent.OutputTuple,
      OwnershipTransferRequestedEvent.OutputObject
    >;

    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;

    "TokenTransferred(bytes32,uint64,address,address,address,uint256,uint256,uint256,uint256)": TypedContractEvent<
      TokenTransferredEvent.InputTuple,
      TokenTransferredEvent.OutputTuple,
      TokenTransferredEvent.OutputObject
    >;
    TokenTransferred: TypedContractEvent<
      TokenTransferredEvent.InputTuple,
      TokenTransferredEvent.OutputTuple,
      TokenTransferredEvent.OutputObject
    >;
  };
}