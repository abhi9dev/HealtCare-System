import * as React from "react";
import styled from "styled-components";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";

const columns = [
  {
    id: "date",
    label: "Date Visited",
    maxWidth: 100,
    format: (value) => value.toDate,
  },
  { id: "doctorName", label: "Doctor Name", minWidth: 130 },
  { id: "hospitalName", label: "Hospital Name", minWidth: 130 },
  { id: "disease", label: "Disease", minWidth: 120 },
  { id: "symptoms", label: "Symptoms", minWidth: 150 },
  { id: "medicines", label: "Medicines", minWidth: 150 },
  { id: "medicinesFees", label: "Medicines Fees", minWidth: 80 },
  { id: "ConsultationFees", label: "Consultation Fees", minWidth: 80 },
];

function createData(
  sr_no,
  doctorName,
  hospitalName,
  disease,
  symptoms,
  medicines,
  medicinesFees,
  ConsultationFees
) {
  return {
    sr_no,
    doctorName,
    hospitalName,
    disease,
    symptoms,
    medicines,
    medicinesFees,
    ConsultationFees,
  };
}

const rows = [
  createData(
    1,
    "Mr. Ambale",
    "Ambale Hospital",
    "Common Cold",
    "Fever, Runny Nose",
    "Paracetamol",
    100,
    200
  ),
  createData(
    2,
    "Mr. Pratap",
    "Alexis",
    "Covid",
    "Fever, No taste",
    "Paracetamol",
    100,
    600
  ),
  createData(
    3,
    "Mrs. Gupta",
    "Gupta Multispeciality Hospital",
    "Common Cold",
    "Fever",
    "Paracetamol",
    100,
    200
  ),
];

export default function BookAppointment() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const displayByMonth = (event) => {
    event.preventDefault();
  };

  const displayByYear = (event) => {
    event.preventDefault();
  };

  const displayByCity = (event) => {
    event.preventDefault();
  };

  return (
    <Body>
      <h1>Medical History</h1>
      <Search>
        <h3>Filter Your Search</h3>
        <BButton varient="contained" onClick={displayByMonth}>
          Month
        </BButton>
        <BButton varient="contained" onClick={displayByYear}>
          Year
        </BButton>
        <BButton varient="contained" onClick={displayByCity}>
          City
        </BButton>
      </Search>
      <Paper sx={{ minWidth: "60%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 800, maxWidth: 1000 }}>
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
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
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
        <TablePagination
          rowsPerPageOptions={[10, 15, 20]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
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

const BButton = styled(Button)`
  min-width: 8rem;
  border: 1px solid #1976d2;
  margin: 0 0.5rem;
`;
