import { useContext } from "react";
import { InterviewContext } from "../interview.context";
import {
  generateInterviewReport,
  getAllInterviewReports,
  getInterviewById,
} from "../services/interview.api";
import { useEffect } from "react";

export const useInterview = (interviewId) => {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error("useInterview must be used within a Provider");
  }
  const { loading, setLoading, report, setReport, reports, setReports } =
    context;

  const generateReport = async ({
    jobDescription,
    selfDescription,
    resumeFile,
  }) => {
    setLoading(true);
    try {
      const response = await generateInterviewReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });
      const newReport = response.interviewReport;
      setReport(newReport);
      return newReport;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getReportById = async (interviewId) => {
    setLoading(true);
    try {
      const response = await getInterviewById(interviewId);
      setReport(response.interviewReport);
      return response.interviewReport;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getReports = async () => {
    setLoading(true);
    try {
      const response = await getAllInterviewReports();
      setReports(response.interviewReports);
      return response.interviewReports;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        } else {
            getReports()
        }
    }, [ interviewId ])

  return {
    loading,
    report,
    reports,
    getReportById,
    getReports,
    generateReport,
  };
};