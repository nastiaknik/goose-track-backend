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
const {
  reviewsAddSchema,
  reviewsEditSchema,
} = require("../../schemas/reviewSchemas");
const isValidId = require("../../midllewares/isValidId");

const router = express.Router();

router
  .route("/")
  .get(listReviews)
  .post(authCheck, validateBody(reviewsAddSchema), addReview);

router
  .route("/my-review/:id")
  .get(authCheck, isValidId, getReviewById)
  .patch(authCheck, isValidId, validateBody(reviewsEditSchema), updateReview)
  .delete(authCheck, isValidId, removeReview);

module.exports = {
  reviewRouter: router,
};
