import { ExamState } from "@/types/common";
import { createContext, useContext } from "react";

export type ExamAnswers = {
  readingSection: [][];
  listeningSection: {}[];
  writingSection: {}[];
  speakingSection: {}[];
};

export type ExamContextFields = {
  examState: ExamState;

  getAnswer: (fieldName: any) => string;
};

export const ExamContext = createContext<ExamContextFields>({
  examState: "NotBegin",

  getAnswer: () => {
    return "";
  },
});

export const useExam = () => useContext(ExamContext);
