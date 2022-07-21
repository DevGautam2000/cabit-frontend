import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import {
  Copyright,
  Popup,
  MultipleSelect as Select,
  theme,
} from "../components";
import { fetchUser, getAllRides, signout } from "../api";
import { LocalTaxiRounded, LogoutRounded } from "@mui/icons-material";
import { Alert, Chip, IconButton, Snackbar, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContextSelector } from "../context";
import { App, Colors } from "../helpers";
import vehicleImages, { bg } from "../assets";

export default function Album() {
  const { user, setUser, vehicles, userRide, setUserRide, setVehicles } =
    useContextSelector();
  React.useEffect(() => {
    const effect = () => {
      fetchUser()
        .then((u) => {
          setUser(() => u);
        })
        .catch((err) => {
          //ignore
        });
    };

    return effect();
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    const effect = () => {
      getAllRides()
        .then((data) => {
          setVehicles(() => data);
        })
        .catch((err) => console.error(err));
    };
    return effect();
    // eslint-disable-next-line
  }, [userRide,user]);
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUserRide(() => {});
  };

  const [message, setmessage] = React.useState("");
  const [openSnack, setOpenSnack] = React.useState(false);
  const [severity, setSeverity] = React.useState("error");

  const showSnack = () => {
    setTimeout(() => {
      setmessage(() => "Cab booked.");
      setOpenSnack(() => true);
      setSeverity(() => "success");
      setTimeout(() => {
        setOpenSnack(() => false);
      }, 1000);
    }, 500);
  };

  const scrollHandler = () => {
    const displacement = window.innerHeight - (13 / 100) * window.innerHeight;
    window.scrollBy(0, window.scrollY > 0 ? 0 : displacement);
  };
  return (
    <>
      {open ? (
        <Popup handleClose={handleClose} open={open} showSnack={showSnack} />
      ) : null}

      <ThemeProvider theme={theme}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={openSnack}
          autoHideDuration={1000}
        >
          <Alert severity={severity} sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <LocalTaxiRounded sx={{ mr: 2 }} />
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              sx={{ fontWeight: "bold" }}
            >
              {App.fancyName}
            </Typography>
            <Container sx={{ flex: 1 }} />
            {user !== undefined ? (
              <>
                <Typography variant="h6" color="inherit" noWrap>
                  Hello &nbsp;{user?.firstName}
                </Typography>
                <Container sx={{ flex: 0.1 }} />
              </>
            ) : null}
            <Tooltip title="logout">
              <IconButton
                onClick={() =>
                  signout().then(() => {
                    navigate("/signin");
                  })
                }
              >
                <LogoutRounded />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <main>
          {/* Hero unit */}
          <Box
            sx={{
              bgcolor: "background.paper",
              background: `url(${bg})`,
              pt: 8,
              pb: 6,
              minHeight: "80vh",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="white"
                gutterBottom
              >
                {App.name}
              </Typography>
              <Typography variant="h5" align="center" color="white" paragraph>
                {App.desc}
              </Typography>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Button variant="contained" onClick={scrollHandler}>
                  Book Cab
                </Button>
                <Button
                  variant="outlined"
                  sx={{ color: "white", fontWeight: "bold" }}
                  onClick={() => {
                    if (user === null || Object.keys(user).length === 0) {
                      navigate("/signin");
                      return;
                    }
                    navigate("/history");
                  }}
                >
                  History
                </Button>
              </Stack>
            </Container>
          </Box>
          {/* <hr style={{ width: "40vw" }} /> */}
          <Container sx={{ py: 2 }} maxWidth="md">
            <Typography
              gutterBottom
              variant="h6"
              align="center"
              color={Colors.primary}
            >
              Available Cabs
            </Typography>
          </Container>
          <Container sx={{ py: 2 }} maxWidth="md">
            {/* <Container sx={{ height: 20 }} /> */}
            {/* End hero unit */}
            <Grid container spacing={4}>
              {vehicles.map((vehicle, index) => {
                const {
                  cabType,
                  availableSeats,
                  price,
                  srcToDest,
                  totalSeats,
                } = vehicle;
                return (
                  <Grid item key={index} xs={12} sm={6} md={4}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{
                          // 16:9
                          pt: "30%",
                          width: "80%",
                          height: "45%",
                          objectFit: "contain",
                        }}
                        image={
                          vehicleImages[`${cabType.toString().toLowerCase()}`]
                        }
                        alt="random"
                      />

                      <Container sx={{ height: 6 }} />

                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="h2"
                          color={Colors.primary}
                        >
                          <Stack
                            direction={"row"}
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            {cabType[0]}
                            {cabType.toLowerCase().substring(1)}
                            <Tooltip title="Route">
                              <Chip
                                label={srcToDest}
                                sx={{ height: "20px", fontSize: 10 }}
                              />
                            </Tooltip>
                          </Stack>
                          <Stack
                            direction={"row"}
                            mt="10px"
                            alignItems={"center"}
                            justifyContent="space-between"
                          >
                            <Tooltip title="Available seats">
                              <Chip
                                label={
                                  availableSeats > 0
                                    ? `${availableSeats} / ${totalSeats}`
                                    : "Booked"
                                }
                                sx={{ height: "25px" }}
                              />
                            </Tooltip>

                            <Tooltip title="price">
                              <Chip
                                label={`₹ ${price} / seat`}
                                sx={{ height: "25px" }}
                                variant="outlined"
                              />
                            </Tooltip>

                            <Select bound={availableSeats} />
                          </Stack>
                        </Typography>
                        <Container sx={{ height: 6 }} />
                        <hr />
                        <Container sx={{ height: 6 }} />
                        <Typography>
                          Enjoy wonderful rides with wonderful cabs.Just cabIt!
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          variant="outlined"
                          disabled={availableSeats <= 0 ? true : false}
                          onClick={() => {
                            if (
                              user === null ||
                              Object.keys(user).length === 0
                            ) {
                              navigate("/signin");
                              return;
                            }

                            setUserRide(() => ({ ...userRide, ...vehicle }));
                            handleClickOpen();
                          }}
                        >
                          Book Now
                        </Button>
                      </CardActions>
                      <Container sx={{ height: 10 }} />
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </main>
        {/* Footer */}
        <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
          <Copyright />
        </Box>
        {/* End footer */}
      </ThemeProvider>
    </>
  );
}
