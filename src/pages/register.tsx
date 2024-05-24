import { Alert, Button, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";

interface IRegisterFormValue {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm = () => {
  const router = useRouter();
  const [form] = useForm<IRegisterFormValue>();
  const [isLoading, setIsLoading] = useState(false);

  const handleFinish = useCallback(async (value: IRegisterFormValue) => {
    setIsLoading(true);

    try {
      // Here you should send the registration data to your backend.
      console.log(value);
      // For demonstration, assuming registration is successful and redirecting to login.
      router.push('/login');
    } catch (error) {
      setIsLoading(false);
    }
  }, [router]);

  return (
    <>
      <div className="mb-3">
        {router?.query.error && (
          <Alert message={`회원가입 중 오류가 발생했습니다. ${router?.query.error}`} type="warning" />
        )}
      </div>
      <Form<IRegisterFormValue>
        form={form}
        layout="vertical"
        onFinish={handleFinish}
      >
        <Form.Item name="username" rules={[{ required: true, message: "아이디를 입력해주세요" }]}>
          <Input size="large" placeholder="아이디" />
        </Form.Item>

        <Form.Item name="email" rules={[{ required: true, message: "이메일을 입력해주세요" }]}>
          <Input size="large" placeholder="이메일" type="email" />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: "비밀번호를 입력해주세요" }]}>
          <Input placeholder="비밀번호" type="password" size="large" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: "비밀번호 확인을 입력해주세요" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('비밀번호가 일치하지 않습니다'));
              },
            }),
          ]}
        >
          <Input placeholder="비밀번호 확인" type="password" size="large" />
        </Form.Item>

        <Button size="large" type="primary" htmlType="submit" className="w-full" loading={isLoading}>
          회원가입
        </Button>
      </Form>
    </>
  );
};

export default React.memo(RegisterForm);
