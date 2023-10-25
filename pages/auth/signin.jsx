import Link from "next/link";
import { useRouter } from "next/router";
import axios from "@/helpers/axios";
import { checkAuth } from "@/helpers/auth";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
const SignIn = () => {
  //   const { login } = useAuth();
  const router = useRouter();

  const [message , setMessage] = useState();
  const [logged, setLogged] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault();
    const payload = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    const res = await axios.post("login", payload);
    // console.log(res.data)

    let response = res.data;

    if (response.login) {
      toast.success('Login Successful.');
      setLogged(true);
    } else {
      toast.error(response.message);
      setMessage(response.message);
      // response.message.map((error) => {
      //   toast.error(error);
      // });
    }
    // console.log(res);
  };

  if(logged){
    router.replace('/')
  }
  let hasL =HasLogged();

  if (hasL == null) {
    return <>
      <div></div>
    </>
  }

  if (hasL === true) {
    router.replace('/');
  } else {
    return (
      // 
      <div className="row login_wrap">
        <Toaster />
        <div className="col-lg-11">
          <div className="row">
            <div className="col-md-8"></div>
            <div className="col-md-4">
              <div className="login-container">
                <h2 className="text-primary py-3">Login</h2>
                <form onSubmit={handleLogin}>
                  <div className="form-group">
                    <i className="bi bi-person"></i>
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      placeholder="Enter your username"
                    />
                    <div className="text-danger fs-5 text-start ms-3">
                      {message}
                    </div>
                  </div>
                  <div className="form-group">
                    <i className="bi bi-lock"></i>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Enter your password"
                    />
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="text-center btn btn-primary submit"
                    >
                      Submit
                    </button>
                  </div>
                  <p className="text-center">
                    Create an Account ?{" "}
                    <Link
                      href="/auth/signup"
                      className="text-decoration-none fw-bold"
                    >
                      Signup Now
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }



};

export default SignIn;





const HasLogged = () => {
  let [check, setCheck] = useState(null);
  useEffect(() => {
    const doo = async () => {
      setCheck(await checkAuth());
    }
    doo()
  }, [])

  if (check != null) {
    return check ? 'yes' : 'no';
  }

}


//  const getServerSideProps = async () => {
//     const check = await checkAuth();
//     return {
//         props: {
//             checkLogged : check
//         }
//     }
//
// }