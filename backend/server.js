const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

// Connection string
const uri = require("./config/keys").ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

// Connection to mongodb
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB succesfully connected");
});

//Require and Use files created
// const userRouter = require("./routes/userRoute");
// const bookingRouter = require("./routes/bookingRoute");
const superadminRegisterRouter = require("./routes/register/SuperAdminRegister");
const adminRegisterRouter = require("./routes/register/AdminRegister");
const userRegisterRouter = require("./routes/register/userRegister");
const login = require("./routes/Login");
const bikeRouter = require("./routes/bikeRoute");
const serviceCenterRouter = require("./routes/ServiceCenterRoute");

app.use("/register/superadmin", superadminRegisterRouter);
app.use("/register/admin", adminRegisterRouter);
app.use("/register", userRegisterRouter);
app.use("/login", login);
app.use("/bike", bikeRouter);
app.use("/service-center", serviceCenterRouter);

// app.use("/", userRouter);
// app.use("/mybike", bikeRouter);
// app.use("/bookings", bookingRouter);

// listen to port
app.listen(port, () => {
  console.log(`Server is started on port:  ${port}`);
});
