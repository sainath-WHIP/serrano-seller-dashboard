import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "../../assets/serrano.png";
import { ApiPost } from "../../constants/apiCalls";
import { forgotPasswordUrl } from "../../server";

function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("email ", email)
        try {
            const response = await ApiPost(forgotPasswordUrl, {email: email})
            const result = await response.json();
            console.log("response forgotpassword ", result);
            if (response.status === 201) {
                toast(result?.message);
                console.log("Password reset email sent successfully.");
                navigate("/");
            } else {
                toast(result?.message);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="min-h-screen bg-[#CCCCCC] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md mb-3 justify-center flex">
                <img src={Logo} alt="logo" className="w-16 h-16 rounded-lg" />
            </div>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-0 text-center text-3xl font-extrabold text-gray-900">
                    Forgot Password
                </h2>
            </div>
            <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-[#fff] py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit} method="POST">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    className="appearance-none block w-full px-3 py-2 bg-[#ccc] border border-gray-400 placeholder:text-sm placeholder:font-normal rounded-md shadow-sm placeholder-gray-400 outline-none text-sm"
                                    placeholder="Enter your email id"
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className=" w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:shadow-md"
                            >
                                Resend
                            </button>
                        </div>
                        {/* <div className={`flex items-center w-full`}>
              <h4>Go to!</h4>
              <Link to="/" className="text-blue-600 pl-2">
                Sign in
              </Link>
            </div> */}
                    </form>
                </div>
            </div>
        </div>
    );
}
export default ForgotPassword;





