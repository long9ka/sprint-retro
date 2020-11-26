import axios from 'axios';

const deleteboard = async (id, token) => {
  try {
    const res = await axios.delete(`http://localhost:8000/boards/${id}`,
    {
      headers: {
        "x-auth-token": token
      }
    });
    console.log(res.data);
    return {
      success: true,
      msg: "deleted board",
    };
  } catch (err) {
    return {
      success: false,
      msg: err.response.data.msg,
    };
  }
}

export default deleteboard;