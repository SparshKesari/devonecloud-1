import { useEffect, useState } from "react";
import { AWSForm } from "../Components/AwsForm";

import { DescriptionBox } from "../Components/DescriptionBox";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

// Mock Data
import { awsMockDesc } from "../data/awsDescription";

const cores = [
  { id: 1, name: "2" },
  { id: 2, name: "4" },
  { id: 3, name: "8" },
  { id: 4, name: "16" },
];

export default function Item(results: object) {
  const [descriptionQuery, setDescriptionQuery] = useState<string>("");
  const handleDescripitonClick = async (e: any) => {
    // console.log(`event: ${e.name}`)
    setDescriptionQuery(`${e.name || "aws"}`);
    const useDummyData = false;
    const data = useDummyData
      ? awsMockDesc
      : await fetch(
          `https://www.googleapis.com/customsearch/v1?key=${process.env.NEXT_PUBLIC_API_KEY}&cx=${process.env.NEXT_PUBLIC_CONTEXT_KEY}&q=${descriptionQuery}&start=0`
        ).then((response) => response.json());
  };

  return (
    <div className="text-white flex-col bg-gray-900 w-screen min-h-screen">
      <Navbar />
      <div className="w-screen m-auto h-full flex">
        <div className="px-5 container w-3/4 h-full py-20">
          <AWSForm handledesc={handleDescripitonClick} />
        </div>
        <div className="flex-col w-1/4 px-3 py-40">
            <DescriptionBox
              descriptionQuery={descriptionQuery}
              results={results}
              />

        </div>
      </div>
      <div className="">
      <div className="fixed bottom-0 left-0 right-0">
        <Footer />
      </div>
    </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const useDummyData = true;
  const data = useDummyData
    ? awsMockDesc
    : await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${process.env.NEXT_PUBLIC_API_KEY}&cx=${process.env.NEXT_PUBLIC_CONTEXT_KEY}&q=aws_instance&start=0`
      ).then((response) => response.json());

  return {
    props: {
      results: data,
    },
  };
}
