import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface UserDocument extends Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  let self = this as UserDocument;

  if (!self.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));

  const hash = await bcrypt.hashSync(self.password, salt);

  self.password = hash;
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const self = this as UserDocument;

  return bcrypt.compare(candidatePassword, self.password).catch((e) => false);
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
