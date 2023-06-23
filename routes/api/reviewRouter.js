const express = require("express");
const {
  listReviews,
  getReviewById,
  addReview,
  updateReview,
  removeReview,
} = require("../../conrollers/reviews");
const { authCheck } = require("../../midllewares/authCheck");
const validateBody = require("../../midllewares/validateBody");
const reviewsSchema = require("../../schemas/reviewSchemas");

const router = express.Router();

router
  .route("/reviews")
  .get(listReviews)
  .post(authCheck, validateBody(reviewsSchema), addReview);

router;
route("/reviews:reviewId")
  .get(authCheck, getReviewById)
  .put(authCheck, validateBody(reviewsSchema), updateReview)
  .delete(authCheck, removeReview);

module.exports = router;
