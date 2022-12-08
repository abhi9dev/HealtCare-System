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

import SideMenu from "../Doctor/sideMenu";

const EditProfile = (props) => {
  const { id } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [doctorData, setDoctorData] = useState({});

  const url = `http://localhost:5000/doc/${id}`;
  const url1 = `http://localhost:5000/admin/editProfile`;

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(url1, {
        id: id,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
        address: address,
        specialization: specialization,
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  useEffect(() => {
    async function getDoctorData() {
      await axios.get(url).then((res) => {
        setDoctorData(res.data);
        // console.log(res.data);
      });
    }

    getDoctorData();
  }, []);

  const validateForm = () => {
    return (
      firstName.length > 0 &&
      lastName.length > 0 &&
      phone.length > 0 &&
      email.length > 0 &&
      address.length > 0 &&
      specialization.length > 0
    );
  };

  return (
    <>
      <SideMenu />
      {/* {console.log(doctorData)} */}
      <Paperr elevation={3}>
        <AppBar sx={{ zIndex: -1 }}>
          <h1>EditProfile</h1>
        </AppBar>
        <FormControl>
          <TextField
            sx={{ minWdith: 350, marginTop: 3, marginBottom: 5 }}
            placeholder={doctorData.firstName}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {/* icons name below */}
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            id="firstName"
            label="First Name"
            size="normal"
            variant="outlined"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            sx={{ marginBottom: 5 }}
            placeholder={doctorData.lastName}
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
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            sx={{ marginBottom: 5 }}
            placeholder={doctorData.PhoneNo}
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
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            sx={{ marginBottom: 5 }}
            placeholder={doctorData.email}
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
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            sx={{ minWidth: 300, marginBottom: 5 }}
            placeholder={doctorData.address}
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
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            sx={{ minWidth: 300, marginBottom: 5 }}
            placeholder={doctorData.speciality}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EditLocationAltIcon />
                </InputAdornment>
              ),
            }}
            id="specialization"
            label="specialization"
            size="normal"
            variant="outlined"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
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
  height: 42rem;
  width: 40rem;
  display: flex;
  /* flex-wrap: wrap; */
  flex-direction: column;
  align-items: center;

  @media (max-width: 444px) {
  }
`;

export default EditProfile;
