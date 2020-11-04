import { model, Document, Schema, SchemaTypes } from "mongoose";

export interface IBoard extends Document {
  user_id     : string,
  is_public   : boolean,
  title       : string,
  updated_at  : any,
}

const BoardSchema: Schema = new Schema({
  user_id: {
    type      : SchemaTypes.ObjectId,
    required  : true,
  },
  is_public: {
    type      : Boolean,
    default   : false,
  },
  title: {
    type      : String,
    trim      : true,
    required  : true,
  },
  updated_at: {
    type      : Date,
    default   : Date.now(),
  },
});

export default model<IBoard>("board", BoardSchema);