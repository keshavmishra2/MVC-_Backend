

const mongoose = require("mongoose");

module.export = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/mvc")
}