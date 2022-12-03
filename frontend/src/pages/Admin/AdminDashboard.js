import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Column, G2 } from "@ant-design/plots";
import axios from "axios";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import SideMenu from "./SideMenu.js";

const AdminDashboard = () => {
  const [disease, setDisease] = useState("Heart Attack");
  const [year, setYear] = useState(2022);
  const [patientCount, setPatientCount] = useState([
    { Month: "Jan", Patients: 0 },
    { Month: "Feb", Patients: 0 },
    { Month: "Mar", Patients: 0 },
    { Month: "Apr", Patients: 0 },
    { Month: "May", Patients: 0 },
    { Month: "June", Patients: 0 },
    { Month: "Jul", Patients: 0 },
    { Month: "Aug", Patients: 0 },
    { Month: "Spet", Patients: 0 },
    { Month: "Oct", Patients: 0 },
    { Month: "Nov", Patients: 0 },
    { Month: "Dec", Patients: 0 },
  ]);
  const [config, setConfig] = useState({
    data: patientCount,
    xField: "Month",
    yField: "Patients",
    height: 700,
    width: 800,
    meta: {
      count: {
        alias: "top2000 唱片总量",
        nice: true,
      },
      release: {
        tickInterval: 5,
        alias: "唱片发行年份",
      },
    },
    brush: {
      enabled: true,
      action: "highlight",
    },
  });

  useEffect(() => {
    var url = `http://localhost:5000/admin/graphData/${disease}/${year}`;

    async function getGraphData() {
      await axios.get(url).then((res) => {
        // setDataa(res.data);
        // console.log(res.data);

        setPatientCount([
          { Month: "Jan", Patients: 0 },
          { Month: "Feb", Patients: 0 },
          { Month: "Mar", Patients: 0 },
          { Month: "Apr", Patients: 0 },
          { Month: "May", Patients: 0 },
          { Month: "June", Patients: 0 },
          { Month: "Jul", Patients: 0 },
          { Month: "Aug", Patients: 0 },
          { Month: "Spet", Patients: 0 },
          { Month: "Oct", Patients: 0 },
          { Month: "Nov", Patients: 0 },
          { Month: "Dec", Patients: 0 },
        ]);

        res.data.map((item) => {
          if (item.MM === 1) {
            return setPatientCount([(patientCount[0].Patients += 1)]);
          } else if (item.MM === 2) {
            return setPatientCount([(patientCount[1].Patients += 1)]);
          } else if (item.MM === 3) {
            return setPatientCount([(patientCount[2].Patients += 1)]);
          } else if (item.MM === 4) {
            return setPatientCount([(patientCount[3].Patients += 1)]);
          } else if (item.MM === 5) {
            return setPatientCount([(patientCount[4].Patients += 1)]);
          } else if (item.MM === 6) {
            return setPatientCount([(patientCount[5].Patients += 1)]);
          } else if (item.MM === 7) {
            return setPatientCount([(patientCount[6].Patients += 1)]);
          } else if (item.MM === 8) {
            return setPatientCount([(patientCount[7].Patients += 1)]);
          } else if (item.MM === 9) {
            return setPatientCount([(patientCount[8].Patients += 1)]);
          } else if (item.MM === 10) {
            return setPatientCount([(patientCount[9].Patients += 1)]);
          } else if (item.MM === 11) {
            return setPatientCount([(patientCount[10].Patients += 1)]);
          }

          //last case i.e for December Month
          return setPatientCount([(patientCount[11].Patients += 1)]);
        });
      });

      console.log(patientCount);
      setConfig((prev) => ({
        ...prev,
        data: patientCount,
      }));
    }

    getGraphData();
  }, [disease, year]);

  const handleChangeDisease = (e) => {
    setDisease(e.target.value);
  };

  const handleChangeYear = (e) => {
    setYear(e.target.value);
  };

  return (
    <>
      <SideMenu />
      <Body>
        <h1 sx={{ marginBottom: 2 }}>Infected People</h1>
        <SearchPart>
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="selectDisease">Disease</InputLabel>
            <Select
              labelId="selectDisease"
              id="disease"
              value={disease}
              onChange={handleChangeDisease}
              label="Disease"
            >
              <MenuItem value="Diabites">Diabetes</MenuItem>
              <MenuItem value="Dengue">Dengue</MenuItem>
              <MenuItem value="Heart Attack">Heart Attack</MenuItem>
              <MenuItem value="Tuberculosis">Tuberculosis</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="selectYear">Year</InputLabel>
            <Select
              labelId="selectYear"
              id="year"
              value={year}
              onChange={handleChangeYear}
              label="Year"
            >
              <MenuItem value={2022}>2022</MenuItem>
              <MenuItem value={2021}>2021</MenuItem>
            </Select>
          </FormControl>
        </SearchPart>
        <Column {...config} />
      </Body>
    </>
  );
};

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

const SearchPart = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export default AdminDashboard;
