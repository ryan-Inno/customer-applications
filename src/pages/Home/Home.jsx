import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  reduxForm,
  initialize,
  getFormValues,
  hasSubmitFailed,
} from "redux-form";
import {
  Banner,
  Container,
  Header,
  FormGroup,
  Input,
  File,
  Loader,
} from "components";
import { CUSTOMER_FORM } from "constants/formNames";
import "./home.scss";
import Recaptcha from "react-recaptcha";
import { toast } from "react-toastify";
import { saveCustomer } from "actions/customer";

// eslint-disable-next-line no-undef
const SECRET_KEY = `${process.env.REACT_APP_RECAPTCHA_KEY}`;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const REQUIRED = "This is a required field.";
const FILE_TYPE_ERROR = "This file type is not supported";
const fileWhiteList = ["jpeg", "pdf", "jpg", "gif", "png"];

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
};

const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = REQUIRED;
  }
  if (!values.lastName) {
    errors.lastName = REQUIRED;
  }
  if (!values.email) {
    errors.email = REQUIRED;
  }
  return errors;
};

const Home = (props) => {
  const dispatch = useDispatch();
  const { handleSubmit } = props;
  const [validCaptcha, setValidCaptcha] = useState(false);
  const [isAssertData, setAssertData] = useState(false);

  const loading = useSelector((state) => state.customer.loading);

  useEffect(() => {
    if (props.submitFailed) {
      toast.error("Please provide the required information.");
      const elements = document.getElementsByClassName("form-field-error");
      if (elements.length > 0) {
        const elem = elements[0];
        const top = elem.getBoundingClientRect().top + window.scrollY - 150;
        window.scroll({
          top: top,
          left: 0,
          behavior: "smooth",
        });
      }
    }
  }, [props.submitFailed]);

  useEffect(() => {
    dispatch(initialize(CUSTOMER_FORM, initialValues));
  }, [dispatch]);

  const submit = (values, dispatch, props) => {
    dispatch(
      saveCustomer(values, (res) => {
        console.log("res", res);
      })
    );
  };

  const callback = () => {};

  const verifyCallback = (response) => {
    if (response) {
      setValidCaptcha(true);
    } else {
      setValidCaptcha(false);
    }
  };

  const expiredCallback = () => {
    setValidCaptcha(false);
  };

  return (
    <div>
      <Banner />
      <Container>
        <Header title="" />

        <form onSubmit={handleSubmit(submit)}>
          <FormGroup title="Customer Details">
            <Input
              label="First Name"
              name="firstName"
              placeholder="First Name"
            />

            <Input label="Last Name" name="lastName" placeholder="Last Name" />
            <Input label="Email" name="email" placeholder="Email" />
            <File
              label="Government Issued Photo Identification"
              name="govtIssuedPhotoId"
            />
            <File
              label="Proof of Address Document upload in the form of a Utility bill (gas, electricity, water) or Lease"
              name="proofOfAddressDocument"
            />
            <File label="SSN Upload" name="ssnUpload" />
          </FormGroup>

          <div className="flex">
            <label htmlFor="checkid">
              <input
                className="checkbox"
                id="checkid"
                type="checkbox"
                onChange={() => setAssertData(!isAssertData)}
                value={isAssertData}
              />
              I assert that the data I am submiting is correct
            </label>
          </div>

          <div className="button-footer">
            <div className="rc-anchor-wrapper">
              <Recaptcha
                sitekey={SECRET_KEY}
                size="compact"
                render="explicit"
                verifyCallback={verifyCallback}
                onloadCallback={callback}
                expiredCallback={expiredCallback}
              />
            </div>

            <button
              className={`submit ${
                !validCaptcha || loading || !isAssertData
                  ? "disable-button"
                  : ""
              }`}
              type="submit"
              // eslint-disable-next-line prettier/prettier
              disabled={loading || !validCaptcha || !isAssertData}>
              Submit
            </button>
          </div>
        </form>
        <Loader show={loading} />
      </Container>
    </div>
  );
};

export default reduxForm({
  form: CUSTOMER_FORM,
  validate,
  touchOnBlur: false,
})(
  connect((state) => ({
    formData: getFormValues(CUSTOMER_FORM)(state),
    submitFailed: hasSubmitFailed(CUSTOMER_FORM)(state),
  }))(Home)
);
