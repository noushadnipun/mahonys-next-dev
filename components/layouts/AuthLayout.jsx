import Header from "../common/Header";
import Footer from "../common/Footer";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Spinner from "../common/Spinner";

const AuthLayout = ({ children, props }) => {



  return (
    <>
      <Header props={props} />
      <div className="row main-screen justify-content-center m-0 mt-4 px-0 px-lg-3 ">
        <div className="col-lg-11">{children}</div>
      </div>
      <Footer />
    </>
  );
};
export default AuthLayout;
