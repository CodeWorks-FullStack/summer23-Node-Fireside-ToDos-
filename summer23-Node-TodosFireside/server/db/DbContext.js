import mongoose from "mongoose";
import { AccountSchema } from "../models/Account";
import { ValueSchema } from "../models/Value";
import { TodosSchema } from "../models/Todo.js";

class DbContext {
  Values = mongoose.model("Value", ValueSchema);
  Account = mongoose.model("Account", AccountSchema);
  Todos = mongoose.model("Todo", TodosSchema);
}

export const dbContext = new DbContext();
