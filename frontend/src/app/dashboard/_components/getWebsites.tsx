"use client";
import { useGetWebsite } from "@/hooks/website.hook";
import Card from "./card";
const GetWebsites = () => {
  const { data, isLoading } = useGetWebsite();

  return (
    <div className="pt-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data?.map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default GetWebsites;
