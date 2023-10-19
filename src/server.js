export const server = "https://api.serrano.in/api/v2";

export const createShopUrl = server + "/shop/create-shop";
export const getSellerDetailsUrl = server + "/shop/getSeller";
export const shopLoginUrl = server + "/shop/login-shop";
export const createProductUrl = server + "/product/create-product";

export const updateSellerInfoUrl = server + "/shop/update-seller-info";
export const updateSellerAvatarUrl = server + "/shop/update-shop-avatar"

// get shop order api
export const getOrdersUrl = server + "/shop/orders";

// update order status api PUT
export const updateOrderStatusUrl = server + "/order/update-order-status/";

// forgot password api 
export const forgotPasswordUrl = server + "/shop/forgot-password"

// reset password api 
export const resetPasswordUrl = server + "/shop/reset-password"

// change password api 
export const changePasswordUrl = server + "/shop/change-password"