import { Schema, model, InferSchemaType } from "mongoose";

const CitySearchSchema = new Schema(
  {
    technology: { type: String },
    city: { type: String },
    count: { type: String },
  },
  { timestamps: true }
);
type ICitySearch = InferSchemaType<typeof CitySearchSchema>;
const CitySearch = model("CitySearch", CitySearchSchema);

export { CitySearch, ICitySearch };
