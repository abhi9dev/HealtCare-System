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
import { Button, TextField, Rating } from "@mui/material";

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
  { id: "starRating", label: "Star Rating", minWidth: 130 },
];

export default function MedicalHistory() {
  const [month, setMonthValue] = React.useState(0);
  const [year, setYearValue] = React.useState(0);
  const [doctor, setDoctor] = React.useState("");
  const [responseArr, setResponseArr] = React.useState([]);
  const [filteredRows, setFilteredRows] = React.useState([]);
  const [search, setSearch] = React.useState(true);
  const [toBeRead, setToBeRead] = React.useState(true);
  const [value, setValue] = React.useState(0);

  const { id } = useParams();
  // console.log(doctorName, month, year);

  /******************************   SEARCHING FUNCTIONS STARTS     ********************************/
  const url = `http://localhost:5000/user/${id}`;

  function DoctorNameHistory() {
    axios
      .get(`http://localhost:5000/user/${id}/search1/${doctor}`)
      .then((res) => {
        setFilteredRows(res.data);
        // console.log(res.data);
      });
  }

  function MonthHistory() {
    axios
      .get(`http://localhost:5000/user/${id}/search2/${month}`)
      .then((res) => {
        setFilteredRows(res.data);
        // console.log(res.data);
      });
  }

  function YearHistory() {
    axios
      .get(`http://localhost:5000/user/${id}/search3/${year}`)
      .then((res) => {
        setFilteredRows(res.data);
        // console.log(res.data);
      });
  }

  function DoctorMonthHistory() {
    axios
      .get(`http://localhost:5000/user/${id}/search1/${doctor}/${month}`)
      .then((res) => {
        setFilteredRows(res.data);
        // console.log(res.data);
      });
  }

  function MonthYearHistory() {
    axios
      .get(`http://localhost:5000/user/${id}/search2/${month}/${year}`)
      .then((res) => {
        setFilteredRows(res.data);
        // console.log(res.data);
      });
  }

  function YearDocHistory() {
    axios
      .get(`http://localhost:5000/user/${id}/search3/${year}/${doctor}`)
      .then((res) => {
        setFilteredRows(res.data);
        // console.log(res.data);
      });
  }

  function DoctorMonthYearHistory() {
    axios
      .get(
        `http://localhost:5000/user/${id}/search1/${doctor}/${month}/${year}`
      )
      .then((res) => {
        setFilteredRows(res.data);
        // console.log(res.data);
      });
  }

  const searchByFilter = (e) => {
    e.preventDefault();
    setFilteredRows([]);

    if (doctor !== "" && month === 0 && year === 0) {
      DoctorNameHistory();
    } else if (doctor === "" && month !== 0 && year === 0) {
      MonthHistory();
    } else if (doctor === "" && month === 0 && year !== 0) {
      YearHistory();
    } else if (doctor !== "" && month !== 0 && year === 0) {
      DoctorMonthHistory();
    } else if (doctor === "" && month !== 0 && year !== 0) {
      MonthYearHistory();
    } else if (doctor !== "" && month === 0 && year !== 0) {
      YearDocHistory();
    } else if (doctor !== "" && month !== 0 && year !== 0) {
      DoctorMonthYearHistory();
    }
  };

  /******************************   SEARCHING FUNCTIONS ENDS     **********************************/

  React.useEffect(() => {
    if (doctor === "" && month === 0 && year === 0) getData();

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

    getData();
  }, [doctor, month, year]);

  const sendRating = (doctorID) => {
    // setToBeRead(true);
    console.log(doctorID);

    // axios
    //   .post(`http://localhost:5000/doc/${doctorID}/rating`, {
    //     rating: value,
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //   });
  };

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
              setDoctor(e.target.value);
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

                        if (column.id === "dateVisited") {
                          var datee = new Date(value);
                          // console.log(datee.toLocaleDateString());
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(datee.toLocaleDateString())
                                : datee.toLocaleDateString()}
                            </TableCell>
                          );
                        } else if (column.id === "starRating") {
                          //rating not given yet
                          if (value === undefined) {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <Rating
                                  name="Rate Doctor"
                                  value={value}
                                  onChange={(event, newValue) => {
                                    setValue(newValue);
                                  }}
                                  onClick={(e) => {
                                    // sendRating(row.doctorID);
                                    console.log(row.doctorID);
                                  }}
                                />
                              </TableCell>
                            );
                          }

                          //rating already given, just showing the rating
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <Rating
                                name="Rate Doctor"
                                value={value}
                                readOnly
                              />
                            </TableCell>
                          );
                        }

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
