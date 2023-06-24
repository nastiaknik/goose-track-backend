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
const isValidId = require("../../midllewares/isValidId");

const router = express.Router();

router
  .route("/")
  .get(listReviews)
  .post(authCheck, validateBody(reviewsSchema), addReview);

router
  .route("/:reviewId")
  .get(authCheck, isValidId, getReviewById)
  .put(authCheck, isValidId, validateBody(reviewsSchema), updateReview)
  .delete(authCheck, isValidId, removeReview);

module.exports = {
  reviewRouter: router,
};
