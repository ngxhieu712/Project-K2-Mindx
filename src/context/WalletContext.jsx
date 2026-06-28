// src/context/WalletContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";
import {
  getWallet,
  depositToWallet,
  withdrawFromWallet,
} from "../services/walletService";

const WalletContext = createContext(undefined);

export function WalletProvider({ children }) {
  const { user } = useAuth();
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  const refreshWallet = useCallback(async () => {
    if (!user) {
      setBalance(0);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const wallet = await getWallet();
      setBalance(Number(wallet.balance));
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Tải lại ví mỗi khi user đăng nhập/đăng xuất thay đổi
  useEffect(() => {
    refreshWallet();
  }, [refreshWallet]);

  async function deposit(amount, note) {
    setActionLoading(true);
    setError(null);
    try {
      const result = await depositToWallet(amount, note);
      setBalance(result.balance);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setActionLoading(false);
    }
  }

  async function withdraw(amount, note) {
    setActionLoading(true);
    setError(null);
    try {
      const result = await withdrawFromWallet(amount, note);
      setBalance(result.balance);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setActionLoading(false);
    }
  }

  return (
    <WalletContext.Provider
      value={{
        balance,
        loading,
        actionLoading,
        error,
        deposit,
        withdraw,
        refreshWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet phải được dùng bên trong <WalletProvider>");
  }
  return context;
}