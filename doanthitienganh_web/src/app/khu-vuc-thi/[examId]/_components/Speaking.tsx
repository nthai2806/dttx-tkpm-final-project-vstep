"use client";

import { VstepB2Speaking } from "@/types/vstep-b2-exam";
import { Form, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useExam } from "./common";
import AnalysicAnswer from "@/components/AnalysicAnswer";
import { htmlToText } from "@/helpers/common";

const { Title } = Typography;

export default function Speaking({
  speakingSection,
}: {
  speakingSection: VstepB2Speaking[];
}) {
  const { examState, getAnswer } = useExam();

  return speakingSection.map((section, sectionIdx) => (
    <div key={section.id} style={{ marginTop: 48 }}>
      <Title level={4}>{section.title}</Title>
      <div dangerouslySetInnerHTML={{ __html: section.content }} />
      <Form.Item
        name={["speakingSection", sectionIdx]}
        label={<Title level={5}>Bài làm</Title>}
        layout="vertical"
        style={{ marginTop: 24 }}
      >
        <TextArea
          rows={20}
          style={{ width: "100%" }}
          disabled={examState === "Finished"}
        />
      </Form.Item>
      {examState === "Finished" && (
        <AnalysicAnswer
          type="Speaking"
          answer={getAnswer(["speakingSection", sectionIdx])}
          writingContent={htmlToText(section.content)}
        />
      )}
    </div>
  ));
}
