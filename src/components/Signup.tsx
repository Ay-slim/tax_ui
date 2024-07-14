"use client"

import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input, Space, Card } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchCountries, signUp } from "@/data/api_calls";
import { styles } from "@/styles";
import Link from "next/link";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [countryId, setCountryId] = useState("");
  console.log(countryId, 'COUNTRY IDDDD')
  const [error, setError] = useState("");
  const [countries, setCountries] = useState<{name: string, _id: string}[]>([]);

  useEffect(() => {
    (async () => {
      setCountries(await fetchCountries() as {name: string, _id: string}[]);
    })()
  }, [])

  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void; target: any; }) => {
    e.preventDefault();

    if (!name || !email || !password || !countryId) {
      setError("All fields are necessary.");
      return;
    }

    try {
      await signUp({name, email, password, country_id: countryId, year: new Date().getFullYear()})
        const form = e.target;
        form.reset();
        router.push("/");
    } catch (error) {
      setError("Something went wromg");
      console.log("Error during registration: ", error);
    }
  };

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
              Signup
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
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-2">
                <span className="text-[12px]">Name:</span>
                <Input
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.75)" }}
                  className="h-[45px] text-[12px] shadow-md"
                  placeholder="Enter Your Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
          <label htmlFor="email" className="mt-2 text-[12px]">
            Country:
          </label>
          <select
            name="country"
            id="country"
            value={countryId}
            onChange={(e) => setCountryId(e.target.value)}
            className={`${styles.input}`}
          >
            <option value={countryId} className="">
              {countries.filter(country => country._id === countryId)?.[0]?.name || "--------"}
            </option>
            {countries?.map((option: any, idx: number) => (
              <option key={idx} value={option._id}>
                {option.name}
              </option>
            ))}
          </select>
              <div className="mt-2">
                <span className="text-[12px]">Password:</span>
                <Input.Password
                  className="text-[12px] h-[45px] shadow-md"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.75)" }}
                  placeholder="Enter Your Password"
                  iconRender={(visible:any) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                onClick={handleSubmit}
                className="mt-2 bg-gray-100 h-[45px] space-x-2 w-full shadow-md flex items-center justify-center hover:bg-blue-100 transform transition duration-300 hover:scale-105"
              >
                <span className="text-blue-900 font-bold text-[16px]">
                  Sign up
                </span>
              </button>
              {error && <span className="text-red-500 text-[10px]">Something went wrong</span>}
            </Space>
          </div>
          <div className="flex flex-col items-center justify-center mt-6 cursor-pointer">
          <Link className="text-sm mt-3 text-left text-[10px]" href={"/"}>
            Already have an account? <span className="underline">Login</span>
          </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
