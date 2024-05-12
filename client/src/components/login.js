import { Form, Formik } from "formik";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const baseURL = "http://localhost:8000";

const LoginForm = () => {
  const navigate = useNavigate();

  const [loginError, setLoginError] = useState("");
  const [showError, setShowError] = useState("");

  const initalValues = {
    email: "",
    password: "",
  };

  const validationSchema = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Email is Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 6 && values.password.length)
      errors.password = "Invalid Password";
    return errors;
  };

  const handleSubmitReq = (values) => {
    axios
      .post(baseURL + "/login", values)
      .then((res) => {
        if (res?.data?.message) {
          setLoginError(res?.data?.message);
        } else {
          if (res?.data?.user) {
            localStorage.setItem("token", res.data.user);
            navigate("/welcome");
          }
        }
      })
      .catch((err) => {
        setShowError("Something Went Wrong");
      });
  };

  return (
    <div className="loginForm">
      <Typography
        className="m-b"
        variant="h3"
        style={{ alignContent: "center" }}
      >
        Login
      </Typography>
      <Formik
        initialValues={initalValues}
        validate={validationSchema}
        onSubmit={handleSubmitReq}
      >
        {(props) => {
          return (
            <Form onSubmit={props.handleSubmit}>
              {showError && (
                <div style={{ color: "red", marginBottom: "1rem" }}>
                  <span>{showError}</span>
                </div>
              )}
              <TextField
                name="email"
                label="Email"
                value={props.values.email}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                fullWidth
                className="m-b"
                helperText={
                  props.touched.email && typeof props.errors.email === "string"
                    ? `${props.errors.email}`
                    : ""
                }
                error={!!props.touched.email && !!props.errors.email}
              />
              {loginError && (
                <div style={{ color: "red", marginBottom: "1rem" }}>
                  <span>{loginError}</span>
                </div>
              )}
              <TextField
                name="password"
                label="Password"
                variant="outlined"
                value={props.values.password}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                fullWidth
                helperText={
                  props.touched.password && props.errors.password
                    ? `${props.errors.password}`
                    : ""
                }
                error={!!props.touched.password && !!props.errors.password}
                className="m-b"
              />
              {loginError && (
                <div style={{ color: "red", marginBottom: "1rem" }}>
                  <span>{loginError}</span>
                </div>
              )}
              <Button
                disabled={!(props.isValid && props.dirty)}
                variant="contained"
                className="p"
                fullWidth
                onClick={props.handleSubmit}
              >
                Sign In{" "}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default LoginForm;
