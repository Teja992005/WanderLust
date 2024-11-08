const express = require("express");

// creating a router
const router = express.Router();

const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/WrapAsync.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");
const { populate } = require("../models/review.js");

const listingController = require("../controllers/listings.js");
// below two are used when we are included choose file option in the new.ejs file
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});
router
   .route("/")
   .get(wrapAsync(listingController.index))
   .post(isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync(listingController.createListing));
   
   

//New Route
router.get("/new",isLoggedIn,listingController.renderNewForm);

router
   .route("/:id")
   .get(wrapAsync(listingController.showListing))
   .put(isLoggedIn,isOwner,
      upload.single('listing[image]'),validateListing,wrapAsync(listingController.updateListing))
   .delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));





// Index Route
// router.get("/",wrapAsync(listingController.index));




// Show Route
// router.get("/:id",wrapAsync(listingController.showListing));


// Create Route

// router.post("/",isLoggedIn,validateListing,wrapAsync(listingController.createListing));
   
   
   // Edit Route
   router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));
   
   // Update Route
   
   // router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListing));
   
   
   //Delete Route
   
   // router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));
module.exports = router;
