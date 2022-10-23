import axios from "axios";
import { toast } from "react-toastify";

const TIMEOUT = 2 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;
// eslint-disable-next-line no-undef
axios.defaults.baseURL = process.env.REACT_APP_AXON_IVY_ENDPONT;
axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";

export const CUSTOMER_REQUEST = "@@merchant/CUSTOMER_REQUEST";
export const CUSTOMER_SUCCESS = "@@merchant/CUSTOMER_SUCCESS";
export const CUSTOMER_FAILURE = "@@merchant/CUSTOMER_FAILURE";

export const saveCustomer = (formdata, callback) => async (dispatch) => {
  dispatch({ type: CUSTOMER_REQUEST });
  try {
    axios.defaults.headers = [];
    let axonConfig = {
      headers: {
        "X-Requested-By": "ivy",
        Accept: "application/json",
        // "Content-Type": "multipart/form-data",
      },
      // auth: {
      //   username: "ryan",
      //   password: "seED%$2Fd2",
      // },
    };
    const govtIssuedPhotoId = formdata["govtIssuedPhotoId"];
    const proofOfAddressDocument = formdata["proofOfAddressDocument"];
    const ssnUpload = formdata["ssnUpload"];
    let data = new FormData();
    data.append("govtIssuedPhotoId", govtIssuedPhotoId);
    data.append("proofOfAddressDocument", proofOfAddressDocument);
    data.append("ssnUpload", ssnUpload);
    data.append("firstName", formdata?.firstName);
    data.append("lastName", formdata?.lastName);
    data.append("email", formdata?.email);

    const res = await axios.post(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_AXON_IVY_ENDPONT}`,
      data,
      axonConfig
    );

    dispatch({
      type: CUSTOMER_SUCCESS,
      payload: res.data,
    });

    callback(true);
  } catch (err) {
    callback(false);
    toast(`error ${err}`);
    dispatch({
      type: CUSTOMER_FAILURE,
    });
  }
};
