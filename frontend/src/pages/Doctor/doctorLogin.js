import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import { MailIcon, AccountCircle, Password } from "@mui/icons-material";
import "../User/Login.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function DoctorLogin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem(localStorage.getItem("authenticated") || false)
  );

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    axios({
      method: "get",
      url: "http://localhost:5000/doc/",
    }).then((res) => {
      var usersData = res.data;
      // console.log(usersData[0]);
      usersData.map((obj) => {
        if (email === obj.email) {
          if (password === obj.password) {
            localStorage.setItem("authenticated", true);
            var strr = `/doctor/${obj.doctorID}`;
            navigate(strr);
          }
        }
      });
    });
  }

  return (
    <div className="Login">
      <h1 className="login">Login</h1>
      <FormControl sx={{ minWidth: 400 }}>
        <TextField
          sx={{ marginBottom: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          id="mail"
          size="normal"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="pass"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Password />
              </InputAdornment>
            ),
          }}
          label="Password"
          type="password"
          size="normal"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          sx={{ maxWidth: 100, marginTop: 1 }}
          variant="outlined"
          type="submit"
          disabled={!validateForm()}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </FormControl>
    </div>
  );
}
