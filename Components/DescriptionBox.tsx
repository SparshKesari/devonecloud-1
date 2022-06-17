export interface descProps {
  descriptionQuery: string;
  results: object;
}

export const DescriptionBox = ({descriptionQuery,results}:descProps)=>{
    const {items} = results["results"]
    const {snippet} = items[0]
    return(
        <div>
            <h2>
                {descriptionQuery}
            </h2>
            <p>
                {snippet}
                </p>
            <pre>
                {JSON.stringify(items[0], null, 2)}
                </pre>
        </div>
    )
}