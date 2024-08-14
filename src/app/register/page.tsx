'use client';
import {
  Button,
  ConfigProvider,
  Form,
  FormProps,
  Input,
  Layout,
  message,
  Typography,
} from 'antd';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type FieldType = {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  password?: string;
};

export default function Page() {
  const router = useRouter();
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      const response = await axios.post('/api/auth/register', {
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
        email: values.email,
        password: values.password,
      });
      if (response.status === 201) {
        message.success('สมัครสมาชิกสำเร็จ');
        setTimeout(() => {
          router.replace('/');
        }, 3000);
      }
      // if (response.status === 409) {
      //   message.warning('เบอร์โทรนี้ลงทะเบียนไว้แล้ว');
      //   setTimeout(() => {
      //     router.replace('/');
      //   }, 3000);
      // }
      console.log(response);
    } catch (error: any) {
      if (error.response.status === 409) {
        message.warning('เบอร์โทรนี้ลงทะเบียนไว้แล้ว');
      }
      console.log(error);
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00af43',
          fontSize: 16,
        },
      }}
    >
      <Layout className="bg-white p-[1rem] w-screen h-screen flex items-center justify-center">
        <div className="w-[20rem] flex flex-col gap-5 max-h-min rounded-lg p-5 bg-zinc-100/50 customBoxShadow">
          <div className="text-[2rem] text-center">สมัครสมาชิก</div>
          <div>
            <Form onFinish={onFinish} layout="vertical" size="large">
              <Form.Item
                name={'firstName'}
                rules={[{ required: true, message: 'โปรดระบุชื่อของคุณ' }]}
              >
                <Input placeholder="ชื่อ*" />
              </Form.Item>
              <Form.Item
                name={'lastName'}
                rules={[{ required: true, message: 'โปรดระบุนามสกุลของคุณ' }]}
              >
                <Input placeholder="นามสกุล*" />
              </Form.Item>
              <Form.Item
                name={'phoneNumber'}
                rules={[
                  { required: true, message: 'โปรดระบุเบอร์โทรศัพท์ของคุณ' },
                ]}
              >
                <Input placeholder="เบอร์โทรศัพท์*" />
              </Form.Item>
              <Form.Item name={'emai'}>
                <Input placeholder="อีเมล" />
              </Form.Item>
              <Form.Item
                name={'password'}
                rules={[
                  { required: true, message: 'Please enter your password' },
                ]}
                hasFeedback
              >
                <Input.Password placeholder="รหัสผ่าน*" />
              </Form.Item>
              <Form.Item
                name={'confirmPassword'}
                dependencies={['password']}
                hasFeedback
                rules={[
                  { required: true, message: 'Please enter your password' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error('ยืนยันรหัสผ่านไม่ถูกต้อง')
                      );
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="ยืนยันรหัสผ่าน*" />
              </Form.Item>
              <div className="flex justify-between ">
                <Button
                  type="default"
                  onClick={() => {
                    router.back();
                  }}
                >
                  กลับ
                </Button>
                <Button
                  className="bg-[#00af43]"
                  type="primary"
                  htmlType="submit"
                >
                  ยืนยัน
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Layout>
    </ConfigProvider>
  );
}
