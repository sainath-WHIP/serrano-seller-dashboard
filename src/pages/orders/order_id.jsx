import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Layout from '../../components/Layout';
import { ApiGet, ApiPut } from '../../constants/apiCalls';
import { getOrdersUrl, updateOrderStatusUrl } from '../../server';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import Moment from 'react-moment';


function OriderDetails() {
    const [orderData, setOrderData] = useState({});
    const [status, setStatus] = useState();
    const { order_id } = useParams();

    useEffect(() => {
        ApiGet(getOrdersUrl).then((res) => {
            const filteredData = res?.orders.find((item) => item._id === order_id);
            setOrderData(filteredData);
            setStatus(filteredData.status);
            console.log("filtered data ", filteredData)
        });
    }, []);

    const statusChange = (e) => {
        console.log("status change ", status)
        setStatus(e.target.value);
    }

    const updateOrderStatusHandler = async (id) => {
        const reponse = await ApiPut(updateOrderStatusUrl + id, { status: status })
        const result = await reponse.json();

        toast(result?.order?.status);
        setTimeout(() => {
            window.location.reload();
        }, 3000)
        console.log("response from api ", result);
    }

    console.log("orderdata state ", orderData);
    console.log("order status ", status)
    return (
        <>
            <Layout>
                <div>
                    <div className="flex gap-2 items-center mb-6">
                        <p className="text-gray-800 font-semibold text-base">Order Id: </p>
                        <p className="text-black font-bold text-lg"> {order_id}</p>
                    </div>

                    <div className="">
                        <div className="flex gap-5">
                            <div className="w-8/12 bg-white rounded-md shadow-md h-min">
                                <div className="px-6 py-4">
                                    <p className="text-black font-semibold text-base">Ordered Items</p>
                                </div>

                                <div className="">
                                    <table className="w-full bg-white rounded-lg overflow-hidden mb-2">
                                        <thead className="">
                                            <tr className="text-gray-800 text-sm font-medium border-b border-gray-400">
                                                <th className="px-6 py-4 text-left text-sm font-bold">Product Image</th>
                                                <th className="px-6 py-4 text-left text-sm font-bold">Product Name</th>
                                                <th className="px-6 py-4 text-left text-sm font-bold">Price</th>
                                                <th className="px-6 py-4 text-left text-sm font-bold">Quantity</th>
                                                <th className="px-6 py-4 text-left text-sm font-bold">Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orderData?.cart?.map((item) => (
                                                <tr className="text-black text-sm font-normal text-left">
                                                    <td className="px-6 py-2">
                                                        <img src={item.images} alt="Product image" className='w-12 rounded-sm' />
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{item.originalPrice}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{item.qty}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{item.singleTotalPrice}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="w-4/12 overflow-hidden">
                                <div className="bg-white h-[200px] rounded-md shadow-md mb-5">
                                    <div className="px-4 py-3 border-b-[2px]">
                                        <p className="text-base font-semibold">Order summery</p>
                                    </div>
                                    <div className="flex px-4 mt-4 gap-14">
                                        <div className="">
                                            <p className="text-sm font-medium leading-7">Order Status</p>
                                            <p className="text-sm font-medium leading-7">CreatedAt</p>
                                            <p className="text-sm font-medium leading-7">Ordered Time</p>
                                            <p className="text-sm font-medium leading-7">Total Price</p>
                                        </div>
                                        <div className="">
                                            <div className="flex items-center gap-4">
                                                {!orderData?.paymentInfo ? <>
                                                    <div className="">
                                                        {console.log('status return ', status)}
                                                        <select
                                                            name="status"
                                                            className={` text-sm cursor-pointer capitalize border rounded py-1 px-2 leading-tight focus:outline-gray-300`}
                                                            value={status}
                                                            onChange={(e) => setStatus(e.target.value)}
                                                        >
                                                            <option className=" text-sm capitalize text-yellow-600">
                                                                Confirmed
                                                            </option>
                                                            <option className=" text-sm capitalize text-red-600">
                                                                Processing
                                                            </option>
                                                            <option className=" text-sm capitalize text-lime-600">
                                                                Delivered
                                                            </option>
                                                        </select>
                                                    </div>
                                                    <div className="">
                                                        <button className="px-2 py-1 rounded text-sm font-normal bg-black text-white" onClick={() => updateOrderStatusHandler(orderData._id)}>Update</button>
                                                    </div>
                                                </> : <p className="text-sm font-medium leading-7 text-green-500">{orderData?.paymentInfo?.status}</p>}

                                            </div>

                                            <p className="text-sm font-normal leading-7"><Moment format="YYYY-MM-DD">{orderData.createdAt}</Moment></p>
                                            <p className="text-sm font-normal leading-7"><Moment format="HH:mm:ss">{orderData.createdAt}</Moment></p>
                                            <p className="text-sm font-medium text-red-500 leading-7">{orderData.totalPrice}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-md shadow-md">
                                    <div className="px-4 py-3 border-b-[2px]">
                                        <p className="text-base font-semibold">User details</p>
                                    </div>
                                    <div className="grid grid-cols-6 px-4 py-4">
                                        <div className="col-span-2">
                                            <p className="text-sm font-medium leading-7">Name</p>
                                            <p className="text-sm font-medium leading-7">Email</p>
                                            <p className="text-sm font-medium leading-7">Contact</p>
                                            {orderData?.paymentInfo &&
                                                <>
                                                    <p className="text-sm font-medium leading-7">Payment</p>
                                                    <p className="text-sm font-medium leading-7">DeliveredAt</p>
                                                </>}
                                            <p className="text-sm font-medium leading-7">Address</p>
                                        </div>
                                        <div className="col-span-4">
                                            <p className="text-sm font-normal leading-7">{orderData?.user?.name}</p>
                                            <p className="text-sm font-normal leading-7">{orderData?.user?.email}</p>
                                            <p className="text-sm font-normal leading-7">{orderData?.user?.phoneNumber}</p>
                                            {orderData?.paymentInfo && <>
                                                <p className="text-sm font-medium
                                                 leading-7 text-green-500">{orderData?.paymentInfo?.status}</p>
                                                <p className="text-sm font-normal leading-7"><Moment format="YYYY-MM-DD HH:mm:ss">{orderData?.deliveredAt}</Moment></p>
                                            </>}
                                            <p className="text-sm font-normal leading-7">{orderData?.user?.addresses[0]?.address1}, {orderData?.user?.addresses[0]?.address2}, {orderData?.user?.addresses[0]?.city}, {orderData?.user?.addresses[0]?.country}, {orderData?.user?.addresses[0]?.zipCode}</p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default OriderDetails;