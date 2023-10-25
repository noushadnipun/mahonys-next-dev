import React, { useEffect, useState } from 'react';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import { checkAuth } from '@/helpers/auth';
import { useRouter } from 'next/router';
import { headerSupportRoute, unProtectedRoutes } from '@/helpers/routes';
import SubHeader from "@/components/common/SubHeader";


export const Layout = ({ children }) => {
   const router = useRouter();
    return headerSupportRoute(router.pathname) ? withHeaderLayout(children) : children
}
export default Layout;

const withHeaderLayout = (children) => {
    const globalVarOutput = globalVar()
    return (
        <>
            <Header />
            <SubHeader />
            <div className="row main-screen justify-content-center m-0 mt-4 px-0 px-lg-3 ">
                <div className="col-lg-11">
                    {/*{children}*/}
                    {React.Children.map(children, (child) => {
                        // Pass the globalVarOutput as a prop to each child
                        return React.cloneElement(child, { globalVarOutput });
                    })}
                </div>
            </div>
        </>
    )
}


const globalVar = () => {
    return (
        <>
            Hello
        </>
    )
}