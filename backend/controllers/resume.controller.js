import axios from "axios";
import {extractTextFromPdf} from '../lib/pdfjslib.js'; 
import { GoogleGenerativeAI } from "@google/generative-ai";
import Applicant from "../models/Applicant.js";
import dotenv from 'dotenv'; 
import multer from 'multer'
import fs from 'fs'


dotenv.config(); 

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API); 
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });



export const uploadResume = async( req , res )=>{
    try {
       const filePath = req.file.path
      const pdfBuffer = fs.readFileSync(filePath); 
      
       console.log("pdfBuffer length : ", pdfBuffer.length); 
       const extractedText = await extractTextFromPdf(pdfBuffer);


       if (!extractedText || extractedText.trim().length === 0) {
        return res.status(500).json({ error: 'No text found in the PDF' });
      }
      console.log("extractedtext : ", extractedText); 

      const prompt = `
      Extract the following fields from the resume text and return a JSON object:
      {
        "name": <name>,
        "email": <email>,
        "education": {
          "degree": <degree>,
          "branch": <branch>,
          "institution": <institution>,
          "year": <year>
        },
        "experience": {
          "job_title": <job_title>,
          "company": <company>,
          "start_date": <start_date>,
          "end_date": <end_date>
        },
        "skills": [<skill1>, <skill2>, ...],
        "summary": <short summary>
      }
      Resume Text: ${extractedText}
    `;

  const result =   await model.generateContent(prompt); 
console.log("result : ", result); 
const candidate =  result.response.candidates[0];
console.log("Candidate parts:", candidate.content.parts);

const candidateText = candidate.content.parts.map(part => part.text).join(' ');

console.log("candidate text : ", candidateText); 



let cleanedText = candidateText.trim();
if (cleanedText.startsWith("```json")) {
  cleanedText = cleanedText.replace(/^```json\s*/, "");
}
if (cleanedText.endsWith("```")) {
  cleanedText = cleanedText.replace(/\s*```$/, "");
}
console.log("Cleaned candidate text:", cleanedText);

let parsedData; 

try {
  parsedData = JSON.parse(cleanedText);
} catch (e) {
  console.error("Failed to parse candidate text as JSON:", cleanedText);
  return res.status(500).json({ error: "Invalid JSON output from generative AI" });
}

if (!parsedData.name || !parsedData.email || !parsedData.education || !parsedData.experience) {
  return res.status(500).json({ error: "Generated data missing required fields" });
}

if (parsedData.experience) {
  if (parsedData.experience.start_date) {
    parsedData.experience.start_date = new Date(parsedData.experience.start_date);
  }
  if (parsedData.experience.end_date) {
    if (
      typeof parsedData.experience.end_date === "string" &&
      parsedData.experience.end_date.toLowerCase() === "current"
    ) {
      parsedData.experience.end_date = null;
    } else {
      parsedData.experience.end_date = new Date(parsedData.experience.end_date);
    }
  }
}


const applicant = new Applicant(parsedData); 
 await applicant.save(); 

    
return res.status(200).json({ message: 'Resume analyzed and stored', applicant });
        
    } catch (error) {
        console.error('Error in resume enrichment:', error);
    return res.status(500).json({ error: 'An error occurred while processing the resume' });
    }
};


export const searchResume = async(req , res )=>{
  const {name} = req.query; 
  if(!name){
    return res.status(400).json({
      message:'name is required'
    })
  }; 

  try {
    const searchData = await Applicant.findOne({
      name: { $regex: name, $options: 'i' }
    })
    if(searchData.length === 0){
      return res.status(404).json({
        message:"no matching resume found"
      })
    }; 

    res.status(200).json({
      message:"resume got successfully",
      searchData,
    })
    
  } catch (error) {
    console.log("error search resume catch : ", error); 
    return res.status(500).json({
      message:"internal server error "
    })
  }
}; 
