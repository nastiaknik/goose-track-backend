const { model, Schema } = require("mongoose");

const reviewSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for required"],
    },
    comment: {
      type: String,
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
