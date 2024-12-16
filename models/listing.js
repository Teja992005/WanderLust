const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review  = require("./review.js");
const listingSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image:{
        // type: String,
        // // the below line is used to set the default image

        // default: "https://images.unsplash.com/photo-1710758729824-5e276e7cf57b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        // set: (v) => v=== "" ? "https://images.unsplash.com/photo-1710758729824-5e276e7cf57b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D": v,
        url: String,
        filename: String,
        
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    geometry: {
        type:{
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});
listingSchema.post("findOneAndDelete",async(listing) =>{
    if(listing){
        await Review.deleteMany({ _id: {$in: listing.reviews}});
    }
    
});
const Listing = mongoose.model("Listing",listingSchema);

module.exports = Listing;