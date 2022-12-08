import React from "react";
import styled from "styled-components";

import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
} from "@mui/material";

import SideMenu from "./SideMenu";
import axios from "axios";
import { v4 as uuid } from "uuid";

const columns = [
  { id: "id", label: "HealthID", minWidth: 100 },
  { id: "firstName", label: "First Name", minWidth: 110 },
  { id: "lastName", label: "last Name", minWidth: 110 },
  { id: "phone", label: "Phone Number", minWidth: 100 },
  { id: "email", label: "Email", minWidth: 120 },
  { id: "address", label: "Address", minWidth: 120 },
  { id: "specialization", label: "Specialization", minWidth: 120 },
  { id: "approval", label: "Approval", minWidth: 100 },
  { id: "denied", label: "Deny", minWidth: 100 },
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

export default function ApproveRequest() {
  const [toBeUpdate, setToBeUpdate] = React.useState([]);
  const [healthID, setHealthID] = React.useState("");
  const [userData, setUserData] = React.useState();
  const [approvedd, setApprovedd] = React.useState(false);
  const [deniedd, setDeniedd] = React.useState(false);

  const url = `http://localhost:5000/user/${healthID}`;

  const searchData = async (e) => {
    // e.preventDefault();

    await axios.get(url).then((res) => {
      setUserData(res.data);
      // console.log(res.data);
    });
  };

  //approve the request and change the data in the database
  const ApproveRequest = (e, id) => {
    // e.preventDefault();
    // setApprovedd(true);

    var objj = {
      healthID: id,
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      address: "",
      specialization: "",
    };

    toBeUpdate.map((item) => {
      if (item.id === id) {
        objj.firstName = item.firstName;
        objj.lastName = item.lastName;
        objj.phone = item.phone;
        objj.email = item.email;
        objj.address = item.address;
        if (item.specialization !== undefined)
          objj.specialization = item.specialization;
      }
    });
    // console.log(objj);

    axios.patch(`http://localhost:5000/admin/editProfile/${id}`, objj);

    axios.delete(`http://localhost:5000/admin/editProfile/delete/${id}`);
  };

  const DeleteRequest = (e, id) => {
    // e.preventDefault();

    // setDeniedd(true);
    console.log(id);
    axios.delete(`http://localhost:5000/admin/editProfile/delete/${id}`);
  };

  React.useEffect(() => {
    if (healthID === "") {
      setUserData([]);
    }

    // if (approvedd || deniedd) {
    //   axios.get("http://localhost:5000/admin/editProfile").then((res) => {
    //     setToBeUpdate(res.data);
    //     // console.log(res.data);
    //   });
    // }

    axios.get("http://localhost:5000/admin/editProfile").then((res) => {
      setToBeUpdate(res.data);
      // console.log(res.data);
    });
  }, [healthID]);

  return (
    <>
      <SideMenu />
      <Body>
        <Part1>
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
              <BBButton variant="contained" onClick={(e) => searchData(e)}>
                Submit
              </BBButton>
            </Search>
          </SearchPart>
          <DisplayPart>
            {/* 1st table for displaying non-medical data */}
            <Paperr elevation={10} sx={{ minWidth: 500, overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 800, minWidth: 800 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns2.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          sx={{ minWidth: column.minWidth }}
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
                        key={uuid()}
                      >
                        {columns2.map((column) => {
                          const value = userData[column.id];
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              sx={{ minWidth: column.minWidth }}
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
          </DisplayPart>
        </Part1>
        <Part2>
          <h3>Data Change Approve Request</h3>
          <Paper sx={{ minWidth: 1200, overflow: "hidden", marginTop: 5 }}>
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
                  {toBeUpdate?.map((row) => {
                    return (
                      <TableRow role="checkbox" tabIndex={-1} key={uuid()}>
                        {columns.map((column) => {
                          const value = row[column.id];

                          //approval button & its onclick function
                          if (column.id === "approval") {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <Button
                                  align={column.align}
                                  varient="outlined"
                                  onClick={(e) => ApproveRequest(e, row.id)}
                                >
                                  Approve
                                </Button>
                              </TableCell>
                            );
                          }

                          //denied button & its onclick function
                          else if (column.id === "denied") {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <Button
                                  varient="outlined"
                                  color="warning"
                                  onClick={(e) => DeleteRequest(e, row.id)}
                                >
                                  Deny
                                </Button>
                              </TableCell>
                            );
                          }

                          //column other than button
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
        </Part2>
      </Body>
    </>
  );
}

const Body = styled.div`
  display: flex;
  flex-direction: column;
`;

const Part1 = styled.div``;

const Part2 = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 80%;
  margin-left: 4%;
  margin-top: 5%;
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

const BBButton = styled(Button)`
  min-width: 8rem;
  margin: 0 0.5rem;
`;

const BButton = styled(TextField)`
  min-width: 8rem;
  margin: 0 0.5rem;
`;
