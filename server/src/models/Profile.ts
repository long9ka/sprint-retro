import { model, Document, Schema } from "mongoose";

export interface IProfile extends Document {
  email : string,
  name  : string,
}

const ProfileSchema: Schema = new Schema({
  email: {
    type      : String,
    trim      : true,
    unique    : true,
    lowercase : true,
    required  : true,
  },
  name: {
    type      : String,
    trim      : true,
    required  : true,
  },
  is_actived: {
    type      : Boolean,
    default   : false,
  }
});

export default model<IProfile>("profile", ProfileSchema);