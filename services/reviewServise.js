const { Review } = require("../models/review");
const HttpError = require("../helpers/HttpError");

const listReviews = async (query) => {
  const { page = 1, limit = 2 } = query;
  const skip = (page - 1) * limit;

  const rewiews = await Review.find({}, "-createdAt -updateAt", {
    skip,
    limit,
  }).populate("owner");
  return rewiews;
};

const getReviewById = async (owner) => {
  const result = await Review.findOne({ owner });
  if (!result) {
    throw new HttpError(404, "Not Found");
  }
  return result;
};

const addReview = async (body, owner) => {
  const existingReview = await Review.findOne({ owner });
  if (existingReview) {
    throw new HttpError(400, "Only one review is allowed per owner.");
  }

  const newReview = await Review.create({ ...body, owner });
  return newReview;
};

const updateReview = async (body, owner) => {
  const editedReview = Review.findOneAndUpdate({ owner }, body, {
    new: true,
  });
  if (!editedReview) {
    throw new HttpError(404, "Not Found");
  }
  return editedReview;
};

const removeReview = async (owner) => {
  const removeReview = await Review.findOneAndRemove({ owner });
  if (!removeReview) {
    throw new HttpError(404, "Not Found");
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
