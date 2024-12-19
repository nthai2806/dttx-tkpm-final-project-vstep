"use client";

import { Collapse, Flex, Form, Input, Typography } from "antd";
import { useFormExam } from "./common";
import { VstepB2ListeningPart } from "@/types/vstep-b2-exam";
import FormQuestion from "./FormQuestion";
import {
  DeleteOutlined,
  InboxOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { useMemo } from "react";
import Dragger from "antd/es/upload/Dragger";
import AudioUploader from "@/components/AudioUploader";

const { Title } = Typography;

export default function FormListeningSection() {
  const form = Form.useFormInstance();

  return (
    <>
      <Form.List name="listeningSection">
        {(fields, { add, remove }) => (
          <>
            {/* Render các phần thi nghe */}
            <Collapse
              accordion
              items={fields.map((partField, partIdx) => ({
                key: partField.key,
                label:
                  form.getFieldValue([
                    "listeningSection",
                    partField.name,
                    "title",
                  ]) || "Cài đặt phần thi nghe",

                extra: (
                  <DeleteOutlined
                    style={{ color: "#f5222d", cursor: "pointer" }}
                    onClick={() => remove(partField.name)}
                  />
                ),
                children: (
                  <div>
                    <Form.Item
                      name={[partField.name, "title"]}
                      label="Tiêu đề"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                    <Title level={5} style={{ margin: "12px 0px" }}>
                      Các đoạn nghe
                    </Title>
                    <Form.List name={[partField.name, "listenings"]}>
                      {(listeningFields, { add, remove }) => (
                        <>
                          {/* Render các đoạn nghe */}
                          <Collapse
                            accordion
                            items={listeningFields.map(
                              (listeningField, listeningIdx) => ({
                                key: "Listening-" + listeningIdx,
                                label: `Đoạn nghe ${listeningIdx}`,
                                extra: (
                                  <DeleteOutlined
                                    style={{
                                      color: "#f5222d",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => remove(partField.name)}
                                  />
                                ),
                                children: (
                                  <div>
                                    <AudioUploader
                                      fieldPath={[
                                        "listeningSection",
                                        partField.name,
                                        "listenings",
                                        listeningField.name,
                                        "audio",
                                      ]}
                                    />

                                    <Title level={5}>Các câu hỏi</Title>
                                    <Form.List
                                      name={[listeningField.name, "questions"]}
                                    >
                                      {(questionFields, { add, remove }) => (
                                        <>
                                          <Collapse
                                            accordion
                                            items={questionFields.map(
                                              (quesField, quesIdx) => ({
                                                key: "ques-" + quesIdx,
                                                label: form.getFieldValue([
                                                  "listeningSection",
                                                  partField.name,
                                                  "listenings",
                                                  listeningField.name,
                                                  "questions",
                                                  quesField.name,
                                                  "content",
                                                ]),
                                                extra: (
                                                  <DeleteOutlined
                                                    style={{
                                                      color: "#f5222d",
                                                      cursor: "pointer",
                                                    }}
                                                    onClick={() =>
                                                      remove(partField.name)
                                                    }
                                                  />
                                                ),
                                                children: (
                                                  <FormQuestion
                                                    fieldPath={[quesField.name]}
                                                  />
                                                ),
                                              })
                                            )}
                                          />
                                          <Flex justify="center">
                                            <PlusSquareOutlined
                                              style={{
                                                fontSize: 24,
                                                cursor: "pointer",
                                                marginTop: 8,
                                              }}
                                              onClick={() => {
                                                add({});
                                              }}
                                            />
                                          </Flex>
                                        </>
                                      )}
                                    </Form.List>
                                  </div>
                                ),
                              })
                            )}
                          />
                          <Flex justify="center">
                            <PlusSquareOutlined
                              style={{
                                fontSize: 24,
                                cursor: "pointer",
                                marginTop: 8,
                              }}
                              onClick={() => {
                                add({});
                              }}
                            />
                          </Flex>
                        </>
                      )}
                    </Form.List>
                  </div>
                ),
              }))}
            />
            <Flex justify="center">
              <PlusSquareOutlined
                style={{
                  fontSize: 24,
                  cursor: "pointer",
                  marginTop: 8,
                }}
                onClick={() => {
                  add({
                    title: "",
                  });
                }}
              />
            </Flex>
          </>
        )}
      </Form.List>
    </>
  );
}
