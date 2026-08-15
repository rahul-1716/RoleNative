import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import dotenv from "dotenv"
dotenv.config();


const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

const MODEL = "gemini-3.6-flash";

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .describe(
      "A score between 0 and 100 indicating how well the candidate's profile matches the job describe",
    ),
  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe(
            "The technical questions that can be asked in the interview",
          ),
        intention: z
          .string()
          .describe(
            "The intention of interviewer behind asking this question",
          ),
        answer: z
          .string()
          .describe(
            "How to answer this question, what points and approaches to cover",
          ),
      }),
    )
    .describe(
      "Technincal questions that can be asked in the interview along with their intention and how to answer them",
    ),
  behavioralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe(
            "The behavioral questions that can be asked in the interview",
          ),
        intention: z
          .string()
          .describe(
            "The intention of interviewer behind asking this question",
          ),
        answer: z
          .string()
          .describe(
            "How to answer this question, what points and approaches to cover",
          ),
      }),
    )
    .describe(
      "Technincal questions that can be asked in the interview along with their intention and how to answer them",
    ),
  skillGaps: z
    .array(
      z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z
          .enum(["low", "medium", "high"])
          .describe(
            "The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances",
          ),
      }),
    )
    .describe(
      "List of skill gaps in the candidate's profile along with their severity",
    ),
  preparationPlan: z
    .array(
      z.object({
        day: z
          .number()
          .describe("The day number in the preparation plan, starting from 1"),
        focus: z
          .string()
          .describe(
            "The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc.",
          ),
        tasks: z
          .array(z.string())
          .describe(
            "List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.",
          ),
      }),
    )
    .describe(
      "A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively",
    ),
  title: z
    .string()
    .describe(
      "The title of the job for which the interview report is generated",
    ),
});

export async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  const prompt = `
You are an expert technical recruiter and interview preparation assistant.

Analyze the candidate against the provided job description.

CANDIDATE RESUME:
${resume}

CANDIDATE SELF-DESCRIPTION:
${selfDescription}

JOB DESCRIPTION:
${jobDescription}

Generate a comprehensive interview preparation report.

Requirements:

1. Calculate a realistic match score from 0 to 100.
2. Identify technical questions likely to be asked.
3. Identify behavioral questions likely to be asked.
4. Identify important skill gaps.
5. Explain the severity of each skill gap.
6. Create a practical day-wise preparation plan.
7. Do not invent experience, skills, companies, qualifications, or projects that are not supported by the candidate's information.
8. Base the analysis primarily on the job description and candidate's actual profile.
`;

  const response = await ai.interactions.create({
    model: MODEL,
    input: prompt,
    response_format: {
      type: "text",
      mime_type: "application/json",
      schema: z.toJSONSchema(interviewReportSchema),
    },
  });

  if (!response.output_text) {
    throw new Error("Gemini returned an empty response");
  }

  const parsedResponse = JSON.parse(response.output_text);

  const validateResponse = interviewReportSchema.parse(parsedResponse);
  return validateResponse;
}
