// src/admin/hooks/useAdminAuth.js
//
// Hook kiểm tra: người dùng đã đăng nhập chưa, và có role = 'admin' không.
// Hook này KHÔNG phụ thuộc vào AuthContext nào trong app — tự gọi Supabase
// trực tiếp để đảm bảo hoạt động độc lập, dễ ghép vào project hiện tại.
//
// Cách dùng:
//   const { loading, isAdmin, user } = useAdminAuth();
//   if (loading) return <Spinner />;
//   if (!isAdmin) return <Navigate to="/login" />;

import { useEffect, useState } from 'react';
import { getCurrentAppUser } from '../lib/adminApi';
import { supabase } from '../../supabaseClient';

export function useAdminAuth() {
  const [state, setState] = useState({
    loading: true,
    isAdmin: false,
    user: null,
  });

  useEffect(() => {
    let isMounted = true;

    async function check() {
      const profile = await getCurrentAppUser();
      if (!isMounted) return;
      setState({
        loading: false,
        isAdmin: profile?.role === 'admin',
        user: profile,
      });
    }

    check();

    // Lắng nghe khi auth state đổi (vd: logout ở tab khác) để re-check.
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      check();
    });

    return () => {
      isMounted = false;
      listener?.subscription?.unsubscribe();
    };
  }, []);

  return state;
}