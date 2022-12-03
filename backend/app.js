const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
// const mongoose = require("mongoose");
const cors = require("cors");
const { request } = require("express");

// const patientSchema = require("./Schema/patient");

const app = express();

// const customMiddelware = () => {
//   console.log("custom middleware");
// };

// app.use(customMiddelware);

// Implement Body Parser

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(cors());
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

//Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
var dbName = "HealthCare"; //Healtcare -> test database.

app.get("/user", (req, res) => {
  async function getData() {
    // Use connect method to connect to the server
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const collection = db.collection("userData");

    var findResult = await collection.find({}).toArray();
    // console.log(findResult);
    res.send(findResult);
  }

  getData();
});

app.get("/user/:id", (req, res) => {
  async function getUserData() {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("userData");

    var findResult = await collection
      .find({ healthID: req.params.id })
      .toArray();
    // console.log(findResult);

    res.send(findResult[0]);
  }

  getUserData();
});

app.post("/user", (req, res) => {
  const dataa = req.body;
  // console.log(dataa);

  var healthID =
    dataa.firstName[0].toUpperCase() +
    dataa.lastName[0].toUpperCase() +
    dataa.id.replace(/\s+/g, "").slice(0, 6);

  var dataToUpload = {
    healthID: healthID,
    address: dataa.address,
    age: dataa.age,
    gender: dataa.gender,
    medicalHistory: [],
    password: dataa.password,
    email: dataa.email,
    firstName: dataa.firstName,
    lastName: dataa.lastName,
    city: dataa.city,
    state: dataa.sstate,
    pincode: dataa.pincode,
    DOB: dataa.dob,
    phoneNo: dataa.phone,
  };

  // console.log(healthID);

  async function registerUser() {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("userData");

    if (await collection.findOne({ healthID: healthID })) {
      console.log("ID alread exists!");
    } else {
      await collection.insertOne(dataToUpload);
    }
  }

  registerUser();
});

app.patch("/user/:id", (req, res) => {
  const dataa = req.body;
  // console.log(dataa);

  async function updateData() {
    // Use connect method to connect to the server
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("userData");

    await collection.updateOne(
      { healthID: req.params.id },
      { $push: { medicalHistory: dataa } }
    );
  }

  updateData();
});

/**                                     MEDICAL HISTORY SEARCH BEGINS...                            **/

/****************************MEDICAL HISTORY SEARCH WITH ONE PARAMETER********************************* */

app.get("/user/:id/search1/:doc", (req, res) => {
  var doc = req.params.doc;

  async function getUserData() {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("userData");

    var findResult = await collection
      .find({
        healthID: req.params.id,
      })
      .toArray();
    // console.log(findResult);

    var anss = [];
    findResult[0].medicalHistory.map((item) => {
      if (item.doctorName.includes(doc)) {
        anss = [...anss, item];
      }
    });

    res.send(anss);
  }

  getUserData();
});

app.get("/user/:id/search2/:month", (req, res) => {
  var month = req.params.month;
  parseInt(month);

  async function getUserData() {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("userData");

    var findResult = await collection
      .find({
        healthID: req.params.id,
      })
      .toArray();
    // console.log(findResult);

    var anss = [];
    findResult[0].medicalHistory.map((item) => {
      var datee = new Date(item.dateVisited);
      if (datee.getMonth() + 1 == month) {
        anss = [...anss, item];
      }
    });

    res.send(anss);
  }

  getUserData();
});

app.get("/user/:id/search3/:year", (req, res) => {
  var year = req.params.year;
  parseInt(year);

  async function getUserData() {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("userData");

    var findResult = await collection
      .find({
        healthID: req.params.id,
      })
      .toArray();
    // console.log(findResult);

    var anss = [];
    findResult[0].medicalHistory.map((item) => {
      var datee = new Date(item.dateVisited);
      if (datee.getFullYear() == year) {
        anss = [...anss, item];
      }
    });

    res.send(anss);
  }

  getUserData();
});

/****************************MEDICAL HISTORY SEARCH WITH TWO PARAMETER********************************* */
app.get("/user/:id/search1/:doc/:month", (req, res) => {
  var doc = req.params.doc;
  var month = req.params.month;
  parseInt(month);

  async function getUserData() {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("userData");

    var findResult = await collection
      .find({
        healthID: req.params.id,
      })
      .toArray();
    // console.log(findResult);

    var anss = [];
    findResult[0].medicalHistory.map((item) => {
      var datee = new Date(item.dateVisited);
      if (item.doctorName.includes(doc) && datee.getMonth() + 1 == month) {
        anss = [...anss, item];
      }
    });

    res.send(anss);
  }

  getUserData();
});

app.get("/user/:id/search2/:month/:year", (req, res) => {
  var year = req.params.year;
  var month = req.params.month;
  parseInt(month);
  parseInt(year);

  async function getUserData() {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("userData");

    var findResult = await collection
      .find({
        healthID: req.params.id,
      })
      .toArray();
    // console.log(findResult);

    var anss = [];
    findResult[0].medicalHistory.map((item) => {
      var datee = new Date(item.dateVisited);
      if (datee.getFullYear() == year && datee.getMonth() + 1 == month) {
        anss = [...anss, item];
      }
    });

    res.send(anss);
  }

  getUserData();
});

