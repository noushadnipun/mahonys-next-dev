import {useEffect, useState} from "react";
import axios from "@/helpers/axios";

/**
 * Check if User Logged in or not
 * @returns Boolean true / false
 */
export const checkAuth = async () => {
    const res = await axios.post('/user');
    let cachedLogin = res.data.login ?? false;
    return cachedLogin;
}


export const userInfos =  async (updateInfo = false) => {
    const res = await axios.post('/user');
    let cachedLogin = res.data ?? false;
    return cachedLogin;
}