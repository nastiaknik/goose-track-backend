const { model, Schema } = require("mongoose");

const taskSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Low",
  },
  start: String,
  end: String,
  date: String,
  category: {
    type: String,
    enum: ["To do", "In progress", "Done"],
    default: "To do",
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

const Task = model("task", taskSchema);

module.exports = {
  Task,
};
