import { PDFParse } from "pdf-parse";
import {
  generateInterviewReport,
  generateResumePdf,
} from "../services/ai.service.js";
import { interviewReportModel } from "../models/interviewReport.model.js";

export async function generateInterviewController(req, res) {
  const resumeFile = req.file;
  const { selfDescription, jobDescription } = req.body;

  if (!resumeFile && !selfDescription?.trim()) {
    return res
      .status(400)
      .json({ error: "Please upload a resume or provide a self-description" });
  }

  let resumeText = "";
  if (resumeFile) {
    const parser = new PDFParse({ data: resumeFile.buffer });
    try {
      const result = await parser.getText();
      resumeText = result.text;
    } finally {
      await parser.destroy();
    }
  }

  const interviewReportByAi = await generateInterviewReport({
    resume: resumeText,
    selfDescription,
    jobDescription,
  });

  const interviewReport = await interviewReportModel.create({
    user: req.user.id,
    resume: resumeText,
    selfDescription,
    jobDescription,
    ...interviewReportByAi,
  });

  res.status(201).json({
    message: "Interview report generated successfully",
    interviewReport,
  });
}

export async function getInterviewReportByIdController(req, res) {
  const { interviewId } = req.params;
  const interviewReport = await interviewReportModel.findOne({
    _id: interviewId,
    user: req.user.id,
  });

  if (!interviewReport) {
    return res.status(404).json({
      message: "Interview report not found",
    });
  }

  res.status(200).json({
    message: "Interview report fetched succesfully",
    interviewReport,
  });
}

export async function getAllInterviewReportsController(req, res) {
  const interviewReports = await interviewReportModel
    .find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .select(
      "-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan",
    );

  res.status(200).json({
    message: "Interview reports fetched successfully.",
    interviewReports,
  });
}

export async function generateResumePdfController(req, res) {
  const { interviewReportId } = req.params;
  const interviewReport =
    await interviewReportModel.findById(interviewReportId);
  if (!interviewReport) {
    return res.status(404).json({
      message: "Interview report not found",
    });
  }
  const { resume, selfDescription, jobDescription } = interviewReport;
  const pdfBuffer = await generateResumePdf({
    resume,
    selfDescription,
    jobDescription,
  });
  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename="resume_${interviewReportId}.pdf"`,
  });
  res.send(pdfBuffer);
}
