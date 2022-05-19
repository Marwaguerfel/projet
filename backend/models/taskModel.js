import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    taskTheme: { type: mongoose.Schema.Types.ObjectID, ref: "taskTheme" },
    taskModel: { type: mongoose.Schema.Types.ObjectID, ref: "taskModel" },
    week:{ type: mongoose.Schema.Types.ObjectID, ref: "week" },
    system:{ type: mongoose.Schema.Types.ObjectID, ref: "System" },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    user: { type: mongoose.Schema.Types.ObjectID, ref: "user" },
    taskState: { type: mongoose.Schema.Types.ObjectID, ref: "taskState" },
    report: { type: mongoose.Schema.Types.ObjectID, ref: "taskReport" },
    
  },
  {
    timestamps: true,
  }
);
const Task = mongoose.model("Task", TaskSchema);
export default Task;
