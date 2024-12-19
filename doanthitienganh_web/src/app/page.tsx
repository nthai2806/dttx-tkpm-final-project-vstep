"use client";

import { Card, Flex, Typography } from "antd";
import { useEffect, useState } from "react";
import ApiCaller from "@/api-caller";
import { VstepB2Exam } from "@/types/vstep-b2-exam";
import { useAuth } from "@/context/Auth";
import { useRouter } from "next/navigation";

const { Title, Text, Paragraph } = Typography;

export default function Home() {
  const router = useRouter();
  const { user, state: authState } = useAuth();

  useEffect(() => {
    if (authState === "UnAuthenticated") {
      router.push("/khu-vuc-thi");
      return;
    }

    if (authState === "Authenticated") {
      switch (user?.userRole) {
        case "Admin":
          break;
        case "Student":
          router.push("/khu-vuc-thi");
          break;
        case "Teacher":
          router.push("/quan-ly-de-thi");
          break;
      }
    }
  }, [authState, user]);

  return null;
}
