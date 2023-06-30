"use client";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@lib/hooks";
import Dashboard from "@components/pages/dashboard";

export default function Page() {
  const router = useRouter();
  const logged_in = useAppSelector((state) => {
    return state.auth.logged_in;
  });
  return (
    <>
      <Dashboard />
    </>
  );
}
