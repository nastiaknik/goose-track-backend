const { model, Schema } = require("mongoose");

const reviewSchema = new Schema(
  {
    rating: {
      type: Number,
      required: [true, "Set rating for required"],
      enum: [1, 2, 3, 4, 5],
      min: 0,
      max: 5,
      default: 0,
    },
    comment: {
      type: String,
      maxLength: 300,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Review = model("review", reviewSchema);

module.exports = {
  Review,
};
