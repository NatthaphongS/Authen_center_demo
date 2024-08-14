import { Button, Form, FormProps, Input, message } from 'antd';
import { signIn } from 'next-auth/react';
import React from 'react';

export default function LoginForm() {
  const onFinish: FormProps['onFinish'] = async (values) => {
    try {
      const resultLogin = await signIn('credentials', {
        ...values,
        redirect: false,
      });
      console.log(resultLogin);
      if (resultLogin?.status === 401) {
        message.error('ไม่พบผู้ใช้ในระบบ,รหัสผ่านไม่ถูกต้อง');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Form onFinish={onFinish} layout="vertical" size="large">
      <Form.Item
        name={'username'}
        rules={[{ required: true, message: 'โปรดป้อนเบอร์โทร/อีเมล' }]}
      >
        <Input placeholder="หมายเลขโทรศัพท์/อีเมล" />
      </Form.Item>
      <Form.Item
        name={'password'}
        rules={[{ required: true, message: 'โปรกป้อนรหัสผ่าน' }]}
      >
        <Input.Password placeholder="รหัสผ่าน" />
      </Form.Item>
      <Button className="w-full bg-[#00af43]" type="primary" htmlType="submit">
        เข้าสู่ระบบ
      </Button>
    </Form>
  );
}
