const express = require("express");

// creating a router
const router = express.Router({mergeParams: true});
// we need to keep double dots
const wrapAsync = require("../utils/WrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview,isLoggedIn,isReviewAuthor} = require("../middleware.js")

const reviewController = require("../controllers/reviews.js");
// Reviews

//post Review Route
router.post("/", isLoggedIn,validateReview,wrapAsync(reviewController.cereateReview));

// Delete Review Route.
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview));

module.exports = router;