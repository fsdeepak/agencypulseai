"use client";

import { useGetWebsite } from "@/hooks/website.hook";
import { useParams } from "next/navigation";
import Link from "next/link";
import Details from "./_components/details";

const WebsiteDetailPage = () => {
  const params = useParams();
  const id = params.id as string;

  // We use our existing hook to fetch all websites, then find the specific one.
  const { data, isPending, isError } = useGetWebsite();

  if (isPending) {
    return (
      <div className="flex h-[80vh] w-full items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#6c3bf5]" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex h-[80vh] w-full items-center justify-center text-[#e4e1ed]">
        Failed to load website details.
      </div>
    );
  }

  // Find the website that matches the ID from the URL
  const website = data.find((w) => w.id === id);

  if (!website) {
    return (
      <div className="flex flex-col h-[80vh] w-full items-center justify-center text-[#e4e1ed]">
        <h2 className="text-2xl mb-4">Website not found</h2>
        <Link href="/dashboard" className="text-[#6c3bf5] hover:underline">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <Details
      id={website.id}
      name={website.name}
      url={website.url}
      apiKey={website.apiKey}
    />
  );
};

export default WebsiteDetailPage;
