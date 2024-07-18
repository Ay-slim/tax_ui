const SummaryCard = ({title, value}: {title: string; value: string;}) => {
  return (
    <div className="w-1/2 grid grid-rows-2 justify-center text-center py-10 items-center h-full bg-gray-800">
      <p className="text-sm break-words self-start">{`${title}:`}</p> <strong><p className="text-xl break-words self-start">{`${value}`}</p></strong>
    </div>
  )
}

export default SummaryCard;