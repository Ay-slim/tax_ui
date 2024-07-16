"use client"

import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input, Space, Card } from "antd";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  return (
    <div className="flex items-center justify-center">
      {/*   <div className="absolute inset-0 z-0 w-full flex justify-center items-center h-screen overflow-hidden">
                <img src="/images/login.png" alt="Image d'arrière-plan" className="h-full w-full" style={{ opacity: '' }} />
            </div> */}
      <div className="flex  items-center justify-center h-screen">
        <Card bordered={false} style={{ width: 400, paddingBottom: 5 }}>
          <div className="flex flex-col items-center justify-center">
            <span className="border-b-2 border-[#1A1C4B] font-bold text-[12px]">
              TAXIFY
            </span>
            <span className="text-[9px] italic">
              Signin
            </span>
          </div>
          <div className="mt-4 flex flex-col items-center justify-center">
            <span className="font-bold text-[16px]"></span>
            <Space direction="vertical">
              <div className="w-full">
                <span className="text-[12px]">Email:</span>
                <Input
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.75)" }}
                  className="h-[45px] text-[12px] shadow-md"
                  placeholder="Enter Your Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(false);
                  }}
                />
              </div>
              <div className="mt-2">
                <span className="text-[12px]">Password:</span>
                <Input.Password
                  className="text-[12px] h-[45px] shadow-md"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.75)" }}
                  placeholder="Enter Your Password"
                  iconRender={(visible:any) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(false);
                  }}
                />
              </div>
              <button
                onClick={async () => {
                  try {
                    const res = await signIn("credentials", {
                      email,
                      password,
                      redirect: false,
                    });
                    if(res?.error) {
                      setError(true);
                      return;
                    }
                    router.replace("dashboard");
                  } catch (error) {
                    console.log(error);
                  }
                }}
                className="mt-2 bg-gray-100 h-[45px] space-x-2 w-full shadow-md flex items-center justify-center hover:bg-blue-100 transform transition duration-300 hover:scale-105"
              >
                <span className="text-blue-900 font-bold text-[16px]">
                  Sign in
                </span>
              </button>
              {error && <span className="text-red-500 text-[10px]">Invalid username or password</span>}
            </Space>
          </div>
          <div className="flex flex-col items-center justify-center mt-6 cursor-pointer">
          <Link className="text-sm mt-3 text-left text-[10px]" href={"/signup"}>
            {`Don't have an account?`} <span className="underline">Sign up</span>
          </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
