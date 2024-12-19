"use client";

import { Collapse, Flex, Form, Input, Typography } from "antd";
import { DeleteOutlined, PlusSquareOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

const { Title } = Typography;

export default function FormSpeakingSection() {
  const form = Form.useFormInstance();

  return (
    <>
      <Form.List name="speakingSection">
        {(speakingFields, { add, remove }) => (
          <>
            {/* Render các phần thi doc */}
            <Collapse
              accordion
              items={speakingFields.map((speakingField) => ({
                key: speakingField.key,
                label:
                  form.getFieldValue([
                    "speakingSection",
                    speakingField.name,
                    "title",
                  ]) || "Cài đặt phần thi Nói",

                extra: (
                  <DeleteOutlined
                    style={{ color: "#f5222d", cursor: "pointer" }}
                    onClick={() => remove(speakingField.name)}
                  />
                ),
                children: (
                  <div>
                    <Form.Item
                      name={[speakingField.name, "title"]}
                      label="Tiêu đề"
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name={[speakingField.name, "content"]}
                      label="Nội dung"
                    >
                      <TextArea rows={15} />
                    </Form.Item>
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
