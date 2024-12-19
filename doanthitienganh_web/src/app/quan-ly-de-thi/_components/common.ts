import { createContext, useContext } from "react";

export type FormExamContextFields = {
  getFormFieldValue: (fieldPath: any) => any;
  setFormFieldValue: (fieldPath: any, value: any) => void;
};

export const FormExamContext = createContext<FormExamContextFields>({
  getFormFieldValue: () => {
    return "";
  },
  setFormFieldValue(fieldPath, value) {
    return;
  },
});

export const useFormExam = () => useContext(FormExamContext);
