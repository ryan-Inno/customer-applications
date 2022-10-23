export const SUCCESS = "success";
export const FAILURE = "failure";
export const NO_MERCHANT = "no_merchant";

export const MESSAGE_CODES = [
  {
    code: SUCCESS,
    message:
      "Thank you for providing us with your details! We will get back to you shortly with the next steps.",
  },
  {
    code: NO_MERCHANT,
    message: "Merchant Id is not available.",
  },
  {
    code: FAILURE,
    message:
      "We are sorry but it looks like something went wrong.  Please contact support@futurepay.com and we will try to get the issue sorted out.",
  },
];

export const getMessage = (code = FAILURE) => {
  const item = MESSAGE_CODES.find((it) => it.code === code);
  if (item) {
    return item;
  } else {
    return MESSAGE_CODES.find((it) => it.code === FAILURE);
  }
};
