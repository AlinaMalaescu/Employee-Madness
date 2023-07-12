// https://mongoosejs.com/
const mongoose = require("mongoose");
const Brand = require('./favoriteBrand.model');

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: String,
  level: String,
  position: String,
  present: Boolean,
  equipment: Array,
  height: Number,
  favoriteBrand: {
    type: Schema.Types.ObjectId,
    ref: 'Brand',
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Employee", EmployeeSchema);

