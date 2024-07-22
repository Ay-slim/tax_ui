import { ContributionsType, SetState } from "@/data/types";
import { styles } from "@/styles";
import { InputNumber } from "antd";
import { useState } from "react";

const Contribution = ({name, contributions, setContributions}: {name: string; contributions: ContributionsType; setContributions: SetState<ContributionsType>}) => {
  const [isSelected, setIsSelected] = useState("");
  return (
  <>
    <label htmlFor="contrib" className="mt-2 text-[12px]">
      {`Do you make ${name==='nhf' ? 'National housing fund' : name} contributions?`}
    </label>
    <select
      name={name}
      id={name}
      value={isSelected}
      onChange={(e) => {
        if(e.target.value === "no") {
          const contrib = {...contributions};
          delete contrib[name];
          setContributions(contrib);
        };
        setIsSelected(e.target.value);
      }}
      className={`${styles.input}`}
    >
      <option value={isSelected} className="">
        {isSelected || "--------"}
      </option>
      {["yes", "no"]?.map((option: string, idx: number) => (
        <option key={idx} value={option}>
          {option}
        </option>
      ))}
    </select>
    {isSelected === "yes" && (<div className="mt-2">
      <span className="text-[12px]">{`${name==='nhf' ? 'National housing fund' : name} contribution percentage:`}</span>
      <InputNumber
        style={{ backgroundColor: "rgba(255, 255, 255, 0.75)" }}
        className="text-[12px] shadow-md"
        placeholder={`${name} %`}
        min={0}
        max={100}
        addonAfter={"%"}
        onChange={(value) => {
          const contrib = {...contributions, [name]: {name, percentage: value as number}};
          setContributions(contrib);
        }}
      />
    </div>)}
  </>)
}

export default Contribution;
