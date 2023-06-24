const {
  listReviews,
  getReviewById,
  addReview,
  updateReview,
  removeReview,
} = require("../services/reviewServise");

const controllerWrapper = require("../helpers/controllerWrapper");

const getAllReviews = async (req, res, next) => {
  const reviews = await listReviews(req.user, req.query);
  res.status(200).json(reviews);
};

const getReview = async (req, res, next) => {
  const { reviewId } = req.params;
  const review = await getReviewById(reviewId);
  res.status(200).json(review);
};

const createReview = async (req, res, next) => {
  const newReview = await addReview(req.body, req.user);
  res.status(201).json(newReview);
};

const changeReview = async (req, res, next) => {
  const { reviewId } = req.params;
  const editedReview = await updateReview(reviewId, req.body);
  res.status(200).json(editedReview);
};

const deleteReview = async (req, res, next) => {
  const { reviewId } = req.params;
  await removeReview(reviewId);
  res.status(200).json({ message: "review delete" });
};

module.exports = {
  listReviews: controllerWrapper(getAllReviews),
  getReviewById: controllerWrapper(getReview),
  addReview: controllerWrapper(createReview),
  updateReview: controllerWrapper(changeReview),
  removeReview: controllerWrapper(deleteReview),
};
