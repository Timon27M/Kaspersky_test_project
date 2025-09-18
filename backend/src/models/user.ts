import mongoose, { Document, Model } from "mongoose";
import isEmail from "validator/lib/isEmail";
// import bcrypt from "bcryptjs";

// Интерфейс для документа пользователя
export interface IUser extends Document {
  name: string;
  login: string;
  email: string;
  group: string;
}

// Интерфейс модели с кастомными статическими методами
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
    enum: ["management", "accounting", "human resources department"],
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

// userSchema.statics.findUserByCredentials = function (email, password) {
//   return this.findOne({ email }).select('+password')
//     .then((user) => {
//       if (!user) {
//         return Promise.reject(new Error('Неправильные почта и пароль'));
//       }
//       return bcrypt.compare(password, user.password)
//         .then((matched) => {
//           if (!matched) {
//             return Promise.reject(new Error('Неправильные почта или пароль'));
//           }
//           return user;
//         });
//     });
// };

// userSchema.statics.getAllUsers = function () {
//   return this.find(); // убираем пароль из результата
// };

export default mongoose.model("user", userSchema);
