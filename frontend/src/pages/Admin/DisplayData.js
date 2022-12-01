import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import { Button, Paper, TextField } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import SideMenu from "./SideMenu";

const columns1 = [
  {
    id: "dateVisited",
    label: "Date Visited",
    maxWidth: 100,
    format: (value) => Date(value),
  },
  { id: "disease", label: "Disease", minWidth: 120 },
  { id: "symptoms", label: "Symptoms", minWidth: 150 },
  { id: "medicines", label: "Medicines", minWidth: 150 },
  { id: "prescriptionNote", label: "Prescription Note", minWidth: 80 },
];

const columns2 = [
  { id: "healthID", label: "Health ID", maxWidth: 80 },
  { id: "firstName", label: "First Name", maxWidth: 80 },
  { id: "lastName", label: "Last Name", maxWidth: 80 },
  { id: "age", label: "Age", maxWidth: 50 },
  { id: "gender", label: "Gender", maxWidth: 80 },
  { id: "email", label: "Email", maxWidth: 100 },
  { id: "address", label: "Address", maxWidth: 70 },
  { id: "city", label: "City", maxWidth: 80 },
  { id: "state", label: "State", maxWidth: 80 },
  { id: "pincode", label: "Pincode", maxWidth: 80 },
  { id: "DOB", label: "Date of Birth", maxWidth: 90 },
  { id: "phoneNo", label: "Phone No.", maxWidth: 80 },
];

export default function DisplayData() {
  const [healthID, setHealthID] = useState("");
  const [medicalData, setMedicalData] = useState([]);
  const [userData, setUserData] = useState();

  const url = `http://localhost:5000/user/${healthID}`;

  const searchData = async (e) => {
    e.preventDefault();

    await axios.get(url).then((res) => {
      setMedicalData(res.data.medicalHistory);
      setUserData(res.data);
      // console.log(res.data);
    });
  };

  return (
    <Body>
      <SideMenu />
      <h1>Display Data</h1>
      <SearchPart>
        <Search>
          <h6>Enter Health ID </h6>
          <BButton
            label="Health ID"
            variant="outlined"
            onChange={(e) => {
              setHealthID(e.target.value);
            }}
          ></BButton>
          <BBButton variant="contained" onClick={searchData}>
            Submit
          </BBButton>
        </Search>
      </SearchPart>
      <DisplayPart>
        {/* 1st table for displaying non-medical data */}
        <Paperr elevation={10} sx={{ minWidth: "40%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 800, minWidth: 800 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns2.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ maxWidth: column.maxWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              {/* contents of the table are displayed here */}
              <TableBody>
                {userData && (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={userData.code}
                  >
                    {columns2.map((column) => {
                      const value = userData[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          maxWidth={column.maxWidth}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paperr>
        {/* 2nd table for displaying medical history */}
        <Paperr elevation={10} sx={{ minWidth: "40%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 800, maxWidth: 800 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns1.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              {/* contents of the table are displayed here */}
              <TableBody>
                {medicalData.map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns1.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paperr>
      </DisplayPart>
    </Body>
  );
}

const Body = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    margin: 1rem auto;
  }
`;

const SearchPart = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const DisplayPart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Search = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: center;
  margin: 3rem 0;

  h3 {
    margin-right: 1rem;
  }
`;

const Paperr = styled(Paper)`
  margin: 1rem 2rem;
`;

const BButton = styled(TextField)`
  min-width: 8rem;
  margin: 0 0.5rem;
`;

const BBButton = styled(Button)`
  min-width: 8rem;
  margin: 0 0.5rem;
`;

/*
1. data was being filterd when the attribute parameter data was erased. 
   -> when console.log(stateValue) inside onChange functions it will display you delayed value.
*/
