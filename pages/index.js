import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import OrganizationCreate from './organization/create'
import CompanySettings from './organization/company_setting'
import { useEffect, useState } from 'react'
import {UserInfos, userInfos} from '@/helpers/auth'
import {redirect} from "next/navigation";
import {useRouter} from "next/router";
import {NextResponse} from "next/server";
import SignIn from './auth/signin'
import Header from "@/components/common/Header";



export default function Home({userDetails}) {
  const [userInfo, setUserInfo] = useState('wait');
  const [hasOrg, setHasOrg] = useState();
  const [logged, setLogged] = useState('no');
  const router = useRouter()
  const request = new NextResponse()
  // console.log(userInfo)
  useEffect(() => {
    const userData =  async () => {
      let data =  await userInfos();
      if(data.status){
        setUserInfo(data)
        setHasOrg(data.user_info.user.organizations ?? false)
        setLogged(data.user_info.token)
      }

    }
    userData()
  }, [setUserInfo, setLogged, setHasOrg])


  if (userInfo == 'wait') {
    return;
  }


  return (
    <>
      <div className="row justify-content-center mt-5 m-0">
        <div className="col-lg-11">
          {
            hasOrg ? <CompanySettings /> : <OrganizationCreate />
          }
        </div>
      </div>


    </>
  )
}

