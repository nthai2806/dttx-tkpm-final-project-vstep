"use client";

import { useAuth } from "@/context/Auth";
import {
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  message,
  Typography,
} from "antd";
import { useState, useMemo, useEffect, useCallback } from "react";
import { FormExamContext } from "./common";
import FormListeningSection from "./FormListeningSection";
import FormReadingSection from "./FormReadingSection";
import FormWritingSection from "./FormWritingSection";
import FormSpeakingSection from "./FormSpeakingSection";
import { useCommon } from "@/context/Common";
import {
  VstepB2Exam,
  VstepB2Listening,
  VstepB2ListeningPart,
  VstepB2Reading,
  VstepB2Speaking,
  VstepB2Writing,
} from "@/types/vstep-b2-exam";
import dayjs, { Dayjs } from "dayjs";
import ApiCaller from "@/api-caller";
import Loading from "@/components/Loading";

const { Title } = Typography;

export default function FormExam({ examId }: { examId?: string }) {
  const { redirectTo } = useCommon();
  const { state: authState } = useAuth();
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);
  const [formIsValid, setFormIsValid] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [exam, setExam] = useState<VstepB2Exam | null>(null);
  const [fetchingExam, setFetchingExam] = useState(true);
  const submittable = useMemo(
    () => formIsValid && !processing,
    [formIsValid, processing]
  );

  const [messageApi, contextHolder] = message.useMessage();

  const getFormFieldValue = useCallback(
    (fieldPath: any) => {
      return form.getFieldValue(fieldPath) || null;
    },
    [form]
  );

  const setFormFieldValue = useCallback(
    (fieldPath: any, val: any) => {
      console.log("set field value", fieldPath, val);

      form.setFieldValue(fieldPath, val);
    },
    [form]
  );

  const submitExam = useCallback(() => {
    if (examId) {
      const data: Partial<VstepB2Exam> = {
        ...values,
        listeningSection: values.listeningSection.map(
          (section: any) =>
            ({
              ...section,
              id: undefined,
              listenings: section.listenings.map(
                (listening: any) =>
                  ({
                    ...listening,
                    id: undefined,
                    audio: listening?.audio
                      ? {
                          ...listening.audio,
                          documentId: undefined,
                        }
                      : null,
                    questions: listening.questions.map((ques: any) => ({
                      ...ques,
                      id: undefined,
                    })),
                  } as VstepB2Listening)
              ),
            } as VstepB2ListeningPart)
        ),
        readingSection: values.readingSection.map(
          (section: any) =>
            ({
              ...section,
              id: undefined,
              questions: section.questions.map((ques: any) => ({
                ...ques,
                id: undefined,
              })),
            } as VstepB2Reading)
        ),
        writingSection: values.writingSection.map(
          (section: any) =>
            ({
              ...section,
              id: undefined,
            } as VstepB2Writing)
        ),
        speakingSection: values.speakingSection.map(
          (section: any) =>
            ({
              ...section,
              id: undefined,
            } as VstepB2Speaking)
        ),
        beginDate: (values.beginDate as Dayjs).toDate(),
        endDate: (values.endDate as Dayjs).toDate(),
      };
      setProcessing(true);
      ApiCaller.updateExam(examId, data).then((exam) => {
        if (exam) {
          setProcessing(false);
          redirectTo("/quan-ly-de-thi");
        } else {
          setProcessing(false);
        }
      });
      return;
    }

    const data: Partial<VstepB2Exam> = {
      ...values,
      listeningSection: values.listeningSection.map(
        (section: any) =>
          ({
            ...section,
            listenings: section.listenings.map(
              (listening: any) =>
                ({
                  ...listening,
                  audio: listening?.audio
                    ? {
                        ...listening.audio,
                        documentId: undefined,
                      }
                    : null,
                } as VstepB2Listening)
            ),
          } as VstepB2ListeningPart)
      ),
      beginDate: (values.beginDate as Dayjs).toDate(),
      endDate: (values.endDate as Dayjs).toDate(),
    };
    setProcessing(true);
    ApiCaller.createExam(data).then((exam) => {
      if (exam) {
        setProcessing(false);
        redirectTo("/quan-ly-de-thi");
      } else {
        setProcessing(false);
      }
    });
  }, [examId, values, message]);

  useEffect(() => {
    console.log("Form value:", values);
    form
      .validateFields({ validateOnly: true })
      .then(() => setFormIsValid(true))
      .catch(() => setFormIsValid(false));
  }, [form, values]);

  useEffect(() => {
    if (examId) {
      ApiCaller.getVstepB2Exam(examId).then((data) => {
        setExam(data || null);
        setFetchingExam(false);
      });
    } else {
      setFetchingExam(false);
    }
  }, [examId]);

  return (
    <>
      {examId && <Title level={2}>Chỉnh sửa đề thi VSTEP B2</Title>}
      {fetchingExam ? (
        <Loading />
      ) : (
        <Form
          form={form}
          initialValues={
            exam
              ? {
                  ...exam,
                  beginDate: exam?.beginDate ? dayjs(exam.beginDate) : null,
                  endDate: exam?.endDate ? dayjs(exam.endDate) : null,
                }
              : {
                  title: "",
                  beginDate: null,
                  endDate: null,
                  listeningSection: [],
                  readingSection: [],
                  writingSection: [],
                  speakingSection: [],
                }
          }
          layout="vertical"
          autoComplete="off"
          style={{ margin: "auto" }}
        >
          <FormExamContext.Provider
            value={{ getFormFieldValue, setFormFieldValue }}
          >
            <Form.Item
              name="title"
              label="Tiêu đề"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Ngày bắt đầu hiệu lực"
              name="beginDate"
              rules={[{ required: true }]}
            >
              <DatePicker />
            </Form.Item>

            <Form.Item
              label="Ngày kết thúc hiệu lực"
              name="endDate"
              rules={[{ required: true }]}
            >
              <DatePicker />
            </Form.Item>

            <Title level={4} style={{ marginTop: 48 }}>
              Phần thi Nghe hiểu
            </Title>
            <FormListeningSection />

            <Title level={4} style={{ marginTop: 48 }}>
              Phần thi Đọc hiểu
            </Title>
            <FormReadingSection />

            <Title level={4} style={{ marginTop: 48 }}>
              Phần thi Viết
            </Title>
            <FormWritingSection />

            <Title level={4} style={{ marginTop: 48 }}>
              Phần thi Nói
            </Title>
            <FormSpeakingSection />

            <Flex justify="center" style={{ marginTop: 48 }} gap={24}>
              <Button
                type="primary"
                htmlType="submit"
                disabled={!submittable}
                loading={processing}
                style={{ width: "fit-content" }}
                onClick={submitExam}
              >
                {exam ? "Cập nhật đề thi" : "Tạo đề thi"}
              </Button>
              <Button
                type="default"
                danger
                style={{ width: "fit-content" }}
                onClick={() => {
                  redirectTo("/quan-ly-de-thi");
                }}
              >
                Huỷ
              </Button>
            </Flex>
          </FormExamContext.Provider>
        </Form>
      )}
      {contextHolder}
    </>
  );
}
