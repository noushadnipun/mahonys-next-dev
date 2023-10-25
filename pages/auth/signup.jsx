import { useState } from "react";
import { checkAuth } from "@/helpers/auth";
import axios from "@/helpers/axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { Toaster, toast } from "react-hot-toast";
import SignIn from "./signin";
//import { redirect } from 'next/navigation'

const signup = () => {

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            email: e.target.email.value,
            phone: e.target.phone.value,
            password: e.target.password.value,
            password_confirmation: e.target.password_confirmation.value,
        };

        const res = await axios.post('register', payload);
        console.log(res);
        let response = res.data;
        if (response.register) {
            toast.success('Registration Successful. Try to Login!');
            router.push("/auth/signin")
        } else {
            response.message.forEach((error) => {
                toast.error(error);
            });
        }
    };

    const hasL = hasLogged();
    if (hasL == null) {
        return <>
            <div></div>
        </>
    }

    if (hasL === 'yes') {
        router.back();
    } else {
        return (
            <>
                <Toaster />
                <div className="row login_wrap">
                    <div className="col-lg-11">
                        <div className="row">
                            <div className="col-md-8"></div>
                            <div className="col-md-4">
                                <div className="login-container">
                                    <h2 className="text-primary py-3">Sign Up</h2>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <i className="bi bi-person"></i>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="email"
                                                placeholder="Email Address"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <i className="bi bi-phone"></i>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="phone"
                                                placeholder="Enter phone number"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <i className="bi bi-lock"></i>
                                            <input
                                                type="password"
                                                className="form-control"
                                                name="password"
                                                placeholder="Password"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <i className="bi bi-lock"></i>
                                            <input
                                                type="password"
                                                className="form-control"
                                                name="password_confirmation"
                                                placeholder="Retype Password"
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
                                            Already Have Account ?{" "}
                                            <Link className="text-decoration-none fw-bold" href="/auth/signin">
                                                Signin Now
                                            </Link>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default signup;


const hasLogged = () => {
    let [check, setCheck] = useState(null);
    const doo = async () => {
        setCheck(await checkAuth());
    }
    doo()

    if (check != null) {
        return check ? 'yes' : 'no';
    }

}