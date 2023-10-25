import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const GuestLayout = ({ children }) => {
  const { token } = useAuth();
  const router = useRouter();

  if (token) {
    router.replace("/organizations");
  }
  return <>{children}</>;
};

export default GuestLayout;
