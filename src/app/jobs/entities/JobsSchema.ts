import  { Schema, model, InferSchemaType } from "mongoose";

const JobsSchema = new Schema(
  {
    position: { type: String },
    city: { type: String, required: true },
    technology: { type: String, required: true },
    company: { type: String, required: true },
    jobType: { type: String, required: true },
    workRegime: { type: String, required: true },
    companySize: { type: String, required: true},
    description: { type: String, required: true },
    experienceLevel: { type: String, required: true },
    salary: { type: String, required: true },
    link: { type: String, required: true },
  },
  { timestamps: true }
);

type IJobs = InferSchemaType<typeof JobsSchema>;
const Jobs = model("Jobs", JobsSchema);

export { Jobs, IJobs };


