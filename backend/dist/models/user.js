"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const isEmail_1 = __importDefault(require("validator/lib/isEmail"));
const userSchema = new mongoose_1.default.Schema({
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
            validator: (email) => (0, isEmail_1.default)(email),
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
exports.default = mongoose_1.default.model("user", userSchema);
