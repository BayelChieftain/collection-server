import mongoose, { Schema } from "mongoose";

const collectionSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: ['Books', 'Signs', 'Silverware', 'Paintings'], required: true },
  imageUrl: { type: String }, 
  fields: [{
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ['Integer', 'String', 'Text', 'Boolean', 'Date'],
      required: true
    }
  }],
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

const itemSchema = mongoose.Schema({
  name: { type: String, required: true },
  tags: [{ type: String, required: true }],
  collectionRef: { type: Schema.Types.ObjectId, ref: 'Collection', required: true },
  imageUrl: { type: String },
  dynamicFields: [{
    name: { type: String, required: true },
    value: { type: Schema.Types.Mixed } 
  }]
  },
  { timestamps: true }
);

export const Collection = mongoose.model('Collection', collectionSchema);
export const Item = mongoose.model('Item', itemSchema);





