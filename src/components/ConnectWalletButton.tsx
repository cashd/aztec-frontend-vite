import { InjectedConnector, Signer } from "@wagmi/core";
import { useCreateAztec } from "aztec/hooks/useCreateAztec.js";
import { formatAddress } from "utils/index.js";
import { useAccount, useConnect } from "wagmi";

interface ConnectWalletButtonProps {
  disabled?: boolean;
}

export function ConnectWalletButton({}: ConnectWalletButtonProps) {
  const { connect } = useConnect({
    connector: new InjectedConnector(),
    onSuccess: () => {},
  });

  const { mutate: createAztecSDK } = useCreateAztec();

  const { address, isConnected } = useAccount({
    onConnect: async ({ connector }) => {
      console.log("connected!");
      const _signer: Signer = await connector?.getSigner();

      if (_signer) {
        await createAztecSDK({ signer: _signer });
      } else {
        console.warn("no signer");
      }
    },
  });

  return (
    <button
      className="delay-20 btn p-2 font-bold transition ease-in-out hover:scale-105 hover:shadow-lg"
      onClick={() => connect()}
      disabled={isConnected}
    >
      {address ? formatAddress(address) : "Connect Wallet"}
    </button>
  );
}
