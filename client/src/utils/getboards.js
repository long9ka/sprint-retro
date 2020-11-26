import axios from 'axios';

const getboards = async (token) => {
  try {
    const res = await axios.get("http://localhost:8000/boards", {
      headers: {
        "x-auth-token": token,
      }
    });
    return ({
      status: true,
      body: res.data.body,
    });
  } catch (err) {
    return ({
     status: false,
     body: null,
    });
  }

}

export default getboards;