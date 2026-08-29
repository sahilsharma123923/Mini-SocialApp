import mongoose, { HydratedDocument } from "mongoose";
import bcrypt from "bcryptjs";


 export interface IUser{
  fullName:string,
  email:string,
  password?:string,
  authProvider:"local" | "google"
}

 export interface IUserMethods{
  comparePassword(password:string):Promise<boolean>;
}

 export type UserDocument=HydratedDocument<IUser,IUserMethods>;

const userSchema = new mongoose.Schema<IUser,mongoose.Model<IUser,{},IUserMethods>>(
  {
    fullName: {
      type: String,
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
      required: function(this: IUser) {
        return this.authProvider === "local";
      },
      minLength: [6, "password must be at least 6 characters"],
    },
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save",async function() {
  if(!this.isModified("password") || !this.password){
    return;
  }
  const hash=await bcrypt.hash(this.password,10)
  this.password=hash;
  return;
  
});

userSchema.method("comparePassword",async function(password:string):Promise<boolean> {
  if(!this.password){
    return false;
  }
  return await bcrypt.compare(password,this.password)
});;

const userModel = mongoose.model<IUser,mongoose.Model<IUser,{},IUserMethods>>("User", userSchema);

export default userModel;