"use client";

import { useGetMe } from "@/hooks/auth.hook";
import Link from "next/link";
import GetWebsites from "./_components/getWebsites";
import { redirect } from "next/navigation";

const DashboardPage = () => {
  const { data, isPending, isError } = useGetMe();

  if (isPending) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#050509]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#6c3bf5]" />
      </div>
    );
  }
  if (isError || !data) {
    redirect("/login");
  }

  const firstName = data?.user.name?.split(" ")[0] || "User";

  return (
    <div className="px-34 py-20">
      <div className="flex justify-between items-center pb-3 border-b-2 border-b-blue-100">
        <h2 className="text-3xl font-extralight text-white">
          <span>Hi! </span>
          {firstName}
        </h2>

        <div>
          <Link href={"/dashboard/website"}>
            <button className="btn mt-6">Add Website</button>
          </Link>
        </div>
      </div>
      <GetWebsites />
    </div>
  );
};

export default DashboardPage;
