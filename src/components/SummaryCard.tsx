const SummaryCard = ({title, value}: {title: string; value: string;}) => {
  return (
    <div className="w-1/2 flex-col justify-center text-center py-10 items-center h-full bg-gray-800">
      <p className="text-sm">{`${title}:`}</p> <strong><p className="text-xl">{`${value}`}</p></strong>
    </div>
  )
}

export default SummaryCard;