import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import vehicleImages from "../assets";
import { Colors, vehicleRids } from "../helpers";
import { APIROUTES, deleteCab, fetchUser, updateSeats } from "../api";
import { useContextSelector } from "../context";

function Card({ ride, showSnack }) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const {
    cabType,
    price,
    srcToDest,
    seats,
    bookingDate,
    bookingId,
    travelDate,
  } = {
    ...ride,
  };

  const { setUser } = useContextSelector();

  return (
    <Box
      sx={{
        width: "60%",
        height: "210px",
        boxShadow: "0 0 10px #3333",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        marginBottom: "30px",
      }}
    >
      <Stack
        sx={{
          height: "100%",
          flex: 0.7,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={vehicleImages[cabType.toLowerCase()]}
          alt={cabType}
          width="190px"
          height="190px"
          style={{
            objectFit: "contain",
          }}
        />
      </Stack>
      <Stack
        sx={{
          height: "100%",
          flex: 1,
          display: "flex",
          // alignItems: "center",
          justifyContent: "space-evenly",
          flexDirection: "column",
          padding: "10px 2rem",
          position: "relative",
        }}
      >
        <Typography sx={{ color: Colors.primary, fontSize: "1.1rem" }}>
          {cabType}
        </Typography>
        <Typography sx={{ fontSize: "0.8rem", color: "gray" }}>
          {srcToDest}
        </Typography>
        <Stack direction="row" spacing={2}>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              minWidth: "80px",
              flex: 1,
            }}
          >
            ₹ {+price * +seats}
          </Typography>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              minWidth: "80px",
              flex: 1,
            }}
          >
            {seats} seat(s)
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Button
            className="Card__button"
            variant="contained"
            sx={{
              textTransform: "none",
              background: Colors.primary,
              flex: 0.3,
            }}
            onClick={() => {
              deleteCab({ bookingId })
                .then((data) => {
                  console.log(data);
                  showSnack();
                })
                .catch((err) => console.error(err));

              fetchUser()
                .then((u) => {
                  setUser(() => JSON.parse(u));
                })
                .catch((err) => {
                  //ignore
                });

              updateSeats({
                rideId: vehicleRids[cabType],
                operation: APIROUTES.UPDATE_SEATS.OPERATION.ADD,
                bookedSeats: seats,
              })
                .then((data) => {
                  console.log(data);
                })
                .catch((err) => console.error(err));
            }}
          >
            Cancel
          </Button>
        </Stack>

        <Stack direction="row">
          <Stack direction="row">
            <Typography sx={{ color: "#333", fontSize: "0.5rem" }}>
              Booking Date:{" "}
              {Math.abs(new Date(Date.parse(bookingDate)).getDate())}{" "}
              {months[Math.abs(new Date(Date.parse(bookingDate)).getMonth())]}{" "}
              {Math.abs(new Date(Date.parse(bookingDate)).getFullYear())}
            </Typography>
            <Box
              sx={{ width: "10px", display: "inline-block", height: "100%" }}
            ></Box>
            <Typography sx={{ color: "#333", fontSize: "0.5rem" }}>
              Travel Date:{" "}
              {Math.abs(new Date(Date.parse(travelDate)).getDate())}{" "}
              {months[Math.abs(new Date(Date.parse(travelDate)).getMonth())]}{" "}
              {Math.abs(new Date(Date.parse(travelDate)).getFullYear())}
            </Typography>
            <Box
              sx={{ width: "10px", display: "inline-block", height: "100%" }}
            ></Box>
            <Typography sx={{ color: "#333", fontSize: "0.5rem" }}>
              BookingID :{" "}
              {bookingId?.substring(bookingId.length - 6, bookingId.length)}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

export default Card;
