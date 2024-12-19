"use client";

import ApiCaller from "@/api-caller";
import { useAuth } from "@/context/Auth";
import { useCommon } from "@/context/Common";
import { ConfigVstepB2, VstepB2Exam } from "@/types/vstep-b2-exam";
import { Button, Card, Col, Flex, Row, Typography } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

const { Title, Paragraph } = Typography;

export default function KhuVucThi() {
  const { vstepB2Cfg } = useCommon();
  const { state: authState, user } = useAuth();
  const [exams, setExams] = useState<VstepB2Exam[]>([]);

  useEffect(() => {
    ApiCaller.getVstepB2Exams().then((exams) => {
      setExams(exams);
    });
  }, []);

  return (
    <>
      <Title level={2}>Đề thi VSTEP B2</Title>
      <Row gutter={[16, 16]}>
        {exams.map((exam) => (
          <Col key={exam.id} xs={24} sm={12} md={8} lg={6}>
            <Card title={exam.title}>
              <Paragraph>
                Thi nghe: {vstepB2Cfg.listeningTimebox} phút
              </Paragraph>
              <Paragraph>Thi đọc: {vstepB2Cfg.readingTimebox} phút</Paragraph>
              <Paragraph>Thi viết: {vstepB2Cfg.writingTimebox} phút</Paragraph>
              <Paragraph>Thi nói: {vstepB2Cfg.speakingTimebox} phút</Paragraph>
              <Flex justify="center">
                <Link
                  href={
                    authState === "Authenticated" &&
                    user?.userRole === "Student"
                      ? `/khu-vuc-thi/${exam.id}`
                      : "/sign-in"
                  }
                >
                  <Button type="primary">Làm bài</Button>
                </Link>
              </Flex>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}
