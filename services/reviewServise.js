const { Review } = require("../models/review");
const { HttpError } = require("../helpers/HttpError");

const listReviews = async (user, query) => {
  const { _id: owner } = user;
  const defaultFavorite = { $in: [true, false] };
  const { page = 1, limit = 2 } = query;
  const skip = (page - 1) * limit;

  const rewiews = await Review.find({ owner }, "-createdAt -updateAt", {
    skip,
    limit,
  });
  return rewiews;
};

const getReviewById = async (reviewId) => {
  const result = await Review.findById(reviewId);
  if (!result) {
    throw new HttpError(404);
  }
  return result || null;
};

const addReview = async (body, user) => {
  const { _id: owner } = user;
  const newReview = await Review.create(...body, owner);
  return newReview;
};

const updateReview = async (reviewId, body) => {
  const editedReview = Review.findByIdAndUpdate(reviewId, body, {
    new: true,
  });
  if (!editedReview) {
    throw new HttpError(404);
  }
  return editedReview;
};

const removeReview = async (reviewId) => {
  const removeReview = await Review.findByIdAndRemove(reviewId);
  if (!removeReview) {
    throw new HttpError(404);
  }
  return removeReview;
};

module.exports = {
  listReviews,
  getReviewById,
  addReview,
  updateReview,
  removeReview,
};
