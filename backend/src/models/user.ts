import mongoose, { Document, Model } from "mongoose";
import isEmail from "validator/lib/isEmail";
// import fs from "fs";
// import path from "path";

// const defaultImage = fs.readFileSync(
//   path.join(__dirname, "../utils/images/defaultUser.png")
// );
export interface IUser extends Document {
  name: string;
  login: string;
  email: string;
  surname: string;
  group:
    | "management"
    | "accounting"
    | "development"
    | "analytics"
    | "tester"
    | "unknown";
  // image: Buffer;
}

// export interface IUserModel extends Model<IUser> {
//   findUserByCredentials(email: string, password: string): Promise<IUser>;
//   findUserByLogin(login: string): Promise<IUser>;
//   getAllUsers(): Promise<IUser[]>;
// }

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  surname: {
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
    default: "unknown",
    enum: [
      "management",
      "accounting",
      "development",
      "analytics",
      "tester",
      "unknown",
    ],
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
  // image: {
  //   type: Buffer,
  //   required: true,
  //   default: defaultImage,
  // },
});

export default mongoose.model("user", userSchema);
