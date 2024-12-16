const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
main().then((res) =>{
    console.log("connected to DB");
}).catch((err) =>{
    console.log(err);
});
async function main(){
    await mongoose.connect(MONGO_URL)
}
// initilizing database
const initDB = async() =>{
    await Listing.deleteMany({});
    // this add's new property in individiual listings.
    initData.data=initData.data.map((obj)=>({...obj,owner: "6718c9969e0be5744dee519c"}));
    await Listing.insertMany(initData.data);
    console.log("data was intialized");
}

initDB();