import React from "react";
import styled from "styled-components";

import { Paper, TextField } from "@mui/material";

import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";

const DemoForm = () => {
  return (
    <div>
      <Paper sx={{ minHeight: 500, minWidth: 500 }} elevation={3}>
        <TextField
          id="outlined-basic"
          label="Sample"
          variant="outlined"
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        ></TextField>
      </Paper>
    </div>
  );
};

export default DemoForm;
