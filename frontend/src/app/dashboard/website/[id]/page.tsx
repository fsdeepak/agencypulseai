"use client";

import { useGetWebsite } from "@/hooks/website.hook";
import { useParams } from "next/navigation";
import Link from "next/link";
import { CopyText } from "@/components/global/copyText";

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
    <div className="min-h-screen bg-[#0A0A12] text-[#e4e1ed] font-sans pt-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="text-sm text-[#cac3d9] hover:text-[#ccbeff] transition-colors flex items-center gap-2 w-fit pt-6"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <div className="bg-[#13131b]/70 border border-white/5 rounded-2xl p-10 backdrop-blur-xl shadow-[0_0_40px_rgba(108,59,245,0.05)]">
          <h2 className="text-4xl font-bold tracking-tight mb-10 bg-gradient-to-r from-[#ccbeff] to-[#a2e7ff] bg-clip-text text-transparent">
            Website Details
          </h2>

          <div className="space-y-8">
            {/* Website ID */}
            <div>
              <p className="text-xs font-medium text-[#cac3d9] uppercase tracking-wider mb-2">
                Project ID
              </p>
              <div className="bg-[#0d0d16] border border-[#494456]/30 rounded-xl px-4 py-3 font-mono text-sm text-[#a2e7ff] w-full max-w-md break-all selection:bg-[#6c3bf5]/30">
                {website.id}
              </div>
            </div>
            {/* Website Name */}
            <div>
              <p className="text-xs font-medium text-[#cac3d9] uppercase tracking-wider mb-2">
                Website Name
              </p>
              <div className="text-xl font-semibold text-white">
                {website.name}
              </div>
            </div>

            {/* Website URL */}
            <div>
              <p className="text-xs font-medium text-[#cac3d9] uppercase tracking-wider mb-2">
                Website URL
              </p>
              <a
                href={website.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-[#6c3bf5] hover:text-[#a2e7ff] hover:underline transition-colors block w-fit"
              >
                {website.url}
              </a>
            </div>

            {/* API Key (Optional since it was in the interface) */}
            {website.apiKey && (
              <div>
                <p className="text-xs font-medium text-[#cac3d9] uppercase tracking-wider mb-2">
                  API Key
                </p>
                <div className="flex items-center justify-between bg-[#0d0d16] border border-[#494456]/30 rounded-xl px-4 py-3 font-mono text-sm text-[#ccbeff] w-full max-w-md break-all selection:bg-[#6c3bf5]/30">
                  <div>{website.apiKey}</div>
                  <div>
                    <CopyText text={website.apiKey} />
                  </div>
                </div>
                <p className="text-xs text-[#cac3d9] mt-2">
                  Keep this key secret. You will need it to initialize the
                  tracking SDK.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteDetailPage;
