"use client";

import { useGetMe } from "@/hooks/auth.hook";

const DashboardPage = () => {
  const { data, isLoading, isError } = useGetMe();

  // Logging for debugging
  console.log("Full Data:", data);
  console.log("User Object:", data?.user);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#050509]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#6c3bf5]" />
      </div>
    );
  }

  // Handle cases where the user is not logged in or API fails
  if (isError || !data?.user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#050509] text-white">
        <p>Could not load user profile. Please log in again.</p>
      </div>
    );
  }

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="mt-4 p-4 bg-[#13131b] border border-white/10 rounded-xl">
        <p>
          <span className="text-[#948ea2]">Name:</span> {data.user.name}
        </p>
        <p>
          <span className="text-[#948ea2]">Email:</span> {data.user.email}
        </p>
        <p>
          <span className="text-[#948ea2]">Role:</span>
          <span className="ml-2 px-2 py-0.5 rounded bg-[#6c3bf5]/20 text-[#6c3bf5] text-xs uppercase">
            {data.user.role}
          </span>
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;
