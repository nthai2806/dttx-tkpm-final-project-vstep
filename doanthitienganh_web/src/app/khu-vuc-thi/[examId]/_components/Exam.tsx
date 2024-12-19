"use client";

import ApiCaller from "@/api-caller";
import Loading from "@/components/Loading";
import { useCommon } from "@/context/Common";
import { VstepB2Exam } from "@/types/vstep-b2-exam";
import {
  Breadcrumb,
  Button,
  Col,
  Flex,
  Form,
  Row,
  Statistic,
  Tabs,
  TabsProps,
  Typography,
} from "antd";
import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  createContext,
  useContext,
} from "react";
import Listening from "./Listening";
import Reading from "./Reading";
import Writing from "./Writing";
import Speaking from "./Speaking";
import { ExamState } from "@/types/common";
import { ExamAnswers, ExamContext } from "./common";
import Link from "next/link";

const { Title } = Typography;
const { Countdown } = Statistic;

export default function Exam({ examId }: { examId: string }) {
  const { vstepB2Cfg } = useCommon();
  const [form] = Form.useForm();
  const [exam, setExam] = useState<VstepB2Exam | null>(null);
  const [examState, setExamState] = useState<ExamState>("NotBegin");
  const totalMinutes = useMemo(() => {
    return (
      vstepB2Cfg.readingTimebox +
      vstepB2Cfg.listeningTimebox +
      vstepB2Cfg.writingTimebox +
      vstepB2Cfg.speakingTimebox
    );
  }, [vstepB2Cfg]);
  const deadline = useMemo(() => {
    if (examState === "Began") {
      return Date.now() + totalMinutes * 60 * 1000;
    }

    return 0;
  }, [examState, totalMinutes]);

  const resetAnswers = useCallback(() => {
    form.resetFields();
  }, []);

  const beginExam = useCallback(() => {
    setExamState("Began");
    resetAnswers();
  }, [resetAnswers]);

  const finishExam = useCallback(() => {
    setExamState("Finished");
  }, []);

  const getAnswer = useCallback(
    (fieldName: any) => {
      return form.getFieldValue(fieldName) || "";
    },
    [form]
  );

  useEffect(() => {
    if (examId) {
      ApiCaller.getVstepB2Exam(examId as string).then((data) => {
        setExam(data);
      });
    }
  }, [examId]);

  return exam ? (
    <ExamContext.Provider value={{ examState, getAnswer }}>
      <Breadcrumb
        style={{ marginBottom: 24 }}
        items={[
          {
            title: <Link href="/khu-vuc-thi">Danh sách đề thi Vstep B2</Link>,
          },
          {
            title: exam.title,
          },
        ]}
      />
      <Flex justify="center">
        <Title level={2}>Đề thi: {exam.title}</Title>
      </Flex>
      {examState === "NotBegin" && (
        <Flex justify="center" align="center" vertical>
          <Title level={4}>Thời gian làm bài: {totalMinutes} phút</Title>
          <Button
            type="primary"
            style={{ width: "fit-content" }}
            onClick={beginExam}
          >
            Bắt đầu bài làm
          </Button>
        </Flex>
      )}
      {(examState === "Began" || examState === "Finished") && (
        <>
          {examState === "Began" && (
            <Flex justify="center" align="center" vertical>
              <Title level={4}>Thời gian làm bài</Title>
              <Countdown value={deadline} onFinish={finishExam} />
              <Button
                danger
                variant="outlined"
                style={{ width: "fit-content" }}
                onClick={finishExam}
              >
                Kết thúc & nộp bài
              </Button>
            </Flex>
          )}
          {examState === "Finished" && (
            <Flex justify="center" align="center" vertical>
              <Title level={4}>Thời gian làm bài: Đã kết thúc</Title>
              <Button
                type="primary"
                style={{ width: "fit-content" }}
                onClick={beginExam}
              >
                Làm bài lại
              </Button>
            </Flex>
          )}

          <Form form={form} layout="vertical">
            <Tabs
              defaultActiveKey="listening"
              items={[
                {
                  key: "listening",
                  label: "Phần thi Nghe hiểu",
                  children: (
                    <Listening
                      listeningSection={exam.listeningSection as any}
                    />
                  ),
                },
                {
                  key: "reading",
                  label: "Phần thi Đọc hiểu",
                  children: (
                    <Reading readingSection={exam.readingSection as any} />
                  ),
                },
                {
                  key: "writing",
                  label: "Phần thi Viết",
                  children: (
                    <Writing writingSection={exam.writingSection as any} />
                  ),
                },
                {
                  key: "speaking",
                  label: "Phần thi Nói",
                  children: (
                    <Speaking speakingSection={exam.speakingSection as any} />
                  ),
                },
              ]}
            />
          </Form>
        </>
      )}
    </ExamContext.Provider>
  ) : (
    <Loading />
  );
}
