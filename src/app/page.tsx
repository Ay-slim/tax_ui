"use client";
import Login from "@/components/Login";

export default function Home() {
  // return <Dashboard user_id="66569f982b399320e74304ac" />
  
  return (<main  suppressHydrationWarning={true}>
    <Login />
  </main>)
}
