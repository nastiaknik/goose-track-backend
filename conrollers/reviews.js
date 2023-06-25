const {
  listReviews,
  getReviewById,
  addReview,
  updateReview,
  removeReview,
} = require("../services/reviewServise");
const controllerWrapper = require("../helpers/controllerWrapper");

const getAllReviews = async (req, res) => {
  const reviews = await listReviews(req.query);
  res.status(200).json(reviews);
};

const getReview = async (req, res) => {
  const { id } = req.params;
  const review = await getReviewById(id);
  res.status(200).json(review);
};

const createReview = async (req, res) => {
  const newReview = await addReview(req.body, req.user);
  res.status(201).json(newReview);
};

const changeReview = async (req, res) => {
  const { id } = req.params;
  const editedReview = await updateReview(req.body, id);
  res.status(200).json(editedReview);
};

const deleteReview = async (req, res) => {
  const { id } = req.params;
  await removeReview(id);
  res.status(200).json({ message: "Review deleted" });
};

module.exports = {
  listReviews: controllerWrapper(getAllReviews),
  getReviewById: controllerWrapper(getReview),
  addReview: controllerWrapper(createReview),
  updateReview: controllerWrapper(changeReview),
  removeReview: controllerWrapper(deleteReview),
};
