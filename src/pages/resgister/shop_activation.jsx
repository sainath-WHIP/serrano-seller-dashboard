import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { shopActivationUrl } from "../../networking/apiEndPoints";
import Logo from '../../assets/serrano.png'

const ShopActivation = () => {
    const { activation_token } = useParams();
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const activateUser = async (e) => {
        e.preventDefault();
        if (!activation_token) {
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(shopActivationUrl, {
                activation_token,
            });
            console.log(response.data); // Handle the response accordingly

            // Assuming the response indicates a successful activation
            if (response.status === 201) {
                setLoading(false);
                setSuccess(true);
                setTimeout(() => {
                    navigate("/");
                }, 3000);
            }
        } catch (error) {
            setError(true);
        }
    };

    return (
        <div>
            <div className="min-h-screen bg-[#ccc] flex flex-col py-12 sm:px-6 lg:px-8 pt-40">
                <div className="sm:mx-auto sm:w-full sm:max-w-md mb-3 justify-center flex">
                    <img src={Logo} alt="logo" className="w-16 h-16 rounded-lg" />
                </div>
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-0 text-center text-3xl font-extrabold text-gray-900">
                        Activation request
                    </h2>
                </div>
                <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-[#fff] py-8 px-4 w-full shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-7">
                            <div>
                                {!success ?
                                    <>
                                        <div>
                                            <label
                                                htmlFor="password"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Activation token
                                            </label>
                                            <div className="mt-3 relative">
                                                <input
                                                    type={"text"}
                                                    value={activation_token}
                                                    className="appearance-none block w-full px-3 py-2 border border-gray-400 capitalize rounded-md shadow-sm placeholder-gray-400 outline-none text-sm"
                                                    readOnly
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <button
                                                onClick={activateUser}
                                                className=" w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:shadow-md mt-10"
                                            >
                                                {loading ? "Loading..." : "Send Request"}
                                            </button>
                                        </div>
                                    </> : <div className="relative flex justify-center">
                                        {error ? (
                                            <p className="text-base font-semibold text-red-500">Your token is invalid!</p>
                                        ) : success ? (
                                            <p className="text-base font-semibold text-green-600">Your application was successfully submitted for the review. Please wait for the approval.</p>
                                        ) : (
                                            <p className="text-base font-semibold text-amber-400">Activating your account...</p>
                                        )}
                                    </div>
                                }

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopActivation;






















// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Logo from "../../assets/serrano.png";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { toast } from "react-toastify";
// import { ApiPost } from "../../networking/apiCalls";
// import { resetPasswordUrl, shopActivationUrl } from "../../networking/apiEndPoints";

// const ShopActivation = () => {
//     const navigate = useNavigate();
//     const { activation_token } = useParams();
//     const [newPassword, setNewPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");

//     console.log("token", activation_token);

//     useEffect(() => {
//         if (activation_token) {
//             console.log("activation_token:", activation_token);
//         }
//     }, [activation_token]);

//     const sendRequest = async (e) => {
//         e.preventDefault();

//         try {
//             if (activation_token) {
//                 const response = await ApiPost(shopActivationUrl, {
//                     activation_token: activation_token
//                 })
//                 const result = await response.json();
//                 console.log("data", result);
//                 console.log("status code ", response.status);

//                 toast(result?.message);
//                 if (response.status === 201) {
//                     setTimeout(() => {
//                         navigate("/");
//                     }, 2000);
//                 }
//             }
//         } catch (error) {
//             console.log("error", error);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-[#CCCCCC] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//             <div className="sm:mx-auto sm:w-full sm:max-w-md mb-3 justify-center flex">
//                 <img src={Logo} alt="logo" className="w-16 h-16 rounded-lg" />
//             </div>
//             <div className="sm:mx-auto sm:w-full sm:max-w-md">
//                 <h2 className="mt-0 text-center text-3xl font-extrabold text-gray-900">
//                     Activation request
//                 </h2>
//             </div>
//             <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
//                 <div className="bg-[#fff] py-8 px-4 shadow sm:rounded-lg sm:px-10">
//                     <form className="space-y-7" method="post">
//                         <div>
//                             <label
//                                 htmlFor="password"
//                                 className="block text-sm font-medium text-gray-700"
//                             >
//                                 Activation token
//                             </label>
//                             <div className="mt-3 relative">
//                                 <input
//                                     type={"text"}
//                                     value={activation_token}
//                                     className="appearance-none block w-full px-3 py-2 border border-gray-400 capitalize rounded-md shadow-sm placeholder-gray-400 outline-none text-sm"
//                                     readOnly
//                                     required
//                                 />
//                             </div>
//                         </div>
//                         <div>
//                             <button
//                                 type="submit"
//                                 onClick={sendRequest}
//                                 className=" w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:shadow-md"
//                             >
//                                 Send Request
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ShopActivation;