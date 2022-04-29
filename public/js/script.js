import axios from "axios";
// import "regenerator-runtime/runtime";
const url = "http://127.0.0.1:4444/auth/";
const url2 = "http://localhost:4444/auth/";

// console.log("hai");

async function getData() {
  try {
    const data = await axios.get(url);
    console.log(data);
  } catch (error) {
    console.log(error);
  }

  //   axios
  //     .get("http://localhost:4444/auth/")
  //     .then(function (response) {
  //       // handle success
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       // handle error
  //       console.log(error);
  //     })
  //     .then(function () {
  //       // always executed
  //     });
}

getData();
