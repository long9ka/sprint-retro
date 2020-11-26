import { model, Document, Schema, SchemaTypes } from "mongoose";

export interface IItem extends Document {
  board_id    : string,
  des         : string,
  group_by    : string,
}

const ItemSchema: Schema = new Schema({
  board_id: {
    type      : SchemaTypes.ObjectId,
    required  : true,
  },
  des: {
    type      : String,
    trim      : true,
    required  : true,
  },
  group_by: {
    type      : String,
    lowercase : true,
    enum      : ["went_well", "to_improve", "action_items"],
    required  : true,
  },
});

export default model<IItem>("item", ItemSchema);