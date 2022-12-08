import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import {
  Button,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  TextField,
  Typography,
  InputAdornment,
  FormGroup,
  AppBar,
  Paper,
} from "@mui/material";
import { AccountCircle, PasswordIcon } from "@mui/icons-material";

import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";

import SideMenu from "../../component/SideMenu";

const EditProfile = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [userData, setUserData] = useState("");
  const { id } = useParams();

  var url = `http://localhost:5000/user/${id}`;
  var url1 = `http://localhost:5000/admin/editProfile`;

  const validateForm = () => {
    return (
      firstName.length > 0 &&
      lastName.length > 0 &&
      phone.length > 0 &&
      email.length > 0 &&
      address.length > 0
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(url1, {
        id: id,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
        address: address,
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  useEffect(() => {
    async function getUserData() {
      await axios.get(url).then((res) => setUserData(res.data));
    }

    getUserData();
  }, []);

  return (
    <>
      <SideMenu />
      <Paperr elevation={3}>
        <AppBar sx={{ zIndex: -1 }}>
          <h1>EditProfile</h1>
        </AppBar>
        <FormControl>
          <TextField
            sx={{ minWdith: 350, marginTop: 3, marginBottom: 5 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            id="firstName"
            label="First Name"
            size="normal"
            variant="outlined"
            value={firstName}
            placeholder={userData.firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            sx={{ marginBottom: 5 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            id="lastName"
            label="Last Name"
            size="normal"
            variant="outlined"
            value={lastName}
            placeholder={userData.lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            sx={{ marginBottom: 5 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon />
                </InputAdornment>
              ),
            }}
            id="phoneN"
            label="Phone Number"
            size="normal"
            variant="outlined"
            value={phone}
            placeholder={userData.phoneNo}
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            sx={{ marginBottom: 5 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            id="mail"
            label="Email"
            size="normal"
            variant="outlined"
            value={email}
            placeholder={userData.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            sx={{ minWidth: 300, marginBottom: 5 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EditLocationAltIcon />
                </InputAdornment>
              ),
            }}
            id="address"
            multiline
            label="Address"
            size="normal"
            variant="outlined"
            value={address}
            placeholder={userData.address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <Button
            sx={{ maxWidth: 120, marginTop: 1 }}
            variant="outlined"
            type="submit"
            disabled={!validateForm()}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </FormControl>
      </Paperr>
    </>
  );
};

const Paperr = styled(Paper)`
  height: 38rem;
  width: 40rem;
  display: flex;
  /* flex-wrap: wrap; */
  flex-direction: column;
  align-items: center;

  @media (max-width: 444px) {
  }
`;

export default EditProfile;
