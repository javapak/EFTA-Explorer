import { Tooltip } from "@fluentui/react-components";
import { useEffect, useState } from "react";
import { getRedactionStatsFromEFTANumber, getNumberOfImagesAssociatedToEFTANumber } from "../utils/APIHelpers";

async function generateTooltipContentForDocumentRow(eftaNumber: string) {
    const redactionStats = await getRedactionStatsFromEFTANumber(eftaNumber)
    const numImages = await getNumberOfImagesAssociatedToEFTANumber(eftaNumber);
    const tooltipContent = (<div>{`Proper redactions: ${redactionStats.properRedactions}`}
    <br />
   {`Total redactions: ${redactionStats.totalRedactions}`}
   <br />
   {`Total images: ${numImages}`}
   
   </div>)
    return tooltipContent;
}

interface AsyncTooltipProps {
    efta_number: string
    children: React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
}

export default function AsyncTooltip({efta_number, children}: AsyncTooltipProps) {
    const [content, setContent] = useState(<p></p>);

    useEffect(() => {
        const fetch = async () => {
            const tooltipContent = await generateTooltipContentForDocumentRow(efta_number);
            setContent(tooltipContent);

        }
        
        fetch();
    })
    return (
        <Tooltip children={children} withArrow positioning="after" content={content} relationship="label" />
    )
}