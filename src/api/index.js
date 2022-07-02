import axios from "axios";

const baseURL = "http://localhost:8080/";
export const APIROUTES = {
  SIGN_UP: "signup",
  SIGN_IN: "signin",
  ADD_USER_RIDE: "bookcab",
  UPDATE_SEATS: {
    api: "updateseats",
    OPERATION: {
      ADD: "ADD",
      DIFF: "DIFF",
    },
  },

  GET_ALL_RIDES: "getallcabs",
  GET_USER_RIDES: "getcabs",
};

const KEYS = Object.freeze({
  USER: "user",
});

export function saveToStorage(user) {
  localStorage.setItem(KEYS.USER, JSON.stringify(user));
}

export function fetchUser() {
  const p = new Promise((resolve, _) => {
    return resolve(localStorage.getItem(KEYS.USER));
  });

  return p;
}

export function signout() {
  const p = new Promise((resolve, _) => {
    localStorage.clear();
    return resolve("logged out.");
  });

  return p;
}

export function signup(user) {
  const p = new Promise(async (resolve, reject) => {
    const res = await axios.post(`${baseURL}${APIROUTES.SIGN_UP}`, user);
    if (res) {
      saveToStorage(res.data);
      return resolve(res.data);
    }

    return reject("Something went wrong.");
  });

  return p;
}

export function signin(user) {
  const p = new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(`${baseURL}${APIROUTES.SIGN_IN}`, user);
      if (res) {
        saveToStorage(res.data);
        return resolve(res.data);
      }
    } catch (error) {
      return reject(error.response.data);
    }
  });

  return p;
}

export function getAllRides() {
  const p = new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(`${baseURL}${APIROUTES.GET_ALL_RIDES}`);
      if (res) {
        return resolve(res.data);
      }
    } catch (error) {
      return reject(error.response.data);
    }
  });

  return p;
}

export function getUserRides(user) {
  const p = new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(
        `${baseURL}${APIROUTES.GET_USER_RIDES}`,
        user
      );
      if (res) {
        return resolve(res.data);
      }
    } catch (error) {
      return reject(error.response.data);
    }
  });

  return p;
}

export function addUserRide(user) {
  const p = new Promise(async (resolve, reject) => {
    try {
      const res = await axios.put(`${baseURL}${APIROUTES.ADD_USER_RIDE}`, user);
      if (res) {
        return resolve(res.data);
      }
    } catch (error) {
      return reject(error.response.data);
    }
  });

  return p;
}

export function updateSeats(seatUpdateRequest) {
  const p = new Promise(async (resolve, reject) => {
    try {
      const res = await axios.put(
        `${baseURL}${APIROUTES.UPDATE_SEATS.api}`,
        seatUpdateRequest
      );
      if (res) {
        return resolve(res.data);
      }
    } catch (error) {
      return reject(error.response.data);
    }
  });

  return p;
}
