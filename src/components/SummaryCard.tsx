import { useState } from "react";
import MoreInfoModal from "./MoreInfoModal";
import { MoreInfoTableColumns, MoreInfoTableDataSource } from "@/data/types";

const SummaryCard = ({
  title,
  value,
  infoText,
  info,
}: {
    title: string;
    value: string;
    infoText?: string;
    info?: {
      title: string;
      dataSource: MoreInfoTableDataSource[];
      columns: MoreInfoTableColumns[];
    };
  }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <>
      <MoreInfoModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} info={info || null} />
      <div className="relative w-1/2 grid grid-rows-2 justify-center text-center py-10 items-center h-full bg-gray-800">
        {infoText && <p className="absolute top-2 left-2 text-[8px] underline italic hover:text-blue-800 cursor-pointer" onClick={() => setIsModalOpen(!isModalOpen)}>{infoText}</p>}
        <p className="text-sm break-words self-start">{`${title}:`}</p>
        <strong><p className="text-xl break-words self-start">{`${value}`}</p></strong>
      </div>
    </>
  )
}

export default SummaryCard;