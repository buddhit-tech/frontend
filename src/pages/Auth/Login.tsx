import { Card, Checkbox, Form, Input, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { authenticateUser } = useAuth();

  const handleLoginUser = () => {
    authenticateUser();
    navigate("/");
  };

  return (
    <section className="bg-[#f6f6f6] h-[100vh] w-full flex flex-col items-center justify-center gap-3">
      <img
        src="https://static.vecteezy.com/system/resources/previews/022/227/364/non_2x/openai-chatgpt-logo-icon-free-png.png"
        className="w-[74px] h-[74px]"
        alt=""
      />
      <Typography.Title level={2}>Sign in to your account</Typography.Title>
      <Card className="w-[450px] shadow-xl">
        <div className="flex flex-col items-center justify-center">
          <Form form={form} layout="vertical" className="w-full">
            <Form.Item name="email" label="Email Address">
              <Input size="large" placeholder="Enter your email" />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input.Password size="large" placeholder="Enter your password" />
            </Form.Item>
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <Checkbox />
                <span>Remember me</span>
              </div>
              <Link className="!text-[#19181a] font-bold" to="/forgot-password">
                Forgot your password?
              </Link>
            </div>
            <br />
            <button
              className="w-full rounded-md bg-[#19181a] text-white py-2 hover:bg-[#282729]"
              onClick={() => handleLoginUser()}
            >
              Sign In
            </button>
          </Form>
        </div>
      </Card>
    </section>
  );
};

export default Login;
