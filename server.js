const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Config dot env
dotenv.config({ path: "./.env" });

// console.log(process.env.AUTHOR);
// console.log(process.env.NODE_ENV);

const app = require("./app");

const port = 4444;

mongoose.connect("mongodb://localhost:27017/user-auth").then(() => {
  console.log(`conneccted to DATABASE`);
});

app.listen(port, () => {
  console.log(`started listening in ${port}`);
});
