import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { v4 as uuid } from "uuid";

import {
  Grid,
  Paper,
  Box,
  TextField,
  Button,
  InputAdornment,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import PersonIcon from "@mui/icons-material/Person";
import ElderlyWomanIcon from "@mui/icons-material/ElderlyWoman"; // for age
import LocationCityIcon from "@mui/icons-material/LocationCity";
import LocationOnIcon from "@mui/icons-material/LocationOn"; // for pincode
import HomeIcon from "@mui/icons-material/Home"; // address
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PasswordIcon from "@mui/icons-material/Password";

import SideMenu from "./SideMenu";
import Home from "@mui/icons-material/Home";
import { HdrOnSelect, LocationCity, Password } from "@mui/icons-material";
import Email from "@mui/icons-material/Email";
import Phone from "@mui/icons-material/Phone";

const abb = {
  "Andra Pradesh": "AP",
  "Arunachal Pradesh": "AR",
  Assam: "AS",
  Bihar: "BR",
  Chhattisgarh: "CG",
  Goa: "GA",
  Gujarat: "GJ",
  Haryana: "HR",
  "Himachal Pradesh": "HP",
  Jharkhand: "JH",
  Karnataka: "KA",
  Kerala: "KL",
  "Madhya Pradesh": "MP",
  Maharashtra: "MH",
  Manipur: "MN",
  Meghalaya: "ML",
  Mizoram: "MZ",
  Nagaland: "NL",
  Odisha: "OR",
  Punjab: "PB",
  Rajasthan: "RJ",
  Sikkim: "SK",
  "Tamil Nadu": "TN",
  Telangana: "TS",
  Tripura: "TR",
  Uttarakhand: "UK",
  "Uttar Pradesh": "UP",
  "West Bengal": "WB",
};

const states = [
  "Andra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chaattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttarakhand",
  "Uttar Pradesh",
  "West Bengal",
];

export default function RegisterUser() {
  const [user, setUser] = React.useState(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [dateOfBirth, setDateOfBirth] = React.useState(new Date());
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [age, setAge] = React.useState(0);
  const [gender, setGender] = React.useState("");
  const [city, setCity] = React.useState("");
  const [sstate, setSstate] = React.useState("");
  const [pincode, setPincode] = React.useState(0);
  const [phone, setPhone] = React.useState(0);
  const [address, setAddress] = React.useState("");
  const [hospitalName, setHospitalName] = React.useState("");
  const [hospitalAddress, setHospitalAddress] = React.useState("");
  const [hospitalCity, setHospitalCity] = React.useState("");
  const [hospitalState, setHospitalState] = React.useState("");
  const [hospitalPincode, setHospitalPincode] = React.useState(0);
  const [doctorSpeciality, setDoctorSpeciality] = React.useState("");
  const [unq1, setUnq1] = React.useState("");
  const [unq2, setUnq2] = React.useState("");

  useEffect(() => {
    setUnq1(uuid());
    setUnq2(uuid());
  }, []);

  const validateForm = () => {
    return (
      firstName.length > 0 &&
      lastName.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0 &&
      age > 0 &&
      gender.length > 0 &&
      city.length > 0 &&
      sstate.length > 0 &&
      pincode > 0 &&
      phone > 0 &&
      address.length > 0
    );
  };

  const url = "http://localhost:5000/user";
  const url1 = "http://localhost:5000/doc";

  const submitHandler = (e) => {
    // e.preventDefault();

    //axios push data in user database
    if (user) {
      axios
        .post(url, {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          age: age,
          gender: gender,
          city: city,
          sstate: sstate,
          pincode: pincode,
          phone: phone,
          address: address,
          dob: dateOfBirth,
          abb: abb,
          id: unq1,
        })
        .then((res) => console.log(res.data));
    }

    //axios push data in doctor database
    else {
      axios
        .post(url1, {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          age: age,
          gender: gender,
          city: city,
          sstate: sstate,
          pincode: pincode,
          phone: phone,
          address: address,
          dob: dateOfBirth,
          abb: abb,
          hospitalName: hospitalName,
          hospitalAddress: hospitalAddress,
          hospitalCity: hospitalCity,
          hospitalState: hospitalState,
          hospitalPincode: hospitalPincode,
          speciality: doctorSpeciality,
          id1: unq1,
          id2: unq2,
        })
        .then((res) => console.log(res.data));
    }
  };

  return (
    <>
      <SideMenu />
      <Body>
        <InputLabel id="user-type">User Type</InputLabel>
        <Select
          labelId="user-type"
          sx={{ maxWidth: 100, marginBottom: 2 }}
          value={user}
          label="Select User Type"
        >
          <MenuItem value="true" onClick={() => setUser(true)}>
            User
          </MenuItem>
          <MenuItem value="false" onClick={() => setUser(false)}>
            Doctor
          </MenuItem>
        </Select>
        <Paper elevation={10} sx={{ maxWidth: 1200, flexGrow: 1 }}>
          <h5>Personal Details</h5>
          <Grid
            sx={{ padding: 1 }}
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <TextField
                id="firstName"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
                label="First Name"
                variant="outlined"
                fullWidth
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="lastName"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
                label="Last Name"
                variant="outlined"
                fullWidth
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid
            sx={{ padding: 1 }}
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of Birth"
                  value={dateOfBirth}
                  onChange={(newValue) => {
                    setDateOfBirth(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={2}>
              <TextField
                id="age"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ElderlyWomanIcon />
                    </InputAdornment>
                  ),
                }}
                label="Age"
                variant="outlined"
                fullWidth
                onChange={(e) => setAge(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="gender"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Gender</InputAdornment>
                  ),
                }}
                label="Gender"
                variant="outlined"
                fullWidth
                onChange={(e) => setGender(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid sx={{ padding: 1 }} container spacing={2} columnSpacing={3}>
            <Grid item xs={4}>
              <TextField
                id="city"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationCityIcon />
                    </InputAdornment>
                  ),
                }}
                label="City"
                variant="outlined"
                fullWidth
                onChange={(e) => setCity(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <Select
                sx={{ minWidth: 150 }}
                label="State"
                value={sstate}
                onChange={(e) => {
                  setSstate(e.target.value);
                }}
                autoWidth
              >
                <MenuItem value="">None</MenuItem>
                {states.map((state) => {
                  return <MenuItem value={state}>{state}</MenuItem>;
                })}
              </Select>
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="pincode"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon />
                    </InputAdornment>
                  ),
                }}
                label="Pincode"
                variant="outlined"
                fullWidth
                onChange={(e) => setPincode(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid sx={{ padding: 1 }} item xs={6}>
            <TextField
              id="address"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Home />
                  </InputAdornment>
                ),
              }}
              label="Address"
              variant="outlined"
              fullWidth
              multiline
              rows={2}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>
          <Grid
            sx={{ padding: 1 }}
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <TextField
                id="email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                id="contact"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone />
                    </InputAdornment>
                  ),
                }}
                label="Contact Number"
                type="contact"
                variant="outlined"
                fullWidth
                onChange={(e) => setPhone(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid
            sx={{ padding: 1 }}
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <TextField
                id="password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Password />
                    </InputAdornment>
                  ),
                }}
                label="Password"
                variant="outlined"
                fullWidth
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="confirmPassword"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Password />
                    </InputAdornment>
                  ),
                }}
                label="Confirm Password"
                variant="outlined"
                fullWidth
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
          </Grid>

          {/************************* Doctors Details *************************/}
          {!user && (
            <>
              <h5>Doctor's Details</h5>
              <Grid
                sx={{ padding: 1 }}
                container
                rowSpacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6}>
                  <TextField
                    id="hospitalName"
                    value={hospitalName}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    }}
                    label="Hospital Name"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setHospitalName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="speciality"
                    value={doctorSpeciality}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    }}
                    label="Doctor Speciality"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setDoctorSpeciality(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid
                sx={{ padding: 1 }}
                container
                rowSpacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={4}>
                  <TextField
                    id="hospitalCity"
                    value={hospitalCity}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    }}
                    label="Hospital City"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setHospitalCity(e.target.value)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Select
                    sx={{ minWidth: 150 }}
                    label="Hospital State"
                    value={hospitalState}
                    onChange={(e) => {
                      setHospitalState(e.target.value);
                    }}
                    autoWidth
                  >
                    <MenuItem value="">None</MenuItem>
                    {states.map((state) => {
                      return <MenuItem value={state}>{state}</MenuItem>;
                    })}
                  </Select>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="HospitalPincode"
                    value={hospitalPincode}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    }}
                    label="Hospital Pincode"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setHospitalPincode(e.target.value)}
                  />
                </Grid>
              </Grid>
            </>
          )}
          {/************************* Doctors Details *************************/}

          <Button varient="contained" onClick={submitHandler}>
            Submit
          </Button>
        </Paper>
      </Body>
    </>
  );
}

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
