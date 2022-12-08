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

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import CoronavirusIcon from "@mui/icons-material/Coronavirus";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PaidIcon from "@mui/icons-material/Paid";
import NotesIcon from "@mui/icons-material/Notes";
import { v4 as uuid } from "uuid";

import SideMenu from "./sideMenu";

const columns = [
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

export default function MedicalHistory() {
  var { id } = useParams();
  var [healthID, setHealthID] = useState("");
  var [disease, setDisease] = useState("");
  var [symptoms, setSymptoms] = useState("");
  var [medicines, setMedicines] = useState("");
  var [medicineFees, setMedicineFees] = useState(0);
  var [consultationFees, setConsultationFees] = useState(0);
  var [prescriptionNote, setPrescriptionNote] = useState("");
  var [medicalData, setMedicalData] = useState([]);
  var [doctorData, setDoctorData] = useState({});

  var url = `http://localhost:5000/user/${healthID}`;
  var url1 = `http://localhost:5000/doc/${id}`;

  useEffect(() => {
    axios.get(url1).then((res) => {
      setDoctorData(res.data);
      console.log(res.data);
    });
  }, []);

  const searchData = async (e) => {
    e.preventDefault();

    await axios.get(url).then((res) => {
      setMedicalData(res.data.medicalHistory);
      // console.log(res.data.medicalHistory);
    });
  };

  const postTreatmentData = () => {
    var obj = {
      dateVisited: Date(),
      doctorID: doctorData.doctorID,
      doctorName: `${doctorData.firstName} ${doctorData.lastName}`,
      hospitalName: doctorData.hospitalName,
      hospitalAddress: doctorData.hopitalAdd,
      disease: disease,
      symptoms: symptoms,
      medicines: medicines,
      medicineFees: medicineFees,
      hospitalFees: consultationFees,
      prescriptionNote: prescriptionNote,
    };

    // axios
    //   .post(url, obj)
    //   .then((res) => {
    //     console.log(res.data);
    //   });

    axios.patch(url, obj).then((res) => {
      console.log(res.data);
    });
  };

  const validateForm = () => {
    return (
      disease.length > 0 &&
      symptoms.length > 0 &&
      medicines.length > 0 &&
      medicineFees > 0 &&
      consultationFees > 0 &&
      prescriptionNote.length > 0
    );
  };

  const handleSubmit = (event) => {
    // event.preventDefault();

    postTreatmentData();
  };

  return (
    <Body>
      <SideMenu />
      <h1>Treat Patient</h1>
      <SearchPart>
        <Search>
          <h6>Enter patient Health ID </h6>
          <BButton
            label="Health ID"
            variant="outlined"
            onChange={(e) => {
              setHealthID(e.target.value);
            }}
          ></BButton>
          <BBButton variant="contained" type="button" onClick={searchData}>
            Submit
          </BBButton>
        </Search>
      </SearchPart>
      <DisplayPart>
        <Paper sx={{ minWidth: "40%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 800, maxWidth: 800 }}>
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
                {medicalData.map((row) => {
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
        <Paperr elevation={3}>
          <FormControl>
            <TextField
              sx={{ minWdith: 200, marginTop: 2, marginBottom: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CoronavirusIcon />
                  </InputAdornment>
                ),
              }}
              id="disease"
              label="Enter Disease"
              size="normal"
              variant="outlined"
              value={disease}
              onChange={(e) => setDisease(e.target.value)}
            />
            <TextField
              sx={{ marginBottom: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MedicalInformationIcon />
                  </InputAdornment>
                ),
              }}
              id="symptoms"
              label="Enter Symptoms"
              size="normal"
              variant="outlined"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
            />
            <TextField
              sx={{ marginBottom: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VaccinesIcon />
                  </InputAdornment>
                ),
              }}
              id="medicines"
              label="Medicines"
              size="normal"
              variant="outlined"
              value={medicines}
              onChange={(e) => setMedicines(e.target.value)}
            />
            <TextField
              sx={{ marginBottom: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PaidIcon />
                  </InputAdornment>
                ),
              }}
              id="medicineFees"
              label="Medicine Fees"
              size="normal"
              variant="outlined"
              value={medicineFees}
              onChange={(e) => setMedicineFees(e.target.value)}
            />
            <TextField
              sx={{ minWidth: 200, marginBottom: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoneyIcon />
                  </InputAdornment>
                ),
              }}
              id="consultationFees"
              label="Consultation Fees"
              size="normal"
              variant="outlined"
              value={consultationFees}
              onChange={(e) => setConsultationFees(e.target.value)}
            />
            <TextField
              sx={{ minWidth: 120, marginBottom: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <NotesIcon />
                  </InputAdornment>
                ),
              }}
              id="prescriptionNote"
              multiline
              label="Enter Prescription Note"
              size="normal"
              variant="outlined"
              value={prescriptionNote}
              onChange={(e) => setPrescriptionNote(e.target.value)}
            />
            <Button
              sx={{ maxWidth: 120, marginTop: 3 }}
              variant="outlined"
              type="submit"
              disabled={!validateForm()}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </FormControl>
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
  flex-direction: row;
`;

const Paperr = styled(Paper)`
  height: 38rem;
  width: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 2rem;
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
