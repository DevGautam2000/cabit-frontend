import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { DialogContent, IconButton } from "@mui/material";
import { CancelRounded, CheckCircleRounded } from "@mui/icons-material";
import { Colors } from "../helpers";
import { useContextSelector } from "../context";
import { addUserRide, APIROUTES, getAllRides, updateSeats } from "../api";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Popup({ handleClose, open, showSnack }) {
  const { userRide, user, setVehicles } = useContextSelector();
  const now = new Date();
  const then = new Date();

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>
        {userRide.seats
          ? "Are you sure to book the cab?"
          : "Please select seats to be booked"}
      </DialogTitle>

      {userRide.seats ? (
        <DialogContent>
          Your total is: ₹ {+userRide.seats * +userRide.price}
        </DialogContent>
      ) : null}

      <DialogActions>
        <IconButton onClick={handleClose}>
          <CancelRounded sx={{ color: Colors.failure }} />
        </IconButton>
        <IconButton
          onClick={() => {
            const rid = userRide.rid;
            delete userRide.rid;
            const copy = {
              ...user,
              rides: [
                {
                  ...userRide,
                  bookingDate: now.toDateString(),
                  travelDate: new Date(
                    then.setDate(now.getDate() + 3)
                  ).toDateString(),
                },
              ],
            };

            addUserRide(copy)
              .then((data) => {
                console.log(data);
              })
              .catch((err) => console.log(err));

            updateSeats({
              rideId: rid,
              operation: APIROUTES.UPDATE_SEATS.OPERATION.DIFF,
              bookedSeats: userRide.seats,
            })
              .then((data) => {
                console.log(data);
                showSnack();
              })
              .catch((err) => console.error(err));
            getAllRides()
              .then((data) => {
                setVehicles(() => data);
              })
              .catch((err) => console.error(err));
            handleClose();
          }}
        >
          <CheckCircleRounded sx={{ color: Colors.primary }} />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
}
