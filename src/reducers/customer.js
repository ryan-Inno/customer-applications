import {
  CUSTOMER_REQUEST,
  CUSTOMER_SUCCESS,
  CUSTOMER_FAILURE,
} from "actions/customer";

const initialState = {
  loading: false,
  error: "",
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CUSTOMER_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case CUSTOMER_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }

    case CUSTOMER_FAILURE: {
      return {
        ...state,
        loading: false,
      };
    }

    default:
      return state;
  }
}
