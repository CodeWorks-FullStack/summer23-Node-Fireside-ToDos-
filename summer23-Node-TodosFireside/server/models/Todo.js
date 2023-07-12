import { Schema } from "mongoose";

export const TodosSchema = new Schema(
  {
    description: { type: String, required: true },
    completed: { type: Boolean, default: false },
    creatorId: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);
