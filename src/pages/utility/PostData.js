import axios from 'axios'

export async function postData(){
    const message = "post testing message101"
    await axios.post("/postData", {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      firstName: 'Fred',
      lastName: 'Flintstone',
      message: message
    })
    .then(function (response) {
      console.log("response PostData: ",response);
    })
    .catch(function (error) {
      console.log("error during PostData:",error.response.data);
    });
  }
