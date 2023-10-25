import { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { shopLoginUrl } from "../../networking/apiEndPoints";
import { getSellerInfo } from "../../redux/actions/sellerAction";
import { useDispatch } from "react-redux";
import logo from '../../assets/serrano.png'
import { toast } from "react-toastify";

const ShopLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const localToken = localStorage.getItem("token");
  useEffect(() => {
    if (localToken) {
      navigate("/dashboard");
    }
  }, [localToken, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const res = await axios.post(
        shopLoginUrl,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      localStorage.setItem("token", res?.data?.token);
      localStorage.setItem("shopId", res?.data?.user._id);
      dispatch(getSellerInfo());
      toast(res?.data?.message);
      setLoading(false);
      navigate('/dashboard');
    } catch (err) {
      toast(err?.response?.data?.message);
      console.log(err.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#ccc] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="flex justify-center">
       <img src={logo} alt="serrano logo" className="rounded-md w-16 h-16" />
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-5 text-center text-3xl font-extrabold text-gray-900">
          Login to your shop
        </h2>
      </div>
      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  placeholder="Enter your email id"
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm placeholder-gray-400 outline-none text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm placeholder-gray-400 outline-none text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>
            <div className={`flex items-center justify-between`}>
              <div className={`flex items-center`}>
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="/forgot-password"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:shadow-md"
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>
            <div className={`flex items-center w-full`}>
              <p className="text-sm">Not have any account?</p>
              <Link to="/shop-register" className="text-blue-600 text-sm font-medium pl-2">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopLogin;
