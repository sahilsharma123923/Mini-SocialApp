import mongoose, { HydratedDocument, Types } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
  fullName: string;
  username: string;
  email: string;
  password?: string;
  authProvider: "local" | "google";
  bio?: string;
  avatar?: string;
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserMethods {
  comparePassword(password: string): Promise<boolean>;
}

export type UserDocument = HydratedDocument<IUser, IUserMethods>;

const userSchema = new mongoose.Schema<IUser, mongoose.Model<IUser, {}, IUserMethods>>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email is required to create an account"],
      trim: true,
    },
    password: {
      type: String,
      required: function (this: IUser) {
        return this.authProvider === "local";
      },
      minLength: [6, "password must be at least 6 characters"],
    },
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    bio: {
      type: String,
    },
    avatar: {
      type: String,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (this: UserDocument) {
  if (!this.isModified("password") || !this.password) {
    return;
  }
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  return;
});

userSchema.method("comparePassword", async function (this: UserDocument, password: string): Promise<boolean> {
  if (!this.password) {
    return false;
  }
  return await bcrypt.compare(password, this.password);
});

const userModel = mongoose.model<IUser, mongoose.Model<IUser, {}, IUserMethods>>("User", userSchema);

export default userModel;