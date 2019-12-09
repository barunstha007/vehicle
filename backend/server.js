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

//Require and Use routes created
const login = require("./routes/Login");
const userRegisterRoute = require("./routes/userRoutes/userRegister");
const superadminRoute = require("./routes/userRoutes/SuperAdminRoutes");
const adminRoute = require("./routes/userRoutes/AdminRoutes");
const serviceCenterRoute = require("./routes/ServiceCenterRoute");
const bikeRoute = require("./routes/bikeRoute");
// const bookingRoute = require("./routes/bookingRoute");
// const profile = require("./routes/profile");

app.use("/login", login);
app.use("/register", userRegisterRoute);
app.use("/superadmin", superadminRoute);
app.use("/admin", adminRoute);
app.use("/service-center", serviceCenterRoute);
app.use("/bike", bikeRoute);
// app.use("/booking", bookingRoute);

// listen to port
app.listen(port, () => {
  console.log(`Server is started on port:  ${port}`);
});
