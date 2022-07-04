import { Alert, Snackbar, Stack, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { fetchUser, getUserRides } from "../api";
import { Card, Copyright } from "../components";
import { useContextSelector } from "../context";
import { Colors } from "../helpers";

function History() {
  const { user, setUser } = useContextSelector();
  useEffect(() => {
    let isUnmount = false;
    const effect = () => {
      if (!isUnmount) {
        fetchRides();
      }
    };

    effect();

    return () => (isUnmount = true);
    // eslint-disable-next-line
  }, []);
  React.useEffect(() => {
    const effect = () => {
      fetchUser()
        .then((u) => {
          setUser(() => JSON.parse(u));
        })
        .catch((err) => {
          //ignore
        });
    };

    return effect();
    // eslint-disable-next-line
  }, []);

  const [rides, setRides] = useState([]);
  const fetchRides = () => {
    getUserRides({
      userId: user?.userId,
      password: user?.password,
    })
      .then((data) => {
        const rev = data.reverse();
        setRides(() => rev);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    let isUnmount = false;
    const effect = () => {
      if (!isUnmount) {
        fetchRides();
      }
    };

    effect();

    return () => (isUnmount = true);
    // eslint-disable-next-line
  }, [user]);

  const [message, setmessage] = React.useState("");
  const [openSnack, setOpenSnack] = React.useState(false);
  const [severity, setSeverity] = React.useState("error");

  const showSnack = () => {
    setTimeout(() => {
      setmessage(() => "Cab cancelled.");
      setOpenSnack(() => true);
      setSeverity(() => "success");
      setTimeout(() => {
        setOpenSnack(() => false);
      }, 1000);
    }, 500);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnack}
        autoHideDuration={1000}
      >
        <Alert severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      {rides.length > 0 ? (
        <>
          <Container
            sx={{
              minHeight: "100vh",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Stack mt={10} alignItems="center" width="60vw">
              <Typography
                variant="h5"
                align="center"
                color={Colors.primary}
                fontWeight="bold"
              >
                Booked Rides
              </Typography>
              <Box sx={{ height: 30 }} />
              {rides.map((ride) => (
                <Card ride={ride} key={ride.rid} showSnack={showSnack} />
              ))}
            </Stack>
          </Container>
          <Copyright />
        </>
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

          <Copyright />
        </Container>
      )}
    </>
  );
}

export default History;
