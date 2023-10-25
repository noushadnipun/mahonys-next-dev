// // import { http } from '@/config'
// import useAuth from '@/hooks/useAuth';
// import useHttp from '@/hooks/useHttp'
// import { useRouter } from 'next/router';
// import React from 'react'

// const Logout = () => {
//     const http = useHttp();
//     const { setUserInfo, setToken } = useAuth();
//     const router = useRouter();

//     const handleLogout = async () => {
//         await http.post('logout');
//         setUserInfo({});
//         setToken("");
//         await localStorage.removeItem("user_info");
//         await localStorage.removeItem("access_token");
//         router.replace('/')
//     }
//     return (
//         <div>
//             <button onClick={handleLogout}>logout</button>
//         </div>
//     )
// }

// export default Logout


import React from 'react'

const Logout = () => {
    return (
        <div>Logout</div>
    )
}

export default Logout