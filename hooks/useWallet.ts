"use client";

import { useState, useCallback } from "react";

interface WalletState {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  chainId: string | null;
}

const MOCK_ADDRESS = "init1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s";

export function useWallet() {
  const [state, setState] = useState<WalletState>({
    address: null,
    isConnected: false,
    isConnecting: false,
    chainId: null,
  });

  const connect = useCallback(async () => {
    setState((prev) => ({ ...prev, isConnecting: true }));

    // Simulate wallet connection
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setState({
      address: MOCK_ADDRESS,
      isConnected: true,
      isConnecting: false,
      chainId: "initiation-2",
    });
  }, []);

  const disconnect = useCallback(() => {
    setState({
      address: null,
      isConnected: false,
      isConnecting: false,
      chainId: null,
    });
  }, []);

  return {
    ...state,
    connect,
    disconnect,
  };
}
