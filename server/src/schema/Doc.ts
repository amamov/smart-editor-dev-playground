import {
  Document,
  Schema,
  model,
  Model,
  Types,
  SchemaOptions,
  NativeError,
} from "mongoose";
import validator from "validator";

export interface IDoc {
  data: string;
}

export interface IDocDocument extends IDoc, Document {}

interface IDocModel extends Model<IDocDocument> {}

const options: SchemaOptions = { timestamps: true };

export const docSchema = new Schema<IDocDocument, IDocModel>(
  {
    _id: String,
    data: String,
  },
  options
);

export default model<IDocDocument, IDocModel>("doc", docSchema);
