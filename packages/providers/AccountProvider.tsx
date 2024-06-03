import React, { useContext } from "react";
import Modal from "react-modal";
import { WalletClientSigner } from "@alchemy/aa-core";
import { generateSuperSubSmartWallet } from "../utils/utils";
import { MultiOwnerModularAccount } from "@alchemy/aa-accounts";
import {
  useState,
  useEffect,
  ReactNode,
  ReactElement,
  createContext,
} from "react";
import {
  usePrivy,
  useLogin,
  useWallets,
  ConnectedWallet,
  useMfaEnrollment,
  useLogout,
} from "@privy-io/react-auth";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// SUBSCRIPTION PLUGINS SETUP
import PluginClient from "../contracts/subscriptionPlugin";
import { SubscriptionModal } from "../components";

type IModals = "subscription-modal";

const AcctProvider = ({ children }: AcctProviderProps) => {
  // MODAL STATE
  const [modalStatus, setModalStatus] = useState(false);
  const [activeModal, setActiveModal] = useState<IModals>("subscription-modal");

  // SMART WALLET STATE
  const [isSmartAccountReady, setIsSmartAccountReady] = useState(false);
  const [smartAccount, setSmartAccount] =
    useState<MultiOwnerModularAccount<WalletClientSigner> | null>(null);

  // **
  // SUBSCRIPTION PLUGINS CLIENT
  // **
  const [pluginClient, setPluginClient] = useState<PluginClient | null>(null);

  // PRIVY HOOKS
  const { logout } = useLogout();
  const { wallets } = useWallets();
  const { ready, authenticated, user } = usePrivy();
  const { showMfaEnrollmentModal } = useMfaEnrollment();
  const { login } = useLogin({
    onOAuthLoginComplete: () => {
      showMfaEnrollmentModal();
    },
  });

  // COMPUTED PRIVY VALUES
  const isMfaEnabled = (user?.mfaMethods.length ?? 0) > 0;
  const embeddedWallet = wallets.find(
    (wallet) => wallet.walletClientType === "privy"
  );

  // LOGIN USER
  const userLogin = async () => {
    if (!authenticated) {
      login();
    } else if (!isMfaEnabled) {
      showMfaEnrollmentModal();
    }
  };

  // CREATE SMART WALLET
  const createSmartWallet = async (privyEoa: ConnectedWallet) => {
    const { account, pluginClient } = await generateSuperSubSmartWallet(
      privyEoa
    );

    setSmartAccount(account);
    setPluginClient(pluginClient);
    setIsSmartAccountReady(true);
  };

  // IF EMBEDDED WALLET IS AVAILABLE,
  // CREATE SMART WALLET
  useEffect(() => {
    embeddedWallet?.address ? createSmartWallet(embeddedWallet) : null;
  }, [embeddedWallet?.address]);

  // FETCH PRODUCT DETAILS
  const [reqData, setReqData] = useState<IOpenModalArgs>({
    apiKey: "",
    productId: undefined,
    defaultPlanId: undefined,
  });

  const [productDetails, setProductDetails] = useState({
    data: null,
    error: false,
    isLoading: false,
  });

  const getProductDetails = async ({
    apiKey = reqData.apiKey!,
    productId = reqData.productId!,
  }: IGetProductArgs) => {
    setProductDetails((prev) => ({ ...prev, isLoading: true }));

    try {
      const res = await fetch(
        `https://supersub.up.railway.app/api/products/${productId}`,
        {
          headers: {
            "X-API-KEY": apiKey,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch product details");

      const data = await res.json();

      setProductDetails({
        error: false,
        isLoading: false,
        data: data?.data?.product,
      });
    } catch (error) {
      setProductDetails((prev) => ({ ...prev, error: true, isLoading: false }));
    }
  };

  // **
  // SUBSCRIPTION PLUGINS METHODS
  // **

  const subscribeToPlan = async (planId: number) => {
    // login then subscribe
    if (!authenticated) {
      await userLogin();
    }
    console.log("subscribing to plan", planId);

    // subscribe to plan
    const userOpRes = await pluginClient?.subscribe(planId, 0);
    console.log(userOpRes);
  };

  // CLOSE MODAL
  const closeModal = () => {
    setModalStatus(false);

    // if user is signed in, log them out
    if (authenticated) {
      logout();
    }
  };

  const openSubscription = ({
    modal = "subscription-modal",
    productId,
    defaultPlanId,
    apiKey,
  }: IOpenModalArgs) => {
    setActiveModal(modal);
    setModalStatus(true);

    if (modal === "subscription-modal") {
      setReqData({
        apiKey: apiKey!,
        productId: productId!,
        defaultPlanId: defaultPlanId!,
      });
      getProductDetails({ productId: productId!, apiKey: apiKey! });
    }
  };

  return (
    <AcctContext.Provider
      value={{
        ready,
        isMfaEnabled,
        authenticated,
        isSmartAccountReady,
        smartAddress: smartAccount?.address,

        login: userLogin,
        subscribeToPlan,

        //
        defaultPlanId: reqData.defaultPlanId,

        // MODAL STATE
        activeModal,
        productDetails,

        closeModal,
        openSubscription,
        getProductDetails,
      }}
    >
      <>
        <Modal
          style={customStyles}
          isOpen={modalStatus}
          onRequestClose={closeModal}
          bodyOpenClassName={"modal-open"}
        >
          {activeModal === "subscription-modal" ? (
            <SubscriptionModal />
          ) : //
          null}
        </Modal>

        {children}
      </>
    </AcctContext.Provider>
  );
};

export default AcctProvider;

interface AcctProviderProps {
  children: ReactElement[] | ReactElement | ReactNode;
}

interface IOpenModalArgs {
  modal?: IModals;
  productId?: number;
  apiKey?: string;
  defaultPlanId?: number;
}

interface IGetProductArgs {
  apiKey?: string;
  productId?: number;
}

interface AcctContextType {
  // user: User | null;
  ready: boolean;
  isMfaEnabled: boolean;
  authenticated: boolean;
  isSmartAccountReady: boolean;
  smartAddress: string | undefined;

  login: () => void;
  subscribeToPlan: (planId: number) => void;

  //
  defaultPlanId: number | undefined;

  // MODAL STATE
  activeModal: string;
  closeModal: () => void;
  productDetails: {
    data: any;
    error: boolean;
    isLoading: boolean;
  };
  openSubscription: ({ modal, productId, apiKey }: IOpenModalArgs) => void;
  getProductDetails: ({ productId, apiKey }: IGetProductArgs) => void;
}

export const AcctContext = createContext<AcctContextType>(
  {} as AcctContextType
);

export const useSuperSub = () => {
  const value = useContext(AcctContext);
  if (!value) {
    throw new Error("useSuperSub must be wrapped in a <SuperSubProvider />");
  }
  return value;
};
