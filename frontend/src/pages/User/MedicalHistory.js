import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";

import SideMenu from "../../component/SideMenu";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, TextField } from "@mui/material";

const columns = [
  { id: "dateVisited", label: "Date Visited", minWidth: 100 },
  { id: "doctorName", label: "Doctor Name", minWidth: 130 },
  { id: "hospitalName", label: "Hospital Name", minWidth: 130 },
  { id: "hospitalAddress", label: "Hospital Address", minWidth: 130 },
  { id: "disease", label: "Disease", minWidth: 120 },
  { id: "symptoms", label: "Symptoms", minWidth: 150 },
  { id: "medicines", label: "Medicines", minWidth: 150 },
  { id: "medicineFees", label: "Medicines Fees", minWidth: 80 },
  { id: "HospitalFees", label: "Hospital Fees", minWidth: 80 },
];

export default function MedicalHistory() {
  const [month, setMonthValue] = React.useState(0);
  const [year, setYearValue] = React.useState(0);
  const [doctorName, setDoctorName] = React.useState("");
  const [responseArr, setResponseArr] = React.useState([]);
  const [filteredRows, setFilteredRows] = React.useState([]);
  const [search, setSearch] = React.useState(true);

  const { id } = useParams();
  // console.log(doctorName, month, year);
  const url = `http://localhost:5000/user/${id}`;

  const searchByFilter = (e) => {
    // e.preventDefault();
    setFilteredRows([]);

    //only search the value when state values are not null
    if (doctorName !== "") {
      if (filteredRows.length === 0) {
        responseArr.map((row) => {
          if (row.doctorName.toLowerCase().includes(doctorName.toLowerCase())) {
            // console.log(row);
            setFilteredRows((prev) => [...prev, row]);
          }
        });
      } else {
        filteredRows.map((row) => {
          if (row.doctorName.toLowerCase().includes(doctorName.toLowerCase())) {
            // console.log(row);
            setFilteredRows((prev) => [...prev, row]);
          }
        });
      }
    }

    if (month !== 0) {
      if (filteredRows.length === 0) {
        responseArr.map((row) => {
          if (row.dateVisited.split("-")[1] == month) {
            // console.log(row);
            setFilteredRows((prev) => [...prev, row]);
          }
        });
      } else {
        filteredRows.map((row) => {
          if (row.dateVisited.split("-")[1] == month) {
            // console.log(row);
            setFilteredRows((prev) => [...prev, row]);
          }
        });
      }
    }

    if (year !== 0) {
      if (filteredRows.length === 0) {
        responseArr.map((row) => {
          if (row.dateVisited.split("-")[0] == year) {
            // console.log(row);
            setFilteredRows((prev) => [...prev, row]);
          }
        });
        console.log(filteredRows);
      } else {
        filteredRows.map((row) => {
          if (row.dateVisited.split("-")[0] == year) {
            // console.log(row);
            setFilteredRows((prev) => [...prev, row]);
          }
        });
        console.log(filteredRows);
      }
    }
  };

  React.useEffect(() => {
    if (doctorName === "" && month === "" && year === "") {
      setFilteredRows(responseArr);
    }

    async function getData() {
      await axios
        .get(url)
        .then((res) => {
          setResponseArr(res.data.medicalHistory);
          setFilteredRows(res.data.medicalHistory);
          // console.log(res.data.medicalHistory);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    try {
      getData();
    } catch (err) {
      console.log(err);
    }
  }, [doctorName, month, year]);

  return (
    <>
      <SideMenu />
      <Body>
        <h1>Medical History</h1>
        <Search>
          <h3>Filter Your Search</h3>
          <TextField
            label="Doctor Name"
            variant="outlined"
            sx={{
              minWidth: "8rem",
              margin: "0.5rem",
            }}
            onChange={(e) => {
              setDoctorName(e.target.value);
            }}
          >
            Doctor Name
          </TextField>
          <TextField
            label="Month"
            variant="outlined"
            sx={{
              minWidth: "8rem",
              margin: "0.5rem",
            }}
            onChange={(e) => {
              setMonthValue(e.target.value);
            }}
          >
            Month
          </TextField>
          <TextField
            label="Year"
            variant="outlined"
            sx={{
              minWidth: "8rem",
              margin: "0.5rem",
            }}
            onChange={(e) => {
              setYearValue(e.target.value);
            }}
          >
            Year
          </TextField>
          <Button variant="contained" onClick={searchByFilter}>
            Submit
          </Button>
        </Search>
        <Paper sx={{ minWidth: "70%", overflow: "hidden", marginTop: 5 }}>
          <TableContainer sx={{ maxHeight: 800, maxWidth: 1300 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
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
                {filteredRows.map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={uuid()}>
                      {columns.map((column) => {
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
        </Paper>
      </Body>
    </>
  );
}

const Body = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    margin: 1rem auto;
  }
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

/*
1. data was being filterd when the attribute parameter data was erased. 
   -> when console.log(stateValue) inside onChange functions it will display you delayed value.
*/
