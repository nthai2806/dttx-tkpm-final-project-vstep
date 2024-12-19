"use client";

import { useAuth } from "@/context/Auth";
import { UserOutlined } from "@ant-design/icons";
import {
  Layout as AntdLayout,
  Avatar,
  Dropdown,
  Menu,
  Popover,
  theme,
  Typography,
} from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

const { Header, Content, Footer } = AntdLayout;
const { Text } = Typography;

export default function Layout({ children }: { children: any }) {
  const router = useRouter();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { state: authState, user, signOut } = useAuth();

  const menuItems = useMemo(() => {
    switch (user?.userRole) {
      case "Student":
        return [
          {
            key: "menu-item-1",
            label: <Link href="/khu-vuc-thi">Thi Vstep B2</Link>,
          },
        ];
      case "Teacher":
        return [
          {
            key: "menu-item-1",
            label: <Link href="/quan-ly-de-thi">Quản lý đề thi Vstep B2</Link>,
          },
        ];
      case "Admin":
        return [];
      default:
        return [
          {
            key: "menu-item-1",
            label: <Link href="/">Thi Vstep B2</Link>,
          },
        ];
    }
  }, [user]);

  const userMenuItems = useMemo(() => {
    if (authState === "Authenticated") {
      return [
        {
          key: "sign-out",
          label: "Đăng xuất",
        },
      ];
    }

    return [
      {
        key: "sign-in",
        label: "Đăng nhập",
      },
    ];
  }, [authState]);

  return (
    <AntdLayout>
      <Header
        className="site-layout-header"
        style={{
          position: "fixed",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        <div className="logo">
          <h1 style={{ color: "#333" }}>VStep Learning</h1>
        </div>
        {/* <a style={{ marginRight: 48 }} href="/">
          <Avatar
            size="large"
            icon={<UserOutlined />}
            style={{ cursor: "pointer" }}
          />
        </a> */}
        <Menu
          key={user?.userRole}
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={menuItems[0] ? [menuItems[0].key] : []}
          items={menuItems}
          style={{ flex: 1, minWidth: "fit-content" }}
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          {authState === "Authenticated" && (
            <Text style={{ marginRight: "12px" }}>{user?.displayName}</Text>
          )}
          <Dropdown
            menu={{
              items: userMenuItems,
              onClick: ({ key }) => {
                switch (key) {
                  case "sign-in":
                    router.push("/sign-in");
                    break;
                  case "sign-out":
                    signOut();
                    break;
                }
              },
            }}
            placement="bottomRight"
          >
            <Avatar
              style={{ cursor: "pointer" }}
              icon={<UserOutlined />}
              // src={session?.user?.image}
            />
          </Dropdown>
        </div>
        {/* <div style={{ marginLeft: 48 }}>
          <Popover
            content={
              <Menu
                mode="inline"
                items={userMenuItems}
                onClick={({ key }) => {
                  switch (key) {
                    case "sign-in":
                      router.push("/sign-in");
                      break;
                    case "sign-out":
                      signOut();
                      break;
                  }
                }}
              />
            }
            title={
              authState === "Authenticated" ? user?.username : "Chưa đăng nhập"
            }
          >
            <Avatar
              size="large"
              icon={<UserOutlined />}
              style={{ cursor: "pointer" }}
            />
          </Popover>
        </div> */}
      </Header>
      <Content
        style={{
          padding: "88px 48px 48px 48px!important",
          minHeight: "max-content",
        }}
      >
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        VStep English ©{new Date().getFullYear()} Created by Vstep B2
      </Footer>
    </AntdLayout>
  );
}
