import { EthAddress, TxSettlementTime } from "@aztec/sdk";
import { useMutation } from "@tanstack/react-query";
import { depositEthToAztec } from "aztec/utils.js";
import { ERROR_SDK_NOT_INIT } from "errors.js";
import { BigNumber, Signer } from "ethers";
import { useAztec } from "./useAztec.js";

interface useBridgeEthArgs {
  amount: BigNumber;
  signer: Signer;
}

export function useBridgeEth() {
  const { aztecSDK, accountPublicKey } = useAztec();

  return useMutation(async ({ amount, signer }: useBridgeEthArgs) => {
    if (!aztecSDK || !accountPublicKey) {
      throw new Error(ERROR_SDK_NOT_INIT);
    }

    // parse string with 18 decimals
    const depositTokenQuantity = amount.toBigInt();

    // await sdk sync
    await aztecSDK.awaitUserSynchronised(accountPublicKey);

    const txId = await depositEthToAztec(
      EthAddress.fromString(await signer.getAddress()),
      accountPublicKey,
      depositTokenQuantity,
      TxSettlementTime.INSTANT,
      aztecSDK,
      signer
    );

    return txId;
  });
}

// async function depositEth(
//   amount: string,
//   accountPublicKey: GrumpkinAddress,
//   sdk: AztecSdk,
//   signer: WagmiSigner
// ) {
//   try {
//     const depositTokenQuantity: bigint = ethers.utils
//       .parseEther(amount)
//       .toBigInt();

//     await sdk.awaitUserSynchronised(accountPublicKey);

//     let txId = await depositEthToAztec(
//       EthAddress.fromString(await signer.getAddress()),
//       accountPublicKey,
//       depositTokenQuantity,
//       TxSettlementTime.INSTANT,
//       sdk,
//       signer
//     );

//     console.log("Deposit TXID:", txId.toString());
//   } catch (e) {
//     console.log(e); // e.g. depositTokenQuantity = 0
//   }
// }
