const URL = "https://api.serrano.in";

export const server = `${URL}/api/v2/shop`;

// create or register shop api POST
export const createShopUrl = server + "/create-shop";

// Seller details api GET
export const getSellerDetailsUrl = server + "/getSeller";

// Seller login api POST
export const shopLoginUrl = server + "/login-shop";

// Seller logout api GET
export const shopLogOutUrl = server + "/logout";

// create product api POST
export const createProductUrl = server + "/product/create-product";

//  seller information update api POST
export const updateSellerInfoUrl = server + "/update-seller-info";

// Seller shop image change api POST 
export const updateSellerAvatarUrl = server + "/update-shop-avatar"

// All products of shop api POST
export const getShopProductsUrl = server + "/perticular-shop-products";

// Add or update product to shop api POST 
export const updateProductUrl = server + "/products/";

// All products of serrano api GET
export const getAllProductsUrl = server + "/admin-all-products";

// get shop order api GET
export const getOrdersUrl = server + "/orders";

// update order status api PUT
export const updateOrderStatusUrl = server + "/order/update-order-status/";

// forgot password api POST
export const forgotPasswordUrl = server + "/forgot-password"

// reset password api POST
export const resetPasswordUrl = server + "/reset-password"

// change password api PUT
export const changePasswordUrl = server + "/change-password"