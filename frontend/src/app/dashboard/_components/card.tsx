import websiteIcon from "@/assets/website.svg";
import Link from "next/link";

interface Cardprops {
  name: string;
  url: string;
  id: string;
}

const Card = ({ name, url, id }: Cardprops) => {
  return (
    <div className="bg-neutral-800 block max-w-sm p-6 border border-default rounded-base shadow-xs rounded-2xl">
      <img className="h-11" src={websiteIcon.src} alt="" />

      <h5 className="mb-2 text-2xl font-semibold tracking-tight text-heading pt-2 text-white/85">
        {name}
      </h5>

      <p className="inline-flex font-medium items-center text-fg-brand text-white/85">
        {url}
      </p>
      <div className="flex justify-between">
        <div>
          <Link href={`/dashboard/website/${id}`}>
            <button className="px-14 py-3 btn mt-6">Details</button>
          </Link>
        </div>
        <div>
          <Link href={`/dashboard/website/${id}/logs`}>
            <button className="px-16 py-3 btn mt-6">Logs</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
