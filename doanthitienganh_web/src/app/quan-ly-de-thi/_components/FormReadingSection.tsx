"use client";

import { Collapse, Flex, Form, Input, Typography } from "antd";
import FormQuestion from "./FormQuestion";
import { DeleteOutlined, PlusSquareOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

const { Title } = Typography;

export default function FormReadingSection() {
  const form = Form.useFormInstance();

  return (
    <>
      <Form.List name="readingSection">
        {(fields, { add, remove }) => (
          <>
            {/* Render các phần thi doc */}
            <Collapse
              accordion
              items={fields.map((readingField) => ({
                key: readingField.key,
                label:
                  form.getFieldValue([
                    "readingSection",
                    readingField.name,
                    "title",
                  ]) || "Cài đặt phần thi đọc",

                extra: (
                  <DeleteOutlined
                    style={{ color: "#f5222d", cursor: "pointer" }}
                    onClick={() => remove(readingField.name)}
                  />
                ),
                children: (
                  <div>
                    <Form.Item
                      name={[readingField.name, "title"]}
                      label="Tiêu đề"
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name={[readingField.name, "content"]}
                      label="Nội dung"
                    >
                      <TextArea rows={15} />
                    </Form.Item>
                    <Title level={5} style={{ margin: "12px 0px" }}>
                      Các câu hỏi
                    </Title>
                    <Form.List name={[readingField.name, "questions"]}>
                      {(questionFields, { add, remove }) => (
                        <>
                          <Collapse
                            accordion
                            items={questionFields.map((quesField) => ({
                              key: quesField.key,
                              label: form.getFieldValue([
                                "readingSection",
                                readingField.name,
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
                                  onClick={() => remove(quesField.name)}
                                />
                              ),
                              children: (
                                <FormQuestion fieldPath={[quesField.name]} />
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
