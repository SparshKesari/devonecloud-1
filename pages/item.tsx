import { useState } from "react";
import { AWSForm } from "../Components/AwsForm";
import {DescriptionBox} from "../Components/DescriptionBox"

// Mock Data
import {awsMockDesc} from "../data/awsDescription"

const cores = [
  { id: 1, name: "2" },
  { id: 2, name: "4" },
  { id: 3, name: "8" },
  { id: 4, name: "16" },
];

export default function Item(results: object) {
  const [descriptionQuery, setDescriptionQuery] = useState<string>("");
  const handleDescripitonClick = async (e: any) => {
    e.preventDefault();
    console.log(`event: ${e}`)
    console.log(e.target.name);
    setDescriptionQuery(`${e.target.name || "aws"}`);
    const useDummyData = false;
    const data = useDummyData
    ? awsMockDesc
    : await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${process.env.NEXT_PUBLIC_API_KEY}&cx=${process.env.NEXT_PUBLIC_CONTEXT_KEY}&q=${descriptionQuery}&start=0`
      ).then((response) => response.json());
  };

  return (
    <div className="w-screen h-screen flex ">
      <div className="bg-emerald-400 w-3/4 h-full px-2 py-16 sm:px-0">
        <AWSForm handledesc={handleDescripitonClick}/>
      </div>
      <div className="bg-emerald-400 w-1/4">
        <DescriptionBox descriptionQuery={descriptionQuery} results={results}/>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const useDummyData = false;
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