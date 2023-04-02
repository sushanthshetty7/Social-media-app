import axios from "axios";

export const loginCall = async (userCred, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const resp = await axios.post("auth/login", userCred);
    dispatch({ type: "LOGIN_SUCCESS", payload: resp.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FALIURE", payload: err });
  }
};