app.get("/user/:id/search3/:year/:doc", (req, res) => {
  var year = req.params.year;
  var doc = req.params.doc;
  parseInt(year);

  async function getUserData() {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("userData");

    var findResult = await collection
      .find({
        healthID: req.params.id,
      })
      .toArray();
    // console.log(findResult);

    var anss = [];
    findResult[0].medicalHistory.map((item) => {
      var datee = new Date(item.dateVisited);
      if (datee.getFullYear() == year && item.doctorName.includes(doc)) {
        anss = [...anss, item];
      }
    });

    res.send(anss);
  }

  getUserData();
});

/****************************MEDICAL HISTORY SEARCH WITH THREE PARAMETER********************************* */

app.get("/user/:id/search1/:doc/:month/:year", (req, res) => {
  var year = req.params.year;
  var month = req.params.month;
  var doc = req.params.doc;
  parseInt(year);
  parseInt(month);

  async function getUserData() {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("userData");

    var findResult = await collection
      .find({
        healthID: req.params.id,
      })
      .toArray();
    // console.log(findResult);

    var anss = [];
    findResult[0].medicalHistory.map((item) => {
      var datee = new Date(item.dateVisited);
      if (
        item.doctorName.includes(doc) &&
        datee.getMonth() + 1 == month &&
        datee.getFullYear() == year
      ) {
        anss = [...anss, item];
      }
    });

    res.send(anss);
  }

  getUserData();
});

/**                                 MEDICAL HISTORY SEARCH ENDS...                            **/

/**                                     DOCTOR SEARCH BEGINS...                            **/

/****************************DOCTOR SEARCH WITH ONE PARAMETER********************************* */
app.get("/doc/search1/:speciality", (req, res) => {
  var spec = req.params.speciality;
  // var city = req.params.city;
  // var pin = req.params.pin;

  // console.log(spec, city, pin);

  async function searchDoctors() {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("doctorData");

    var findResult = await collection
      .find({
        speciality: spec,
      })
      .toArray();

    // console.log(findResult);
    res.send(findResult);
  }

  searchDoctors();
});

app.get("/doc/search2/:pin", (req, res) => {
  // var spec = req.params.speciality;
  // var city = req.params.city;
  var pin = req.params.pin;
  pin.toString();

  // console.log(spec, city, pin);

  async function searchDoctors() {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("doctorData");

    var findResult = await collection
      .find({
        hospitalPincode: pin,
      })
      .toArray();

    // console.log(findResult);
    res.send(findResult);
  }

  searchDoctors();
});

app.get("/doc/search3/:city", (req, res) => {
  // var spec = req.params.speciality;
  var city = req.params.city;
  // var pin = req.params.pin;

  // pin.toString();

  // console.log(spec, city, pin);

  async function searchDoctors() {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("doctorData");

    var findResult = await collection
      .find({
        hospitalCity: city,
      })
      .toArray();

    // console.log(findResult);
    res.send(findResult);
  }

  searchDoctors();
});

/****************************DOCTOR SEARCH WITH TWO PARAMETER********************************* */
app.get("/doc/search1/:speciality/:pin", (req, res) => {
  var spec = req.params.speciality;
  // var city = req.params.city;
  var pin = req.params.pin;

  if (spec === undefined) spec = "";
  // if (city === undefined) city = "";
  if (pin === undefined) pin = "";

  pin.toString();

  // console.log(spec, city, pin);

  async function searchDoctors() {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("doctorData");

    var findResult = await collection
      .find({
        speciality: spec,
        hospitalPincode: pin,
      })
      .toArray();

    // console.log(findResult);
    res.send(findResult);
  }

  searchDoctors();
});

app.get("/doc/search2/:pin/:city", (req, res) => {
  // var spec = req.params.speciality;
  var city = req.params.city;
  var pin = req.params.pin;

  pin.toString();

  // console.log(spec, city, pin);

  async function PinCityDoctor() {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("doctorData");

    var findResult = await collection
      .find({
        // speciality: spec,
        hospitalCity: city,
        hospitalPincode: pin,
      })
      .toArray();

    // console.log(findResult);
    res.send(findResult);
  }

  PinCityDoctor();
});

app.get("/doc/search3/:speciality/:city", (req, res) => {
  var spec = req.params.speciality;
  var city = req.params.city;
  // var pin = req.params.pin;

  if (spec === undefined) spec = "";
  if (city === undefined) city = "";
  // if (pin === undefined) pin = "";

  // pin.toString();

  // console.log(spec, city, pin);

  async function searchDoctors() {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("doctorData");

    var findResult = await collection
      .find({
        speciality: spec,
        // hospitalPincode: pin,
        hospitalCity: city,
      })
      .toArray();

    // console.log(findResult);
    res.send(findResult);
  }

  searchDoctors();
});

