"use client";

import { useGetMe } from "@/hooks/auth.hook";
import Link from "next/link";

const DashboardPage = () => {
  const { data, isLoading } = useGetMe();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#050509]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#6c3bf5]" />
      </div>
    );
  }

  const name = data?.user.name;

  const newName = name?.split(" ");

  const firstName = newName[0];

  return (
    <div className="px-34 py-20">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-extralight text-white">
          <span>Hi! </span>
          {firstName}
        </h2>

        <div>
          <Link href={"/dashboard/website"}>
            <button className="cursor-pointer px-6 py-3 text-sm font-extralight rounded-lg btnColor text-white  hover:scale-105 transition-all duration-200 mt-6">
              Add Website
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
