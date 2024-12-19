"use client";

import { Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";

export default function FormQuestion({ fieldPath }: { fieldPath: any }) {
  return (
    <div>
      <Form.Item
        name={[...fieldPath, "content"]}
        label="Nội dung câu hỏi"
        rules={[{ required: true }]}
      >
        <TextArea />
      </Form.Item>
      <Form.Item
        name={[...fieldPath, "a"]}
        label="A."
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={[...fieldPath, "b"]}
        label="B."
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={[...fieldPath, "c"]}
        label="C."
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={[...fieldPath, "d"]}
        label="D."
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Đáp án"
        name={[...fieldPath, "result"]}
        rules={[{ required: true }]}
      >
        <Select
          options={[
            {
              value: "a",
              label: "A",
            },
            {
              value: "b",
              label: "B",
            },
            {
              value: "c",
              label: "C",
            },
            {
              value: "d",
              label: "D",
            },
          ]}
        />
      </Form.Item>
    </div>
  );
}
