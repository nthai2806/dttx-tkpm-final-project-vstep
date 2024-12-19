"use client";

import { VstepB2Question } from "@/types/vstep-b2-exam";
import { Button, Form, Radio, Space, Typography } from "antd";
import { useExam } from "./common";
import { useMemo } from "react";
import AnalysicAnswer from "@/components/AnalysicAnswer";

const { Title } = Typography;

export default function Question({
  fieldName,
  question,
}: {
  fieldName: (string | number)[];
  question: VstepB2Question;
}) {
  const { examState, getAnswer } = useExam();
  const answerOpt = getAnswer(fieldName);

  return (
    <div>
      <Title level={5}>{question.content}</Title>
      <Form.Item name={fieldName}>
        <Radio.Group disabled={examState === "Finished"}>
          <Space direction="vertical">
            <Radio
              value="a"
              style={
                examState === "Finished"
                  ? answerOpt === "a" && answerOpt === question.result
                    ? { color: "#7cb305" }
                    : answerOpt === "" ||
                      (answerOpt === "a" && answerOpt !== question.result)
                    ? { color: "#f5222d" }
                    : {}
                  : {}
              }
            >
              {" "}
              {question.a}{" "}
            </Radio>
            <Radio
              value="b"
              style={
                examState === "Finished"
                  ? answerOpt === "b" && answerOpt === question.result
                    ? { color: "#7cb305" }
                    : answerOpt === "" ||
                      (answerOpt === "b" && answerOpt !== question.result)
                    ? { color: "#f5222d" }
                    : {}
                  : {}
              }
            >
              {" "}
              {question.b}{" "}
            </Radio>
            <Radio
              value="c"
              style={
                examState === "Finished"
                  ? answerOpt === "c" && answerOpt === question.result
                    ? { color: "#7cb305" }
                    : answerOpt === "" ||
                      (answerOpt === "c" && answerOpt !== question.result)
                    ? { color: "#f5222d" }
                    : {}
                  : {}
              }
            >
              {" "}
              {question.c}{" "}
            </Radio>
            <Radio
              value="d"
              style={
                examState === "Finished"
                  ? answerOpt === "d" && answerOpt === question.result
                    ? { color: "#7cb305" }
                    : answerOpt === "" ||
                      (answerOpt === "d" && answerOpt !== question.result)
                    ? { color: "#f5222d" }
                    : {}
                  : {}
              }
            >
              {" "}
              {question.d}{" "}
            </Radio>
          </Space>
        </Radio.Group>
      </Form.Item>
    </div>
  );
}
