"use client";

import { VstepB2ListeningPart } from "@/types/vstep-b2-exam";
import { Typography } from "antd";
import Question from "./Question";
import { SoundOutlined } from "@ant-design/icons";
import Audio from "@/components/Audio";
import { useExam } from "./common";
import AnalysicAnswer from "@/components/AnalysicAnswer";

const { Title } = Typography;

export default function Listening({
  listeningSection,
}: {
  listeningSection: VstepB2ListeningPart[];
}) {
  const { examState, getAnswer } = useExam();

  return listeningSection.map((section, sectionIdx) => (
    <div key={section.id} style={{ marginTop: 48 }}>
      <Title level={4}>{section.title}</Title>
      {section.listenings.map((listening, listeningIdx) => (
        <div key={listening.id} style={{ marginTop: 48 }}>
          {listening.audio?.url && (
            <Audio
              src={`${process.env.NEXT_PUBLIC_BE_BASE_URL}${listening.audio.url}`}
            />
          )}
          {listening.questions.map((question, questionIdx) => {
            const fieldName = [
              "listeningSection",
              sectionIdx,
              listeningIdx,
              questionIdx,
            ];

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
                    type="Listening"
                    answer={getAnswer(fieldName)}
                    question={question}
                    audioUrl={listening?.audio?.url}
                    audioScript={listening?.audioScript}
                  />
                )}
              </>
            );
          })}
        </div>
      ))}
    </div>
  ));
}
