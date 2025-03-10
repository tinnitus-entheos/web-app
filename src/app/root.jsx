"use client";

import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "./context/AuthContext";
import { useEffect } from "react";

export const Root = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();

  useEffect(() => {
    const isAuthRoute = pathname?.startsWith("/auth");
    
    if (!user && !isAuthRoute) {
      router.push("/auth/login");
    }
  }, [user, pathname, router]);

  return <>{children}</>;
};
