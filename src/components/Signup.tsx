"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { styles } from "@/styles";
import { fetchCountries, signUp } from "@/data/api_calls";

export default function RegisterForm() {
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
    <div className="grid place-items-center h-screen"  suppressHydrationWarning={true}>
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Signup</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-black">
          <label htmlFor="name" className="text-[14.4px] text-white">
            Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="John Doe"
          />
          <label htmlFor="email" className="text-[14.4px] text-white">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="john@doe.com"
          />
          <label htmlFor="email" className="text-[14.4px] text-white">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <label htmlFor="email" className="text-[14.4px] text-white">
            Country
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
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
            Signup
          </button>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={"/"}>
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}