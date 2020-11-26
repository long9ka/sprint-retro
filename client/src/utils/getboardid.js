import axios from 'axios';

const getboardid = async (id, token) => {
  try {
    const res = await axios.get(`http://localhost:8000/boards/${id}`, {
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

export default getboardid;