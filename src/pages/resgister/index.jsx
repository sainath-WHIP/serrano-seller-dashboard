import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { FaRegAddressCard } from "react-icons/fa";
import { TbLicense } from "react-icons/tb";
import { PiIdentificationCardThin } from "react-icons/pi";
import { LiaIdCardAltSolid } from "react-icons/lia";
import { CiShop } from "react-icons/ci";
import logo from "../../assets/serrano.png";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";

const ShopCreate = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState();
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState();
  const [aadharCard, setAadharCard] = useState();
  const [panCard, setPanCard] = useState();
  const [shopLicense, setShopLicense] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("zipCode", zipCode);
    formData.append("phoneNumber", phoneNumber);
    const imageFile = e.target.querySelector('input[type="file"]').files[0];
    const aadharFile = e.target.querySelector('input[type="file"]').files[0];
    const panCardFile = e.target.querySelector('input[type="file"]').files[0];
    const shopLicenseFile =
      e.target.querySelector('input[type="file"]').files[0];
    formData.append("avatar", imageFile);
    formData.append("aadharCard", aadharFile);
    formData.append("shopLicense", shopLicenseFile);
    formData.append("panCard", panCardFile);

    try {
      setLoading(true);
      const response = await fetch(
        "https://api.serrano.in/api/v2/shop/create-shop",
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        // Handle success response here
        const data = await response.json();
        console.log("Success:", data);
        if (data.message) {
          setLoading(false);
          toast.success(data.message);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      } else {
        // Handle error response here
        const errorData = await response.json();
        console.error("Error:", errorData);
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Network Error:", error);
    }
  };

  const handleFileInput = (e, setStateFunction) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setStateFunction(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="min-h-screen bg-[#ccc] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="flex justify-center">
        <img src={logo} alt="" className="rounded-md" />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register as a Seller
        </h2>
      </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[50rem]">
          <div className="bg-[#fff] py-12 shadow sm:rounded-lg sm:px-16">
            <form className="" method="POST" onSubmit={handleSubmit}>
              <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-8">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Shop Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="name"
                      name="name"
                      required
                      value={name}
                      placeholder="Enter Your Name"
                      onChange={(e) => setName(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="phone-number"
                      required
                      value={phoneNumber}
                      placeholder="Enter Your Phone Number"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="email"
                      required
                      value={email}
                      placeholder="Enter Your Email"
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="address"
                      name="address"
                      required
                      value={address}
                      placeholder="Enter Your Address"
                      onChange={(e) => setAddress(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="zipCode"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Zip Code
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="zipcode"
                      required
                      value={zipCode}
                      placeholder="Enter Zip Code"
                      onChange={(e) => setZipCode(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
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

                <div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="inline-block h-10 w-10 overflow-hidden">
                      {avatar ? (
                        <img
                          src={avatar}
                          alt="avatar"
                          className="h-full w-full object-cover rounded-md"
                        />
                      ) : (
                        <CiShop className="h-7 w-7" />
                      )}
                    </span>
                    <label
                      htmlFor="file-input"
                      className="flex items-center w-[80%] px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <span>Upload Shop Image</span>
                      <input
                        type="file"
                        name="avatar"
                        id="file-input"
                        onChange={(e) => handleFileInput(e, setAvatar)}
                        className="sr-only"
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="inline-block h-10 w-10 overflow-hidden">
                      {aadharCard ? (
                        <img
                          src={aadharCard}
                          alt="avatar"
                          className="h-full w-full object-cover rounded-md"
                        />
                      ) : (
                        <PiIdentificationCardThin className="h-7 w-7" />
                      )}
                    </span>

                    <label
                      htmlFor="aadharCard-input"
                      className="flex items-center w-[80%] px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <span>Upload Aadhar Card</span>
                      <input
                        type="file"
                        name="aadharCard"
                        id="aadharCard-input"
                        onChange={(e) => handleFileInput(e, setAadharCard)}
                        className="sr-only"
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="inline-block h-10 w-10 overflow-hidden">
                      {shopLicense ? (
                        <img
                          src={shopLicense}
                          alt="avatar"
                          className="h-full w-full object-cover rounded-md"
                        />
                      ) : (
                        <TbLicense className="h-7 w-7 opacity-70" />
                      )}
                    </span>
                    <label
                      htmlFor="shopLicense-input"
                      className="flex items-center w-[80%] px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <span>Upload Shop License</span>
                      <input
                        type="file"
                        name="shopLicense"
                        id="shopLicense-input"
                        onChange={(e) => handleFileInput(e, setShopLicense)}
                        className="sr-only"
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="inline-block h-10 w-10 overflow-hidden">
                      {panCard ? (
                        <img
                          src={panCard}
                          alt="avatar"
                          className="h-full w-full object-cover rounded-md"
                        />
                      ) : (
                        <LiaIdCardAltSolid className="h-7 w-7 opacity-70" />
                      )}
                    </span>
                    <label
                      htmlFor="panCard-input"
                      className="flex items-center w-[80%] px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <span>Upload Pan Card</span>
                      <input
                        type="file"
                        name="panCard"
                        id="panCard-input"
                        onChange={(e) => handleFileInput(e, setPanCard)}
                        className="sr-only"
                      />
                    </label>
                  </div>
                </div>

                <div className="col-span-2">
                  <div className="flex justify-between items-center mt-10">
                    <div className="">
                      <button
                        type="submit"
                        className="relative w-[200px] h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black"
                      // onClick={() => handleSubmit()}
                      >
                        {loading ? "Loading...." : "Submit"}
                      </button>
                    </div>
                    <div className={`flex items-center pr-10`}>
                      <h4 className="text-base font-normal">Already have an account?</h4>
                      <Link to="/" className="text-blue-600 text-base font-normal pl-2">
                        Sign in
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
    </div>
  );
};

export default ShopCreate;
