import { useBridgeEth } from "aztec/hooks/useBridgeEth.js";
import { ConnectWalletButton } from "components/ConnectWalletButton.js";
import { TokenInput } from "components/TokenInput.js";
import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils.js";
import { ReactElement, useState } from "react";
import { useAccount, useBalance, useSigner } from "wagmi";

export function Index(): ReactElement {
  const { mutate: bridgeEth } = useBridgeEth();
  const { data: signer } = useSigner();

  const { address, isConnected } = useAccount();

  const { data: balance } = useBalance({
    address,
    // chainId: 1337,
  });

  const [bridgeAmount, setBridgeAmount] = useState<BigNumber>(
    BigNumber.from(0)
  );

  console.log(balance);

  return (
    <div className="h-screen px-10">
      <div className="m-auto flex max-w-lg flex-col gap-y-10 pt-36">
        <h1 className="text-4xl font-bold">Aztec Vite Project</h1>
        <ConnectWalletButton />

        <div>
          <h2 className="mb-2 text-2xl font-medium">Bridge ETH</h2>
          <TokenInput
            onChange={(value: BigNumber) => {
              console.log("new value from input is ", formatEther(value));
              setBridgeAmount(value);
            }}
            tokenBalance={balance?.value}
            tokenDecimals={18}
            tokenSymbol="ETH"
            disabled={!isConnected}
          />
        </div>

        <button
          className="btn p-2 font-bold"
          onClick={async () => {
            console.log(bridgeAmount.toString());
            if (signer) {
              bridgeEth({
                amount: bridgeAmount,
                signer: signer,
              });
            } else {
              console.log("no signer, bridge eth");
            }
          }}
        >
          BRIDGE ETH
        </button>
      </div>
    </div>
  );
}
