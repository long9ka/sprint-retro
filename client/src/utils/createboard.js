import axios from 'axios';

const createboard = async (title, token) => {
  try {
    const res = await axios.post("http://localhost:8000/boards", {
      title
    },
    {
      headers: {
        "x-auth-token": token,
      },
    });
    return {
      success: true,
      board: res.data.body,
    }
  } catch (err) {
  console.log(err.response);
    return {
      success: false,
      board: null,
    }
  }
}

export default createboard;