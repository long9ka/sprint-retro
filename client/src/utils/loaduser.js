import axios from 'axios';

const loaduser = async () => {
  try {
    const token = localStorage.getItem("token") || null;
    const res = await axios.get("http://localhost:8000/auth", {
      headers: {
        "x-auth-token": token,
      },
    });
    localStorage.setItem("token", token);
    return {
      success: true,
      user: res.data.body,
      token: localStorage.getItem("token"),
    };
  } catch (err) {
    localStorage.removeItem("token");
    return {
      success: false,
      user: null,
      token: localStorage.getItem("token"),
    };
  }
}

export default loaduser;