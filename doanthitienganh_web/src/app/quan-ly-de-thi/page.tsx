"use client";

import ApiCaller from "@/api-caller";
import { useAuth } from "@/context/Auth";
import { useCommon } from "@/context/Common";
import { VstepB2Exam } from "@/types/vstep-b2-exam";
import { Button, Table, Typography } from "antd";
import moment from "moment";
import Link from "next/link";
import { useState, useEffect, useMemo, useCallback } from "react";

const { Title } = Typography;



export default function QuanLyDeThi() {
  const { redirectTo } = useCommon();
  const { state: authState, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [exams, setExams] = useState<VstepB2Exam[]>([]);

  const fetchExams = useCallback(() => {
    if (authState !== "Authenticated" && user?.userRole !== "Teacher") {
      return;
    }

    setLoading(true);
    ApiCaller.getVstepB2ExamsForTeacher().then((exams) => {
      setExams(exams);
      setLoading(false);
    });
  }, [authState, user]);

  const deleteExam = useCallback(
    (examId: string) => {
      ApiCaller.deleteExam(examId).then(() => {
        fetchExams();
      });
    },
    [fetchExams]
  );

  const columns = useMemo(
    () => [
      {
        title: "Đề thi",
        dataIndex: "title",
        key: "title",
        // render: (attributes: IQuestion["attributes"]) => attributes.type,
      },
      {
        title: "Ngày bắt đầu hiệu lực",
        dataIndex: "beginDate",
        key: "beginDate",
        render: (date: Date) => moment(date).format("DD/MM/YYYY"),
      },
      {
        title: "Ngày kết thúc hiệu lực",
        dataIndex: "endDate",
        key: "endDate",
        render: (date: Date) => moment(date).format("DD/MM/YYYY"),
      },
      {
        title: "Hành động",
        key: "action",
        render: (text: any, exam: VstepB2Exam) => (
          <span>
            <span>
              <Link href={`/quan-ly-de-thi/${exam.id}`}>
                <Button type="link">Sửa</Button>
              </Link>
              <Button
                type="link"
                danger
                onClick={() => {
                  deleteExam(exam.id);
                }}
              >
                Xóa
              </Button>
            </span>
          </span>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    fetchExams();
  }, [fetchExams]);

  useEffect(() => {
    if (authState === "CheckingToken" || authState === "GettingAuthInfo") {
      return;
    }

    if (authState !== "Authenticated" && user?.userRole !== "Teacher") {
      redirectTo("/sign-in");
    }
  }, [authState, user, redirectTo]);

  return (
    <>
      <Title level={2}>Quản lý đề thi VSTEP B2</Title>
      <Button
        style={{ margin: "12px 0px" }}
        type="primary"
        onClick={() => {
          redirectTo("/quan-ly-de-thi/tao-moi");
        }}
      >
        Tạo đề thi
      </Button>
      <Table
        loading={loading}
        columns={columns}
        dataSource={exams}
        rowKey="id"
      />
    </>
  );
}
