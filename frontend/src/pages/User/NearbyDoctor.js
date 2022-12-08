// Google API Key - AIzaSyALkVQ3VJ6wU5x4AVxIlAazLPVnK_5WS0M
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { v4 as uuid } from "uuid";

import DoctorDetails from "../../component/DoctorDetails";
import SideMenu from "../../component/SideMenu";

import { Button, TextField } from "@mui/material";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export default function NearbyDoctor() {
  const { id } = useParams();
  const [speciality, setSpeciality] = useState("");
  const [city, setCity] = useState("");
  const [areaPincode, setAreaPincode] = useState("");
  const [search, setSearch] = useState(false);
  const [doctorsData, setDoctorsData] = useState([]); // doctors nearby user
  const [doctorsData1, setDoctorsData1] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [ratingData, setRatingData] = useState([]);
  const [userPincode, setUserPincode] = useState("");

  const url = "http://localhost:5000/doc";
  const url1 = `http://localhost:5000/user/${id}`;
  // const searchURL = `http://localhost:5000/doc/search/${speciality}/${areaPincode}`;

  function getDoctorData() {
    //get user pincode
    axios.get(url1).then((res) => {
      console.log(res.data.pincode);
      // setUserPincode(res.data.pincode);

      axios
        .get(`http://localhost:5000/doc/search2/${res.data.pincode}`)
        .then((res) => {
          setFilteredRows(res.data);
          console.log(res.data);
        });
    });
  }

  function getSpecialityDoctor() {
    axios.get(`http://localhost:5000/doc/search1/${speciality}`).then((res) => {
      setFilteredRows(res.data);
      // console.log(res.data);
    });
  }

  function getPincodeDoctor() {
    axios
      .get(`http://localhost:5000/doc/search2/${areaPincode}`)
      .then((res) => {
        setFilteredRows(res.data);
        // console.log(res.data);
      });
  }

  function getCityDoctor() {
    axios.get(`http://localhost:5000/doc/search3/${city}`).then((res) => {
      setFilteredRows(res.data);
      // console.log(res.data);
    });
  }

  function getPinSpecialityDoctor() {
    axios
      .get(`http://localhost:5000/doc/search1/${speciality}/${areaPincode}`)
      .then((res) => {
        setFilteredRows(res.data);
        // console.log(res.data);
      });
  }

  function getPinCityDoctor() {
    axios
      .get(`http://localhost:5000/doc/search2/${areaPincode}/${city}`)
      .then((res) => {
        setFilteredRows(res.data);
        // console.log(res.data);
      });
  }

  function getSpecialityCityDoctor() {
    axios
      .get(`http://localhost:5000/doc/search3/${speciality}/${city}`)
      .then((res) => {
        setFilteredRows(res.data);
        // console.log(res.data);
      });
  }

  function getSpecialityCityPinDoctor() {
    axios
      .get(
        `http://localhost:5000/doc/search1/${speciality}/${city}/${areaPincode}`
      )
      .then((res) => {
        setFilteredRows(res.data);
        // console.log(res.data);
      });
  }

  const searchFilter = () => {
    setFilteredRows([]);

    if (speciality !== "" && areaPincode === "" && city === "")
      getSpecialityDoctor();
    else if (speciality === "" && areaPincode !== "" && city === "")
      getPincodeDoctor();
    else if (speciality === "" && areaPincode === "" && city !== "")
      getCityDoctor();
    else if (speciality !== "" && areaPincode !== "" && city === "")
      getPinSpecialityDoctor();
    else if (speciality === "" && areaPincode !== "" && city !== "")
      getPinCityDoctor();
    else if (speciality !== "" && areaPincode === "" && city !== "")
      getSpecialityCityDoctor();
    else if (speciality !== "" && areaPincode !== "" && city !== "")
      getSpecialityCityPinDoctor();
  };

  useEffect(() => {
    if (speciality === "" && areaPincode === "" && city === "") getDoctorData();

    //get user pincode
    getDoctorData();
  }, [speciality, city, areaPincode]);

  return (
    <>
      <SideMenu />
      <Body>
        <h1>Nearby Doctors</h1>
        <Search>
          <h3>Filter Your Search</h3>
          <BButton
            label="Pincode"
            variant="outlined"
            onChange={(e) => {
              setAreaPincode(e.target.value);
            }}
          >
            Doctor Name
          </BButton>
          <BButton
            label="Speciality"
            variant="outlined"
            onChange={(e) => {
              setSpeciality(e.target.value);
            }}
          >
            Speciality
          </BButton>
          <BButton
            label="City"
            variant="outlined"
            onChange={(e) => {
              setCity(e.target.value);
            }}
          >
            City
          </BButton>
          <Button varient="contained" onClick={searchFilter}>
            Submit
          </Button>
        </Search>
        <PaperBody>
          <DisplayInfo>
            {filteredRows.map((row) => (
              <DoctorDetails key={uuid()} doctorData={row} />
            ))}
          </DisplayInfo>
        </PaperBody>
      </Body>
    </>
  );
}

const Body = styled.div`
  display: flex;
  flex-direction: column;

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

const BButton = styled(TextField)`
  min-width: 8rem;
  margin: 0 0.5rem;
`;

const BBButton = styled(Button)`
  min-width: 8rem;
  margin: 0 0.5rem;
`;

const PaperBody = styled.div`
  display: flex;
  flex-direction: row;
`;

const DisplayInfo = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 5px;
  max-height: 35rem;
  min-width: 60%;
  overflow-y: scroll;
  margin-left: 30%;
`;

/*
1. data was being filterd when the attribute parameter data was erased. 
   -> when console.log(stateValue) inside onChange functions it will display you delayed value.

2. maps was not displaying, stuck on a blank screen with loading.. written on it.
*/
