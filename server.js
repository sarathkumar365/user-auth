const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Config dot env
dotenv.config({ path: './.env' });
// console.log(process.env.AUTHOR);
// console.log(process.env.NODE_ENV);

const app = require('./app');

const port = process.env.PORT || 3000;

// mongoose.connect('mongodb://localhost:27017/user-auth').then(() => {
//   // eslint-disable-next-line no-console
//   console.log(`conneccted to DATABASE`);
// });

mongoose
  .connect(
    `mongodb+srv://sarathkumar:${process.env.ATLAS_PASS}@user-auth.8xlpxlq.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    // eslint-disable-next-line no-console
    console.log(`conneccted to DATABASE`);
  });

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`started listening in ${port}`);
});
