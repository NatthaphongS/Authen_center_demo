import { Button, Form, FormProps, Input } from 'antd';
import { FieldNamesType } from 'antd/es/cascader';
import axios from 'axios';
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
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Form onFinish={onFinish} layout="vertical" size="large">
      <Form.Item
        name={'username'}
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item
        name={'password'}
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input type="password" placeholder="Password" />
      </Form.Item>
      <Button className="w-full bg-[#00af43]" type="primary" htmlType="submit">
        Login
      </Button>
    </Form>
  );
}
