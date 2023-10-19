import axios from "axios";
import {
  LoadSellerFail,
  LoadSellerRequest,
  LoadSellerSuccess,
} from "../slices/sellerSlice";
import { getSellerDetailsUrl } from "../../server";

export const getSellerInfo = () => async (dispatch) => {
  try {
    dispatch(LoadSellerRequest());

    const { data } = await axios.get(getSellerDetailsUrl, {
      withCredentials: true,
    });

    dispatch(LoadSellerSuccess(data.seller));
  } catch (error) {
    dispatch(LoadSellerFail(error.response.data.message));
  }
};
