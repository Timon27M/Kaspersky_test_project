import mongoose, { Document, Model } from "mongoose";
import isEmail from "validator/lib/isEmail";

export interface IUser extends Document {
  name: string;
  login: string;
  email: string;
  group: string;
}

export interface IUserModel extends Model<IUser> {
  findUserByCredentials(email: string, password: string): Promise<IUser>;
  findUserByLogin(login: string): Promise<IUser>;
  getAllUsers(): Promise<IUser[]>;
}

const userSchema = new mongoose.Schema<IUser, IUserModel>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  login: {
    type: String,
    minlength: 4,
    maxlength: 30,
    required: true,
    unique: true,
  },
  group: {
    type: String,
    enum: ["management", "accounting", "development", "analytics", "tester", "unknown"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email: string) => isEmail(email),
      message: "Неправильный адрес почты",
    },
  },
});

export default mongoose.model("user", userSchema);
