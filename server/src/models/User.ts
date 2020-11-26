import { model, Document, Schema, SchemaTypes } from "mongoose";

export interface IUser extends Document {
  username    : string,
  password    : string,
  fullname    : string,
}

const UserSchema: Schema = new Schema({
  username: {
    type      : String,
    trim      : true,
    unique    : true,
    required  : true,
    lowercase : true,
  },
  password: {
    type      : String,
    required  : true,
  },
  fullname: {
    type      : String,
    trim      : true,
    required  : true,
  }
});

export default model<IUser>("user", UserSchema);