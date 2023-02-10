import { BigNumber } from "ethers";
import { formatUnits, parseUnits } from "ethers/lib/utils.js";
import { useState } from "react";

interface TokenInputProps {
  onChange: (value: BigNumber) => void;
  tokenBalance: BigNumber | undefined;
  tokenDecimals: number;
  tokenSymbol: string;
  disabled?: boolean;
}

export function TokenInput({
  onChange,
  tokenBalance,
  tokenDecimals,
  tokenSymbol,
  disabled,
}: TokenInputProps) {
  const [inputAmount, setInputAmount] = useState("0");

  return (
    <div className="flex w-full">
      <div className="form-control w-full">
        <input
          type="text"
          placeholder="0"
          className="input-bordered input w-full"
          disabled={disabled}
          value={inputAmount}
          onChange={(event: React.FormEvent<HTMLInputElement>) => {
            setInputAmount(event.currentTarget.value);

            try {
              const parsedBN = parseUnits(
                event.currentTarget.value,
                tokenDecimals
              );
              onChange(parsedBN);
            } catch (e) {
              // catching error
            }
          }}
        />

        {!disabled && (
          <label className="label">
            <span className="label-text-alt">
              {tokenBalance ? formatUnits(tokenBalance, tokenDecimals) : "0"}{" "}
              {tokenSymbol}
            </span>
            <span className="label-text-alt"></span>
          </label>
        )}
      </div>
      <button
        className="btn"
        disabled={disabled || !tokenBalance}
        onClick={() => {
          setInputAmount(formatUnits(tokenBalance!, tokenDecimals));
          onChange(tokenBalance!);
        }}
      >
        Max
      </button>
    </div>
  );
}

function validateInput(input: string, decimals: number) {
  // /^\d*\.?\d+$/
}
