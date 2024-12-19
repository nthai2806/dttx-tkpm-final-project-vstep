"use client";

import { VstepB2Reading } from "@/types/vstep-b2-exam";
import { Typography } from "antd";
import Question from "./Question";
import { useExam } from "./common";
import AnalysicAnswer from "@/components/AnalysicAnswer";
import { htmlToText } from "@/helpers/common";

const { Title } = Typography;

export default function Reading({
  readingSection,
}: {
  readingSection: VstepB2Reading[];
}) {
  const { examState, getAnswer } = useExam();

  return readingSection.map((section, sectionIdx) => (
    <div key={section.id} style={{ marginTop: 48 }}>
      <Title level={4}>{section.title}</Title>
      <div dangerouslySetInnerHTML={{ __html: section.content }} />
      {section.questions.map((question, questionIdx) => {
        const fieldName = ["readingSection", sectionIdx, questionIdx];

        return (
          <>
            <div style={{ height: 24 }} />
            <Question
              key={question.id}
              question={question}
              fieldName={fieldName}
            />
            {examState === "Finished" && (
              <AnalysicAnswer
                key={`${question.id}-ana`}
                type="Reading"
                readingContent={htmlToText(section.content)}
                answer={getAnswer(fieldName)}
                question={question}
              />
            )}
          </>
        );
      })}
    </div>
  ));
}
