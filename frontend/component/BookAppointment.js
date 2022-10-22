import React, { useState } from "react";
import styled from "styled-components";

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
} from "@mui/material";
import { AccountCircle, PasswordIcon } from "@mui/icons-material";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import ScheduleIcon from "@mui/icons-material/Schedule";

//for date picker
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const BookAppointment = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [description, setDescription] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const validateForm = () => {
    return (
      firstName.length > 0 &&
      lastName.length > 0 &&
      phone.length > 0 &&
      email.length > 0 &&
      date.length > 0
    );
  };

  return (
    <Body>
      <h1>Book Appointment</h1>
      <FormControl sx={{ minWidth: 400 }}>
        <FormGroup row={true}>
          <TextField
            sx={{ minWidth: 350, marginBottom: 2, marginRight: 2 }}
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
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            sx={{ minWidth: 350, marginBottom: 2, marginLeft: 1 }}
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
        </FormGroup>
        <FormGroup row={true}>
          <TextField
            sx={{ minWidth: 300, marginBottom: 2, marginRight: 2 }}
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
            error={phone.length < 10}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            sx={{ minWidth: 300, marginBottom: 2, marginRight: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            id="mail"
            label="Email (Optional)"
            size="normal"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup row={true}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
            <DatePicker
              label="Appointment Date"
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  sx={{ marginRight: 3, minWidth: 350, marginBottom: 2 }}
                  {...params}
                />
              )}
            />
            <TimePicker
              label="Appointment Time"
              value={time}
              onChange={(newValue) => {
                setTime(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  sx={{ minWidth: 350, marginBottom: 2 }}
                  {...params}
                />
              )}
            />
          </LocalizationProvider>
        </FormGroup>
        <TextField
          sx={{ maxWidth: 600, marginBottom: 2 }}
          id="description"
          label="Describe your problem (Optional)"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
    </Body>
  );
};

const Body = styled.div`
  height: 60%;
  width: 80%;
  display: flex;
  /* flex-wrap: wrap; */
  flex-direction: column;
  align-items: center;

  h1 {
    margin-bottom: 2rem;
  }

  @media (max-width: 444px) {
  }
`;

export default BookAppointment;
