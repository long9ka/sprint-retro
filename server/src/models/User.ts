import { model, Document, Schema, SchemaTypes } from "mongoose";

export interface IUser extends Document {
  username    : string,
  password    : string,
  profile_id? : string,
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
  profile_id: {
    type      : SchemaTypes.ObjectId,
    ref       : "profile",
    required  : true,
  }
});

export default model<IUser>("user", UserSchema);