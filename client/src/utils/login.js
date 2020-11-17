import axios from 'axios';

const login = async ({ username, password }) => {
  try {
    const res = await axios.post("http://localhost:8000/auth", {
      username,
      password,
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

export default login;