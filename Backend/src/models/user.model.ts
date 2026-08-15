import mongoose, { HydratedDocument } from "mongoose";
import bcrypt from "bcryptjs";


interface IUser{
  fullName:string,
  email:string,
  password:string
}

interface IUserMethods{
  comparePassword(password:string):Promise<boolean>;
}

type UserDocument=HydratedDocument<IUser,IUserMethods>;

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
      required: true,
      minLength: [6, "password must be at least 6 characters"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save",async function() {
  if(!this.isModified("password")){
    return;
  }
  const hash=await bcrypt.hash(this.password,10)
  this.password=hash;
  return;
  
});

userSchema.method("comparePassword",async function(password:string):Promise<boolean> {
  return await bcrypt.compare(password,this.password)
});

const userModel = mongoose.model<IUser,mongoose.Model<IUser,{},IUserMethods>>("User", userSchema);

export default userModel;