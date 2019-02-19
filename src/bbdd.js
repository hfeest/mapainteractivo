const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/geopuntos", { useNewUrlParser: true });

const userShemaJSON={
      nombre:String,
      lat: Number,
      lng: Number 
};

var user_shema = new Schema(userShemaJSON);
      
//MODELO se encarga la conexion con bbdd
var geo_Punto = mongoose.model("geo_Punto", user_shema);  

module.exports.geo_Punto = geo_Punto;