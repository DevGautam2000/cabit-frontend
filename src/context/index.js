import { createContext, useContext, useState } from "react";
import AppRouter from "../AppRouter";

const Context = createContext();

const ContextProvider = () => {
  const [user, setUser] = useState({});
  const [vehicles, setVehicles] = useState([]);
  const [userRide, setUserRide] = useState({});
  const [num, setNum] = useState("");
  return (
    <Context.Provider
      value={{
        user,
        setUser,
        vehicles,
        setVehicles,
        userRide,
        setUserRide,
        num,
        setNum,
      }}
    >
      <AppRouter />
    </Context.Provider>
  );
};

const useContextSelector = () => {
  return useContext(Context);
};

export { ContextProvider, useContextSelector };
