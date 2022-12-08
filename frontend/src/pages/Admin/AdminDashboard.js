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
    // console.log(typeof disease, typeof year);

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
          var month = item.MM;
          // console.log(item);

          setPatientCount((curr) =>
            curr.map((obj) => {
              if (obj.Month === "Jan" && month === 1) {
                return { ...obj, Patients: obj.Patients + 1 };
              } else if (obj.Month === "Feb" && month === 2) {
                return { ...obj, Patients: obj.Patients + 1 };
              } else if (obj.Month === "Mar" && month === 3) {
                return { ...obj, Patients: obj.Patients + 1 };
              } else if (obj.Month === "Apr" && month === 4) {
                return { ...obj, Patients: obj.Patients + 1 };
              } else if (obj.Month === "May" && month === 5) {
                return { ...obj, Patients: obj.Patients + 1 };
              } else if (obj.Month === "June" && month === 6) {
                return { ...obj, Patients: obj.Patients + 1 };
              } else if (obj.Month === "Jul" && month === 7) {
                return { ...obj, Patients: obj.Patients + 1 };
              } else if (obj.Month === "Aug" && month === 8) {
                return { ...obj, Patients: obj.Patients + 1 };
              } else if (obj.Month === "Spet" && month === 9) {
                return { ...obj, Patients: obj.Patients + 1 };
              } else if (obj.Month === "Oct" && month === 10) {
                return { ...obj, Patients: obj.Patients + 1 };
              } else if (obj.Month === "Nov" && month === 11) {
                return { ...obj, Patients: obj.Patients + 1 };
              } else if (obj.Month === "Dec" && month === 12) {
                return { ...obj, Patients: obj.Patients + 1 };
              }
              return obj;
            })
          );
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
