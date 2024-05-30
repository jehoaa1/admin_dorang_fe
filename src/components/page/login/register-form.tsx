import { Button, Form, Input, Modal, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";

interface IRegisterFormValue {
  name: string;
  email: string;
  pw: string;
  confirmPassword: string;
}

const RegisterForm = (props: { open: any; setOpen: any; }) => {
  const router = useRouter();
  const [form] = useForm<IRegisterFormValue>();
  const [isLoading, setIsLoading] = useState(false);
  const { open, setOpen } = props

  const handleFinish = useCallback(async (value: IRegisterFormValue) => {
    setIsLoading(true);

    try {

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register/email`,{
          method : "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(value),
        });

        const responseData = await response.json(); // 응답 본문을 JSON으로 파싱
        
        if(responseData.result == "fail"){
          message.error(responseData.result_msg);
          return
        }
        message.success('회원가입 성공'); 
        setOpen(false);
        form.resetFields();
      } catch (error) {
        console.error('Error fetching data:', error);
      }finally{        
        setIsLoading(false);
      }

      // For demonstration, assuming registration is successful and redirecting to login.
      //router.push('/login');
    } catch (error) {
      setIsLoading(false);
    }
  }, [form, setOpen]);//[router]);

  return (
    <>
    <Modal open={open} footer={null} style={{ top: 20 }} onCancel={() => {
    // 모달이 닫힐 때 open 값을 false로 변경
    setOpen(false) // setOpen은 props로 받아오는 함수로 open 값을 변경하는 함수입니다.
    }}
>
      <Form<IRegisterFormValue>
        form={form}
        layout="vertical"
        onFinish={handleFinish}
      >
        <Form.Item name="email" rules={[{ required: true, message: "이메일을 입력해주세요" }]}>
          <Input size="large" placeholder="이메일" type="email" />
        </Form.Item>

        <Form.Item name="pw" rules={[{ required: true, message: "비밀번호를 입력해주세요" }]}>
          <Input placeholder="비밀번호" type="password" size="large" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: "비밀번호 확인을 입력해주세요" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('pw') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('비밀번호가 일치하지 않습니다'));
              },
            }),
          ]}
        >
          <Input placeholder="비밀번호 확인" type="password" size="large" />
        </Form.Item>
        
        <Form.Item name="name" rules={[{ required: true, message: "이름 입력해주세요" }]}>
          <Input size="large" placeholder="이름" />
        </Form.Item>

        <Button size="large" type="primary" htmlType="submit" className="w-full" loading={isLoading}>
          회원가입
        </Button>
      </Form>
    </Modal>
    </>
  );
};

export default React.memo(RegisterForm);
