import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useContextSelector } from "../context";
import { getUserRides } from "../api";
import { Colors } from "../helpers";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: Colors.primary,
    color: theme.palette.common.white,
    fontWeight: "bold",
    fontSize: "0.98rem",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    // backgroundColor: theme.palette.action.hover,
    backgroundColor: "rgba(248, 194, 40,.2);",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables({ rides }) {
  //   const { user } = useContextSelector();
  //   const [rides, setRides] = React.useState([]);
  //   React.useEffect(() => {
  //     const effect = () => {
  //       getUserRides({
  //         userId: user.userId,
  //         password: user.password,
  //       })
  //         .then((data) => {
  //           setRides(() => data);
  //         })
  //         .catch((err) => console.error(err));
  //     };

  //     return effect();
  //   }, []);

  return (
    <TableContainer component={Paper} sx={{ minWidth: 1600 }}>
      <Table sx={{ minWidth: 1600 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Booking Date</StyledTableCell>
            <StyledTableCell align="left">Travel Date</StyledTableCell>
            <StyledTableCell align="left">Seats Booked</StyledTableCell>
            <StyledTableCell align="left">Cab Type</StyledTableCell>
            <StyledTableCell align="left">Route</StyledTableCell>
            <StyledTableCell align="left">Booking Id</StyledTableCell>
            <StyledTableCell>Price (₹)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rides.map(
            ({
              rid,
              travelDate,
              srcToDest,
              seats,
              price,
              cabType,
              bookingId,
              bookingDate,
            }) => (
              <StyledTableRow key={rid}>
                <StyledTableCell align="left">{bookingDate}</StyledTableCell>
                <StyledTableCell align="left">{travelDate}</StyledTableCell>
                <StyledTableCell align="left">{seats}</StyledTableCell>
                <StyledTableCell align="left">{cabType}</StyledTableCell>
                <StyledTableCell align="left">{srcToDest}</StyledTableCell>
                <StyledTableCell align="left">{bookingId}</StyledTableCell>
                <StyledTableCell align="left">
                  {+price * +seats}
                </StyledTableCell>
              </StyledTableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
