import { Form, Formik } from "formik";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const baseURL = "http://localhost:8000/api";

const LoginForm = () => {
  const navigate = useNavigate();

  const [loginError, setLoginError] = useState("");

  const initalValues = {
    email: "",
    username: "",
    password: "",
  };

  const validationSchema = async (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Email is Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.username) {
      errors.username = "Username is Required";
    }

    if (!values.password) {
      errors.password = "Password is Required";
    } else if (
      values.password.length < 6 ||
      values.password === values.username ||
      values.password === values.email
    ) {
      errors.password = "Invalid Password";
    }
    return errors;
  };

  const handleSubmitReq = (val) => {
    axios.post(baseURL + "/register", val).then((res) => {
      if (res?.data?.message) {
        setLoginError(res?.data?.message);
      } else {
        navigate("/login");
      }
    });
  };

  return (
    <div className="loginForm">
      <Typography
        className="m-b"
        variant="h3"
        style={{ alignContent: "center" }}
      >
        Sign UP
      </Typography>
      <Formik
        initialValues={initalValues}
        validate={validationSchema}
        onSubmit={handleSubmitReq}
      >
        {(props) => {
          return (
            <Form onSubmit={props.handleSubmit}>
              <TextField
                name="email"
                label="Email"
                value={props.values.email}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                fullWidth
                className="m-b"
                helperText={
                  props.touched.email && props.errors.email
                    ? props.errors.email
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
                name="username"
                label="Username"
                value={props.values.username}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                fullWidth
                className="m-b"
                helperText={
                  props.touched.username && props.errors.username
                    ? props.errors.username
                    : ""
                }
                error={!!props.touched.username && !!props.errors.username}
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
                    ? props.errors.password
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
                Sign Up{" "}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default LoginForm;
