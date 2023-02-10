export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatAddress(address: string): string {
  return `0x${address.slice(2, 4)}...${address.slice(-4)}`;
}
