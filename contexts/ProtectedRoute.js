import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {checkAuth, userInfos} from '@/helpers/auth';
import { headerSupportRoute, unProtectedRoutes } from '@/helpers/routes';
import Header from '@/components/layouts/Header';
import SubHeader from '@/components/common/SubHeader';
import {toast} from "react-hot-toast";


const ProtectedRoute = ({ children}) => {
    const [subHeader, updateSubHeader]= useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [watcher, setWatcher] = useState(true);
    const router = useRouter();
    const checkUnprotectedRoutes = unProtectedRoutes().includes(router.pathname);
    const [userDetails, setuserDetails] = useState([]);
    const [loadOne, setLoadOne] = useState(false)

    useEffect(() => {
        // Exclude the login page from authentication check
        if (!isAuthenticated && checkUnprotectedRoutes) {
            setWatcher(false);
            return;
        }
        const authenticateUser = async () => {
            try {
                const checkLogged = await checkAuth();
                if (!checkLogged) {
                    router.push('/auth/signin');
                } else {
                    setWatcher(false);
                }
                setIsAuthenticated(checkLogged);


            } catch (error) {
                console.error('Authentication check failed', error);
                router.push('/auth/signin'); // Redirect to the login page on error
            }
        };

        const userdetails  =async () => {
            const getUser = await GetUserInfo({router : router})
            setuserDetails(getUser)
            setLoadOne(true)
        }
        if(!loadOne){
            userdetails()
            authenticateUser();
        }


    }, [checkUnprotectedRoutes, isAuthenticated, router, setuserDetails,setLoadOne]);


    return watcher ? (
        <>
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </>
    ) : (

        headerSupportRoute(router.pathname) ?
            <>
                <WithHeaderLayout subHeader={subHeader} userDetails={userDetails} children={children} />
            </>

            :
            React.Children.map(children, (child) => {
                return React.cloneElement(child, { userDetails });
            })

    );
};
export default ProtectedRoute;



export const WithHeaderLayout = ({children, userDetails, subHeader}) => {
    return (
        <>
            <Header userDetails={userDetails} />
            <SubHeader subHeader={subHeader} />
            <div className="row main-screen justify-content-center m-0 mt-4 px-0 px-lg-3 ">
                <div className="col-lg-12">
                    {React.Children.map(children, (child) => {
                        return React.cloneElement(child, { userDetails });
                    })}
                </div>
            </div>
        </>
    )
}

// let router = useRouter();
const GetUserInfo = async ({router}) => {
    let data = await userInfos()
    let info =  data?.user_info?.user
    data = data?.user_info?.user.companies;
    let companySlug = router.query.company_slug;

    let checkCompany = data?.find((item) => item.company_key === companySlug);
    let current_company = false;

    if(companySlug && checkCompany === undefined){
        router.push('/')
        toast.error('invalid Company')
    }else {
        current_company = checkCompany;
    }

    return (
        {
            company : checkCompany,
            company_id : checkCompany?.company_id,
            organization_id : checkCompany?.organization_id,
            info : info,
        }
    )
}

/*
const getServerSideProps = async () => {
    const [check, setCheck] = useState();
    const [userCompany, setUserCompany] = useState();

    useEffect(async () => {
        const checks = await checkAuth();
        // const useCompanies = await userInfos();
        setCheck(checks)
        // setUserCompany(useCompanies)
    }, [checkAuth, userInfos])


    return {
        props: {
            checkLogged : check,
            // useInfo : userCompany
        }
    }

}

*/



