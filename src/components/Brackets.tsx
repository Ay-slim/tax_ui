import { Dispatch, SetStateAction } from "react";
import { FaTimes } from "react-icons/fa";

const Brackets = ({name, brackets, setBrackets}: {name: string; brackets: string[]; setBrackets: Dispatch<SetStateAction<string[]>>}) => {
  return (
    <div>
      <div>
        <FaTimes
            className="close-icon text-red-600 cursor-pointer absolute top-0 right-5 mt-4 mr-4 hover:bg-red-300"
            onClick={() => setBrackets([])}
          />
        <h1 className="text-[20px] text-center font-bold">
          {`${name} tax rates`.toUpperCase()}
        </h1>
        <div className="relative mt-6 mx-[10px] sm:mx-auto sm:w-full sm:max-w-md flex flex-col gap-3">
          {brackets.map((bracket, idx) => {return <span key={idx}>{bracket}</span>})}
        </div>
      </div>
    </div>
  );
}

export default Brackets;