/****************************DOCTOR SEARCH WITH THREE PARAMETER********************************* */
app.get("/doc/search1/:speciality/:city/:pin", (req, res) => {
  var spec = req.params.speciality;
  var city = req.params.city;
  var pin = req.params.pin;

  if (spec === undefined) spec = "";
  if (city === undefined) city = "";
  if (pin === undefined) pin = "";

  pin.toString();

  // console.log(spec, city, pin);

  async function searchDoctors() {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("doctorData");

    var findResult = await collection
      .find({
        speciality: spec,
        hospitalPincode: pin,
        hospitalCity: city,
      })
      .toArray();

    // console.log(findResult);
    res.send(findResult);
  }

  searchDoctors();
});

/**                                     DOCTOR SEARCH ENDS...                            **/

app.get("/doc", (req, res) => {
  async function getData() {
    // Use connect method to connect to the server
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const collection = db.collection("doctorData");

    var findResult = await collection.find({}).toArray();
    // console.log(findResult);
    res.send(findResult);
  }

  getData();
});

app.post("/doc", (req, res) => {
  const dataa = req.body;
  // console.log(dataa);

  var healthID =
    dataa.firstName[0].toUpperCase() +
    dataa.lastName[0].toUpperCase() +
    dataa.id1.replace(/\s+/g, "").slice(0, 6);

  var doctorID =
    dataa.firstName[0].toUpperCase() +
    dataa.lastName[0].toUpperCase() +
    dataa.id2.replace(/\s+/g, "").slice(0, 6);

  var dataToUpload = {
    healthID: healthID,
    doctorID: doctorID,
    address: dataa.address,
    age: dataa.age,
    gender: dataa.gender,
    medicalHistory: [],
    password: dataa.password,
    email: dataa.email,
    firstName: dataa.firstName,
    lastName: dataa.lastName,
    reviews: [],
    hopitalAdd: dataa.hospitalAddress,
    hospitalName: dataa.hospitalName,
    city: dataa.city,
    hospitalCity: dataa.hospitalCity,
    hospitalPincode: dataa.hospitalPincode,
    hospitalState: dataa.hospitalState,
    pincode: dataa.pincode,
    state: dataa.sstate,
    speciality: dataa.speciality,
    phoneNo: dataa.phone,
    DOB: dataa.dob,
  };

  // console.log(healthID);

  async function registerDoctor() {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("doctorData");

    if (await collection.findOne({ healthID: healthID })) {
      console.log("ID alread exists!");
    } else {
      await collection.insertOne(dataToUpload);
    }
  }

  registerDoctor();
});


app.get("/admin", (req, res) => {
  async function getAdminData() {
    // Use connect method to connect to the server
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const collection = db.collection("adminData");

    var findResult = await collection.find({}).toArray();
    // console.log(findResult);
    res.send(findResult);
  }

  getAdminData();
});

app.post("/admin/editProfile", (req, res) => {
  const dataa = req.body;
  console.log(dataa);

  async function checkForIds() {
    // Use connect method to connect to the server
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("editProfile");

    if (await collection.findOne({ id: dataa.id })) {
      console.log("ID alread exists!");
    } else {
      await collection.insertOne(dataa);
    }

    // console.log(findResult);
  }

  checkForIds();
});

//register in editProfile database
app.post("/admin/editProfile", (req, res) => {
  const dataa = req.body;
  console.log(dataa);

  async function checkForIds() {
    // Use connect method to connect to the server
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("editProfile");

    if (await collection.findOne({ id: dataa.id })) {
      console.log("ID alread exists!");
    } else {
      await collection.insertOne(dataa);
    }

    // console.log(findResult);
  }

  checkForIds();
});

//approve the user/doctor profile change
app.patch("/admin/editProfile/:id", (req, res) => {
  const HealthID = req.params.id;
  const dataa = req.body;
  console.log(dataa, HealthID);

  async function updateDataa() {
    // Use connect method to connect to the server
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("userData");

    await collection.updateOne(
      { healthID: HealthID },
      {
        $set: {
          firstName: dataa.firstName,
          lastName: dataa.lastName,
          phoneNo: dataa.phone,
          email: dataa.email,
          address: dataa.address,
        },
      }
    );
  }

  updateDataa();
});

//deleting the dataset just after updating the user/doctor profile
app.delete("/admin/editProfile/delete/:id", (req, res) => {
  const HealthID = req.params.id;
  console.log(HealthID);

  async function deleteDataa() {
    // Use connect method to connect to the server
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("editProfile");

    await collection.deleteOne({ id: HealthID });
  }

  deleteDataa();
});

app.get("/admin/editProfile", (req, res) => {
  async function getToBeUpdatedData() {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("editProfile");

    var result = await collection.find({}).toArray();
    res.send(result);
  }

  getToBeUpdatedData();
});

app.get("/admin/graphData/:disease?/:year?", (req, res) => {
  var disease = req.params.disease;
  var year = req.params.year;

  console.log(disease, year);

  async function getGraphData() {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("GraphData");

    var result = await collection
      .find({
        $where: function () {
          return Disease == disease && YYYY == year;
        },
      })
      .toArray();

    res.send(result);
  }

  getGraphData();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
