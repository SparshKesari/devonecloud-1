import Card from "./Card";

export interface descProps {
  descriptionQuery: string;
  results: object;
}

export const DescriptionBox = ({descriptionQuery,results}:descProps)=>{
    console.log(descriptionQuery)
    const {items} = results["results"]
    const {snippet} = items[0]
    return (
      <div className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20">
        <div className="flex justify-center md:justify-end -mt-16">
          <img
            className="w-20 h-20 object-cover rounded-full border-4 border-emerald-500"
            src="https://d2908q01vomqb2.cloudfront.net/af3e133428b9e25c55bc59fe534248e6a0c0f17b/2021/01/15/CHATBLOG-1024x579.jpg"
          />
        </div>
        <div>
          <h2 className="text-gray-800 text-3xl font-semibold">
            {descriptionQuery || "AWS"}
          </h2>
          <p className="mt-2 text-gray-600">{snippet}</p>
        </div>
        <div className="flex justify-end mt-4">
          <a href="#" className="text-sm font-medium text-indigo-500 hover:text-emerald-500">
            Read More..
          </a>
        </div>
      </div>
    );
}