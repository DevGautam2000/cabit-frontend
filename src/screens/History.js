import { Stack, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getUserRides } from "../api";
import { CustomizedTables as Table } from "../components";
import { useContextSelector } from "../context";
import { Colors } from "../helpers";

function History() {
  const { user } = useContextSelector();
  const [rides, setRides] = useState([]);
  useEffect(() => {
    let isUnmount = false;
    const effect = () => {
      if (!isUnmount) {
        getUserRides({
          userId: user.userId,
          password: user.password,
        })
          .then((data) => {
            console.log(data);
            setRides(() => data);
          })
          .catch((err) => console.error(err));
      }
    };

    effect();

    return () => (isUnmount = true);
  }, []);

  return (
    <>
      {rides.length > 0 ? (
        <Container
          sx={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Stack mt={10}>
            <Typography
              variant="h5"
              align="center"
              color={Colors.primary}
              fontWeight="bold"
            >
              Booked Rides
            </Typography>
            <Box sx={{ height: 30 }} />
            <Table rides={rides} />
          </Stack>
        </Container>
      ) : (
        <Container
          sx={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Stack mt={10}>
            <Typography
              variant="h5"
              align="center"
              color={Colors.primary}
              fontWeight="bold"
            >
              No Rides yet!
            </Typography>
            <Box sx={{ height: 30 }} />
          </Stack>
        </Container>
      )}
    </>
  );
}

export default History;
