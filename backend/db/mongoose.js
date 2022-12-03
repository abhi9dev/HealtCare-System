const mongoose = require("mongoose");

const Patient = require("../Schema/patient");

mongoose.connect("mongodb:127.0.0.1:27017/HealthCare", {
  newNewUrlParser: true,
  useCreateIndex: true,
});

const Patientt = mongoose.model("Patient", Patient);

const newPatient = new Patientt({
  name: "Kartik",
  age: 21,
});

newPatient
  .save()
  .then(() => {
    console.log(newPatient);
  })
  .catch((err) => console.log(err));
