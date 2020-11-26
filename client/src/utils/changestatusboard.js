import axios from 'axios';

const changestatusboard = async (title, is_public, id, token) => {
  try {
     const res = await axios.put(`http://localhost:8000/boards/${id}`, {
       title,
       is_public,
     }, {
       headers: {
         "x-auth-token": token
       }
     });
     return {
       success: true,
       body: res.data.body
     };
  } catch (err) {
    return {
      success: false,
      msg: err.response.data.msg,
    };
  }
}

export default changestatusboard;