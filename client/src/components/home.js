import React from "react";
import { Button, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          display: "flex",
          alignContent: "center",
          height: "100vh",
        }}
      >
        <div>
          <Typography className="heading" variant="h3">
            Welcome To FakeStackOverFlow
          </Typography>
        </div>
        <div style={{ alignSelf: "center", justifyContent: "space-between" }}>
          <Button className="hBtn" variant="contained">
            <Typography>
              <Link to="login">Login</Link>
            </Typography>
          </Button>

          <Button className="hBtn" variant="contained">
            <Typography>
              <Link to="register">Register</Link>
            </Typography>
          </Button>

          <Button className="hBtn">
            <Typography>
              <Link to="welcome">
                Continue As A Guest User <ArrowForwardIosIcon />
              </Link>
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
