"use client";

import { Collapse, Flex, Form, Input, Typography } from "antd";
import { DeleteOutlined, PlusSquareOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

const { Title } = Typography;

export default function FormWritingSection() {
  const form = Form.useFormInstance();

  return (
    <>
      <Form.List name="writingSection">
        {(writingFields, { add, remove }) => (
          <>
            {/* Render các phần thi doc */}
            <Collapse
              accordion
              items={writingFields.map((writingField) => ({
                key: writingField.key,
                label:
                  form.getFieldValue([
                    "writingSection",
                    writingField.name,
                    "title",
                  ]) || "Cài đặt phần thi Viết",

                extra: (
                  <DeleteOutlined
                    style={{ color: "#f5222d", cursor: "pointer" }}
                    onClick={() => remove(writingField.name)}
                  />
                ),
                children: (
                  <div>
                    <Form.Item
                      name={[writingField.name, "title"]}
                      label="Tiêu đề"
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name={[writingField.name, "content"]}
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
