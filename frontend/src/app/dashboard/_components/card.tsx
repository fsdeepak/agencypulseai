import websiteIcon from "@/assets/website.svg";
import Link from "next/link";

interface Cardprops {
  name: string;
  url: string;
  id: string;
}

const Card = ({ name, url, id }: Cardprops) => {
  return (
    <div className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs rounded-2xl">
      <img className="h-11" src={websiteIcon.src} alt="" />

      <h5 className="mb-2 text-2xl font-semibold tracking-tight text-heading pt-2 text-white/85">
        {name}
      </h5>

      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex font-medium items-center text-fg-brand hover:underline text-white/85"
      >
        {url}
      </Link>
      <div className="flex items-center justify-between">
        <div>
          <Link href={`/dashboard/website/${id}`}>
            <button className="px-6 py-3 btn mt-6">Details</button>
          </Link>
        </div>
        <div>
          <Link href={`/dashboard/website/${id}`}>
            <button className="px-6 py-3 btn mt-6">Edit</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
