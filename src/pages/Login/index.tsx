import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "@/api/user";
import { useAuth } from "@/store/useAuth";
import { Button, Form, Input, message } from "antd";

export default function Login() {
  const navigate = useNavigate();
  const login = useAuth((s) => s.login);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true);
    try {
      const res = await loginApi(values);
      login(res.token);
      message.success("登录成功");
      navigate("/");
    } catch {
      message.error("登录失败，请检查用户名和密码");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="center-flex min-h-screen bg-bg">
      <div className="w-96 card">
        <h2 className="title-lg text-center mb-6">登录</h2>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input placeholder="请输入用户名" size="large" />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password placeholder="请输入密码" size="large" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
