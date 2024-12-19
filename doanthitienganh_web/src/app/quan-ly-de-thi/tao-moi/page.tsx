"use client";

import ApiCaller from "@/api-caller";
import { useAuth } from "@/context/Auth";
import { useCommon } from "@/context/Common";
import { VstepB2Exam } from "@/types/vstep-b2-exam";
import {
  Breadcrumb,
  Button,
  Collapse,
  DatePicker,
  Flex,
  Form,
  Input,
  Table,
  Typography,
} from "antd";
import moment from "moment";
import Link from "next/link";
import { useState, useEffect, useMemo, useCallback } from "react";
import FormExam from "../_components/FormExam";

const { Title } = Typography;

export default function TaoMoiDeThi() {
  const { redirectTo } = useCommon();
  const { state: authState, user } = useAuth();

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
      <Breadcrumb
        style={{ marginBottom: 24 }}
        items={[
          {
            title: <Link href="/quan-ly-de-thi">Quản lý đề thi</Link>,
          },
          {
            title: "Tạo mới đề thi",
          },
        ]}
      />
      <Title level={2}>Tạo mới đề thi VSTEP B2</Title>
      <FormExam />
    </>
  );
}
