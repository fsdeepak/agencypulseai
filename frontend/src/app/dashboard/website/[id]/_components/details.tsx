import Link from "next/link";
import { CopyText } from "@/components/global/copyText";
import { useState } from "react";
import { useDeleteWebsite, useUpdateWebsite } from "@/hooks/website.hook";

interface WebsiteProps {
  id: string;
  name: string;
  url: string;
  apiKey: string;
}

const Details = ({
  id,
  name: initialName,
  url: initialUrl,
  apiKey,
}: WebsiteProps) => {
  const { mutate, isPending } = useUpdateWebsite();
  const { mutate: deleteMutate, isPending: deletePending } = useDeleteWebsite();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);
  const [url, setUrl] = useState(initialUrl);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { id, name, url };
    mutate(payload, {
      onSuccess: () => {
        setIsEditing(false);
      },
    });
  };

  const handleDelete = () => {
    deleteMutate({ id });
  };

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
                {id}
              </div>
            </div>
            {/* Website Name */}
            <div>
              <p className="text-xs font-medium text-[#cac3d9] uppercase tracking-wider mb-2">
                Website Name
              </p>
              {isEditing ? (
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-[#0d0d16] border border-[#6c3bf5] rounded-xl px-4 py-2 text-white w-full max-w-md focus:outline-none"
                />
              ) : (
                <div className="text-xl font-semibold text-white">{name}</div>
              )}
            </div>

            {/* Website URL */}
            <div>
              <p className="text-xs font-medium text-[#cac3d9] uppercase tracking-wider mb-2">
                Website URL
              </p>
              {isEditing ? (
                <input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="bg-[#0d0d16] border border-[#6c3bf5] rounded-xl px-4 py-2 text-white w-full max-w-md focus:outline-none"
                />
              ) : (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-[#6c3bf5] hover:text-[#a2e7ff] hover:underline transition-colors block w-fit"
                >
                  {url}
                </a>
              )}
            </div>

            {/* API Key (Optional since it was in the interface) */}
            {apiKey && (
              <div>
                <p className="text-xs font-medium text-[#cac3d9] uppercase tracking-wider mb-2">
                  API Key
                </p>
                <div className="flex items-center justify-between bg-[#0d0d16] border border-[#494456]/30 rounded-xl px-4 py-3 font-mono text-sm text-[#ccbeff] w-full max-w-md break-all selection:bg-[#6c3bf5]/30">
                  <div>{apiKey}</div>
                  <div>
                    <CopyText text={apiKey} />
                  </div>
                </div>
                <p className="text-xs text-[#cac3d9] mt-2">
                  Keep this key secret. You will need it to initialize the
                  tracking SDK.
                </p>
              </div>
            )}
          </div>
          <div>
            {isEditing ? (
              <div className="flex gap-6 mt-6">
                <button
                  onClick={handleSave}
                  disabled={isPending}
                  className="px-8 py-2 btn"
                >
                  {isPending ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-8 py-2 border border-white/10 rounded-lg hover:bg-white/5"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex gap-6  mt-6">
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-12 py-2 btn"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deletePending}
                  className="px-8 py-2 border border-white/10 rounded-lg hover:bg-white/5"
                >
                  {deletePending ? "Deleting..." : "Delete"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
