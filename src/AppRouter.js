import { useEffect, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import { fetchUser, getAllRides } from "./api";
import { useContextSelector } from "./context";
import { History, Home, Ride, Signin, Signup } from "./screens";

function AppRouter() {
  let isMounted = useRef(true);
  const { setUser, setVehicles } = useContextSelector();

  useEffect(() => {
    const effect = () => {
      isMounted.current = false;
      let usr;
      fetchUser()
        .then((u) => {
          usr = JSON.parse(u);
          setUser(() => usr);
        })
        .catch((err) => {
          // ignore
        });

      if (usr === null) {
        // navigate("/signin");
        return;
      }

      getAllRides()
        .then((data) => {
          setVehicles(() => data);
        })
        .catch((err) => console.error(err));
    };
    return effect();
    // eslint-disable-next-line
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/ride" element={<Ride />} />
      <Route path="/history" element={<History />} />
    </Routes>
  );
}

export default AppRouter;
