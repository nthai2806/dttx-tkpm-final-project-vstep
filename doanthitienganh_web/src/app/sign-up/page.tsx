"use client";

import { useAuth } from "@/context/Auth";
import { Alert, Button, Flex, Form, Input, Typography } from "antd";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const { Title } = Typography;

export default function SignIn() {
  const router = useRouter();
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);
  const { state: authState, authMsg, signUp } = useAuth();
  const [formIsValid, setFormIsValid] = useState(false);
  const submittable = useMemo(
    () => formIsValid && authState === "UnAuthenticated",
    [formIsValid, authState]
  );

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setFormIsValid(true))
      .catch(() => setFormIsValid(false));
  }, [form, values]);

  useEffect(() => {
    if (authState === "Authenticated") {
      router.push("/");
    }
  }, [authState]);

  return (
    <>
      <Head>
        <title>Đăng ký thi</title>
      </Head>
      <Title level={2} style={{ textAlign: "center" }}>
        Đăng ký thi
      </Title>
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        style={{ width: 400, margin: "auto" }}
      >
        <Form.Item
          name="username"
          label="Tên đăng nhập"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="displayName"
          label="Tên hiển thị"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[{ required: true }]}
        >
          <Input type="password" />
        </Form.Item>
        {authMsg && (
          <Alert
            message={authMsg}
            type="warning"
            style={{ marginBottom: 12 }}
          />
        )}
        <Flex justify="center" align="middle" vertical>
          <Button
            type="primary"
            htmlType="submit"
            disabled={!submittable}
            loading={authState === "SigningUp"}
            onClick={() => {
              signUp(values);
            }}
          >
            Đăng ký
          </Button>
          <Button type="link">
            <Link href="/sign-in">Đã có tài khoản</Link>
          </Button>
        </Flex>
      </Form>
    </>
  );
}
