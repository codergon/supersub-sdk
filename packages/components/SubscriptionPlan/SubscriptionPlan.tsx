import React from "react";
import { formatUnits } from "viem";
import { SubscriptionPlanProps } from "./SubscriptionPlan.types";

const ProductPlan = ({
  plan,
  token,
  selectedPlan,
  updateSelectedPlan,
}: SubscriptionPlanProps) => {
  const timeframes = {
    days: plan?.chargeInterval / 86400,
    weeks: plan?.chargeInterval / 604800,
    months: plan?.chargeInterval / 2628000,
    years: plan?.chargeInterval / 31536000,
  };

  const selectedTimeframe =
    timeframes["years"] > 1 && Number.isInteger(timeframes["years"])
      ? "years"
      : timeframes["months"] > 1 && Number.isInteger(timeframes["months"])
      ? "months"
      : timeframes["weeks"] > 1 && Number.isInteger(timeframes["weeks"])
      ? "weeks"
      : "days";

  return (
    <>
      <div className="product-plan">
        <div className="product-plan--display">
          <p>
            {formatUnits(plan?.price, token?.decimals)} {token?.symbol} — Every{" "}
            {plan?.interval}{" "}
            {/*
             * FORMAT TIMEFRAMES
             */}
            {`${
              timeframes[selectedTimeframe] > 1
                ? timeframes[selectedTimeframe] + " "
                : ""
            }${
              timeframes[selectedTimeframe] > 1
                ? selectedTimeframe
                : selectedTimeframe.slice(0, -1)
            }`}
          </p>
        </div>

        <button
          className="select-plan--btn"
          onClick={() => {
            updateSelectedPlan(plan?.onchainReference);
          }}
        >
          <div
            className="select-plan--btn__fill"
            data-active={plan.onchainReference === selectedPlan}
          />
        </button>
      </div>
    </>
  );
};

export default ProductPlan;
