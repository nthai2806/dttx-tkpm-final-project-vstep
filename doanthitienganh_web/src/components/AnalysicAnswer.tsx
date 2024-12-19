"use client";

import ApiCaller from "@/api-caller";
import { VstepB2Question } from "@/types/vstep-b2-exam";
import { Button, Modal, Typography } from "antd";
import { useCallback, useState } from "react";

const { Paragraph } = Typography;

export default function AnalysicAnswer({
  type,
  answer,
  audioScript,
  audioUrl,
  readingContent,
  speakingContent,
  writingContent,
  question,
}: {
  type: "Listening" | "Reading" | "Writing" | "Speaking";
  audioUrl?: string;
  audioScript?: string;
  readingContent?: string;
  writingContent?: string;
  speakingContent?: string;
  answer?: string;
  question?: VstepB2Question;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [analysisContent, setAnalysisContent] = useState("");
  const [isAnalysising, setIsAnalysising] = useState(false);

  const onAnalysic = useCallback(async () => {
    setIsAnalysising(true);

    let promptContent = "";
    switch (type) {
      case "Listening":
        {
          console.log("Audio url", audioUrl);
          const script =
            audioScript ||
            (await ApiCaller.transcribeAudio(
              `${process.env.NEXT_PUBLIC_MEDIA_BASE_URL}${audioUrl}`
            ));
          console.log("Script:", script);
          if (script) {
            promptContent = `
              Đề thi tiếng anh VSTEP B2 với phần thi Nghe hiểu có đề như sau:
              ${script}

              Câu hỏi và các câu trả lời như sau:
              ${question?.content}
              A. ${question?.a}

              B. ${question?.b}

              C. ${question?.c}

              D. ${question?.d} 

              Thí sinh trả lời đáp án ${answer?.toUpperCase()}.

              Hãy phân tích câu trả lời đúng/sai chi tiết chỗ nào?
              Phân tích bằng tiếng việt.
              `;
          }
        }
        break;
      case "Reading":
        promptContent = `
        Đề thi tiếng anh VSTEP B2 với phần thi Đọc hiểu có đề như sau:
        ${readingContent}

        Câu hỏi và các câu trả lời như sau:
        ${question?.content}
        A. ${question?.a}

        B. ${question?.b}

        C. ${question?.c}

        D. ${question?.d} 

        Thí sinh trả lời đáp án ${answer?.toUpperCase()}.

        Hãy phân tích câu trả lời đúng/sai chi tiết chỗ nào?
        Phân tích bằng tiếng việt.
        `;
        break;
      case "Writing":
        promptContent = `
        Đề thi tiếng anh VSTEP B2 với phần thi Viết có đề như sau:
        ${writingContent}

        Thí sinh trả lời như sau:
        ${answer}

        Hãy phân tích câu trả lời của thí sinh đúng/sai chi tiết chỗ nào?
        Phân tích bằng tiếng việt.
        `;
        break;
      case "Speaking":
        promptContent = `
        Đề thi tiếng anh VSTEP B2 với phần thi Nói có đề như sau:
        ${speakingContent}

        Thí sinh trả lời như sau:
        ${answer}

        Hãy phân tích câu trả lời của thí sinh đúng/sai chi tiết chỗ nào?
        Phân tích bằng tiếng việt.
        `;
        break;
    }

    if (promptContent) {
      ApiCaller.getAnalysis(promptContent).then((result) => {
        setAnalysisContent(result);
        setIsModalOpen(true);
        setIsAnalysising(false);
      });
    } else {
      setIsAnalysising(false);
    }
  }, []);

  return (
    <>
      <Button type="default" onClick={onAnalysic} loading={isAnalysising}>
        Phân tích đáp án
      </Button>

      <Modal
        title="Phân tích đáp án"
        open={isModalOpen}
        onOk={() => {
          setIsModalOpen(false);
        }}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      >
        <Paragraph>{analysisContent}</Paragraph>
      </Modal>
    </>
  );
}
