import axios from 'axios';

const register = async ({ username, password, fullname }) => {
  try {
    const res = await axios.post("http://localhost:8000/users", {
      username,
      password,
      fullname,
    });
    const token = await res.data.body;
    localStorage.setItem("token", token);
    return {
      status: true,
      msg: "ok",
    };
  } catch (err) {
    return {
      status: false,
      msg: err.response.data.msg,
    };
  }
}

export default register;