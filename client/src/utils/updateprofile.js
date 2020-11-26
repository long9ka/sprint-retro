import axios from 'axios';

const updateprofile = async (fullname, password, token) => {
  try {
    const res = await axios.put("http://localhost:8000/users", {
      fullname: fullname,
      password: password
    }, {
      headers: {
        "x-auth-token": token
      }
    });
    return {
      success: true,
      body: res.data.body,
    };
  } catch (err) {
    return {
      success: false,
      msg: err.response.data.msg,
    };
  }
}

export default updateprofile;