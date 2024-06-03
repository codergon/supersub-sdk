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
import { toast } from "sonner";

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

  // REQUEST DATA
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
  const [selectedPlan, updateSelectedPlan] = useState<number | undefined>(
    reqData?.defaultPlanId ??
      (productDetails?.data as any)?.plans[0].onchainReference
  );

  useEffect(() => {
    if (selectedPlan) return;
    updateSelectedPlan(
      reqData?.defaultPlanId ??
        (productDetails?.data as any)?.plans[0].onchainReference
    );
  }, [reqData.defaultPlanId, productDetails?.data]);

  // PRIVY HOOKS
  const { logout } = useLogout();
  const { wallets } = useWallets();
  const { ready, authenticated, user } = usePrivy();
  const { showMfaEnrollmentModal } = useMfaEnrollment();
  const { login } = useLogin({
    onOAuthLoginComplete: () => {
      showMfaEnrollmentModal();
    },
    onComplete: async () => {
      // subscribe to plan
      try {
        const userOpRes = await pluginClient?.subscribe(selectedPlan!, 0);
        console.log(userOpRes);
        toast.success(
          `Subscribed to ${
            (productDetails.data as any)?.name ?? "plan"
          } successfully"`
        );
      } catch (error: any) {
        toast.error(
          "Failed to subscribe" +
            (error?.details
              ? " with code " + JSON.parse(error?.details)?.code
              : ""),
          {
            description: error?.details
              ? JSON.parse(error?.details)?.message
              : undefined,
          }
        );
      }
    },
  });

  // COMPUTED PRIVY VALUES
  const isMfaEnabled = (user?.mfaMethods.length ?? 0) > 0;
  const embeddedWallet = wallets.find(
    (wallet) => wallet.walletClientType === "privy"
  );

  // REMOVE "I HAVE PASSKEY BUTTON"
  const checkForPasskeyBtn = async () => {
    if (!document.getElementById("privy-modal-content")) return;

    const btns = document.querySelectorAll("#privy-dialog button");
    console.log(btns);

    btns?.forEach((btn) => {
      if (btn.textContent === "I have a passkey") {
        btn.remove();
      }
    });
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

  // LOGIN THEN SUBSCRIBE
  const subscribeToPlan = async () => {
    if (!authenticated) {
      login();
      setTimeout(checkForPasskeyBtn, 120);
    } else if (!isMfaEnabled) {
      showMfaEnrollmentModal();
    }

    console.log("subscribing to plan", selectedPlan);
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

        subscribeToPlan,

        selectedPlan,
        updateSelectedPlan,

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

  subscribeToPlan: () => void;

  //
  defaultPlanId: number | undefined;

  selectedPlan: number | undefined;
  updateSelectedPlan: (selectedPlan: number) => void;

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
