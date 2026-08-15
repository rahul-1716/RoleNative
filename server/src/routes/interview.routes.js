import express from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/file.middleware.js";
import {
  generateInterviewController,
  generateResumePdfController,
  getAllInterviewReportsController,
  getInterviewReportByIdController,
} from "../controllers/interview.controller.js";
const interviewRouter = express.Router();

/**
 * @route POST /api/interview
 * @description Generate new interview report on the basis of user description, resume and JD
 * @access private
 */
interviewRouter.post(
  "/",
  authUser,
  upload.single("resume"),
  generateInterviewController,
);

/**
 * @route GET /api/interview/report/:interviewId
 * @description get interview report by interviewId
 * @access private
 */

interviewRouter.get(
  "/report/:interviewId",
  authUser,
  getInterviewReportByIdController,
);

/**
 * @route GET /api/interview
 * @description get all interview reports of logged in user
 * @access private
 */

interviewRouter.get("/", authUser, getAllInterviewReportsController);

/**
 * @route GET /api/interview/resume/pdf
 * @description generate resume pdf from user description
 * @access private
 */

interviewRouter.post("/resume/pdf/:interviewReportId", authUser, generateResumePdfController);

export default interviewRouter;
