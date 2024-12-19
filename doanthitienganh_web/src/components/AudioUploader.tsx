"use client";

import ApiCaller from "@/api-caller";
import { Media } from "@/types/vstep-b2-exam";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Typography, Upload } from "antd";
import { useState } from "react";

const { Title } = Typography;

export default function AudioUploader({ fieldPath }: { fieldPath: any }) {
  const form = Form.useFormInstance();
  const audio: Media = form.getFieldValue(fieldPath);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  return (
    <div style={{ marginBottom: 24 }}>
      {audio ? (
        <Flex align="center">
          <Title level={5}>{audio.name}</Title>
          <DeleteOutlined
            style={{
              color: "#f5222d",
              cursor: "pointer",
              marginLeft: 12,
              marginTop: -5,
            }}
            onClick={() => {
              form.setFieldValue(fieldPath, null);
            }}
          />
        </Flex>
      ) : (
        <Upload
          onChange={(info) => {
            const formData = new FormData();
            formData.append("files", info.file.originFileObj as any);
            setUploading(true);
            ApiCaller.uploadFile(formData).then((media) => {
              if (media) {
                form.setFieldValue(fieldPath, media);
                setUploading(false);
              }
            });
          }}
        >
          <Button icon={<UploadOutlined />}>Tải lên file Audio</Button>
        </Upload>
      )}
    </div>
  );
}
