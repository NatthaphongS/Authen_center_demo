'use client';
import { Button, ConfigProvider, Form, Input, Layout, Typography } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const [form] = useForm();
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
        <div className="w-[20rem] flex flex-col gap-5 max-h-min bg-neutral-200 rounded-lg p-5">
          <div className="text-[2rem] text-center">Register</div>
          <div>
            <Form form={form} layout="vertical" size="large">
              <Form.Item name={'username'} required>
                <Input placeholder="Username" />
              </Form.Item>
              <Form.Item name={'password'} required>
                <Input placeholder="Password" />
              </Form.Item>
            </Form>
            <div className="flex justify-between ">
              <Button
                type="default"
                onClick={() => {
                  router.back();
                }}
              >
                Cancle
              </Button>
              <Button
                className="bg-[#00af43]"
                type="primary"
                onClick={() => {}}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
        <Form form={form}>
          <Form.Item noStyle shouldUpdate>
            {() => (
              <Typography>
                <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
              </Typography>
            )}
          </Form.Item>
        </Form>
      </Layout>
    </ConfigProvider>
  );
}
