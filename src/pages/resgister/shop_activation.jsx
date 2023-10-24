import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Logo from "../../assets/serrano.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { ApiPost } from "../../networking/apiCalls";
import { resetPasswordUrl } from "../../networking/apiEndPoints";

const ShopActivation = () => {
    const navigate = useNavigate();
    const { shop_activation = "activation token" } = useParams();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    console.log("token", shop_activation);

    useEffect(() => {
        if (shop_activation) {
            console.log("shop_activation:", shop_activation);
        }
    }, [shop_activation]);

    const sendRequest = async (e) => {
        e.preventDefault();

        try {
            if (shop_activation) {
                const response = await ApiPost(resetPasswordUrl, {
                    token: shop_activation,
                    newPassword: newPassword,
                    confirmPassword: confirmPassword,
                })
                const result = await response.json();
                console.log("data", result);
                console.log("status code ", response.status);

                toast(result?.message);
                if (response.status === 200) {
                    setTimeout(() => {
                        navigate("/");
                    }, 2000);
                }
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    return (
        <div className="min-h-screen bg-[#CCCCCC] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md mb-3 justify-center flex">
                <img src={Logo} alt="logo" className="w-16 h-16 rounded-lg" />
            </div>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-0 text-center text-3xl font-extrabold text-gray-900">
                    Activation request
                </h2>
            </div>
            <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-[#fff] py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-7" method="post">
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
                                    value={"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2hpdmEgR2FuZ2EgV2luZXMiLCJlbWFpbCI6IndlZ2VyaTYxNjZAd2VpcmJ5LmNvbSIsInBhc3N3b3JkIjoiMTIzNDU2IiwiYXZhdGFyIjoiaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZHlnMzhsY3BkL2ltYWdlL3VwbG9hZC92MTY5ODE0NjUxMi9neGIzMXMxb3pvZ28yMmMwOGY1Zi5qcGciLCJhYWRoYXJDYXJkIjoiaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZHlnMzhsY3BkL2ltYWdlL3VwbG9hZC92MTY5ODE0NjUxNC95MWZnbGc4NWNmZHhta3FldDBsbC5qcGciLCJwYW5DYXJkIjoiaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZHlnMzhsY3BkL2ltYWdlL3VwbG9hZC92MTY5ODE0NjUxNi95cWc0dXd2NzJubXh3amRzcmR6bi5qcGciLCJzaG9wTGljZW5zZSI6Imh0dHBzOi8vcmVzLmNsb3VkaW5hcnkuY29tL2R5ZzM4bGNwZC9pbWFnZS91cGxvYWQvdjE2OTgxNDY1MTgvaG9qaXJwZm9ubGJnYWloNnF2Z2wuanBnIiwiYWRkcmVzcyI6ImJlc2lkZSBESUxTVUtITkFHQVIgQlVTIFNUQU5ELCBBUCBTdGF0ZSBIb3VzaW5nIEJvYXJkLCBIYW51bWFubmFnYXIsIEtyaXNobmEgTmFnYXIsIERpbHN1a2huYWdhciwgSHlkZXJhYmFkLCBUZWxhbmdhbmEgNTAwMDYwIiwicGhvbmVOdW1iZXIiOiI3OTk1ODc3NzEwIiwiemlwQ29kZSI6IjUwMDA2MCIsInN0YXR1cyI6InBlbmRpbmciLCJpYXQiOjE2OTgxNDY1MTgsImV4cCI6MTY5ODE0NjgxOH0.-NPWs6piAtJ4jXl0X5doE75lnY7g7EipWWOA8PhH-H8"}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-400 capitalize rounded-md shadow-sm placeholder-gray-400 outline-none text-sm"
                                    readOnly
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                onClick={sendRequest}
                                className=" w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:shadow-md"
                            >
                                Send Request
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ShopActivation;