// import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains } from "wagmi";
import { localhost, mainnet } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const RPC_KEY = import.meta.env.VITE_RPC_KEY;

if (!RPC_KEY) {
  throw new Error("Provide an RPC_KEY variable in .env");
}

const { chains, provider } = configureChains(
  [mainnet, localhost],
  [alchemyProvider({ apiKey: RPC_KEY }), publicProvider()]
);

// const { connectors } = getDefaultWallets({
//     appName: 'zkElement Finance',
//     chains,
// });

export { chains, provider };
