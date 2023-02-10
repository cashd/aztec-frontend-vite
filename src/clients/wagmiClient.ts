import { Chain, configureChains, createClient, mainnet } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

const RPC_KEY = import.meta.env.VITE_RPC_KEY;

if (!RPC_KEY) {
  throw new Error("Provide an RPC_KEY variable in .env");
}

const _localhost: Chain = {
  name: "Localhost",
  network: "localhost",
  nativeCurrency: {
    decimals: 18,
    name: "Ethereum",
    symbol: "ETH",
  },
  id: 1337,
  rpcUrls: {
    public: { http: ["http://localhost:8545/"] },
    default: { http: ["http://localhost:8545/"] },
  },
};

const { provider, webSocketProvider } = configureChains(
  [mainnet, _localhost],
  [
    alchemyProvider({ apiKey: RPC_KEY }),
    jsonRpcProvider({
      rpc: () => ({
        http: `http://localhost:8545`,
      }),
    }),
  ]
);

export const client = createClient({
  autoConnect: false,
  provider,
  webSocketProvider,
});
