import mongoose from "mongoose";

const EducationSchema = new mongoose.Schema({
    degree: { type: String },
    branch: { type: String},
    institution: { type: String},
    year: { type: String},
  });


const ExperienceSchema = new mongoose.Schema({
    job_title: { type: String},
    company: { type: String},
    start_date: { type: Date},
    end_date: { type: Date},
  });


const ApplicantSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
    },
    education:{
        type:EducationSchema,
        
    },
    experience:{type:ExperienceSchema},
    skills:[{type:String}],
    summary:{type:String},
},{timestamps:true});

const Applicant = mongoose.model("Applicant",ApplicantSchema); 

export default Applicant; 
