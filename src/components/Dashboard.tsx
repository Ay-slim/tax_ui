"use client"

import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import FileIncome from "./FileIncome";
import { DashboardData, fetchDashboardData } from "@/data/api_calls";
import { formatDate2 } from "@/data/utils";
import { styles } from "@/styles";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const [clickedNew, setClickedNew] = useState<boolean>(false);
  const [dashboardData, setDashboardData] = useState<DashboardData>();
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [currentCountry, setCurrentCountry] = useState<string>(dashboardData ? dashboardData?.summary?.country : "");
  const { data: session } = useSession();
  console.log(session, 'SESSSIONNNNN')
  // console.log(dashboardData, 'DASHHHHHHHHHH')
  useEffect(() => {
    async function dashboardUseEffect() {
      setDashboardData(await fetchDashboardData({user_id: session?.user?._id, year: currentYear}))
    }
    dashboardUseEffect()
  }, [clickedNew, currentYear])
  return (
    <>{clickedNew ? (<FileIncome user_id={session?.user?._id} country_id={dashboardData?.summary?.country_id as string} setClickedNew={setClickedNew} />) :
    (<main className="flex min-h-screen flex-col items-center">
      <div className="flex w-full h-28 items-center justify-center">
        <h1 className="text-7xl"><strong>Taxify</strong></h1>
      </div>
      <div className="flex w-full h-28">
        <div className="flex w-full h-30">
          <div className="flex flex-col justify-center w-full h-full">
            <label htmlFor="year" className="text-[14.4px]">
                Year
            </label>
            <select
              name="year"
              id="year"
              value={currentYear}
              onChange={(e) => setCurrentYear(Number(e.target.value))}
                className="w-5/6 text-[14px] border rounded h-[34px] text-black px-2 outline-none mt-[4px]"
              >
              <option value={currentYear} className="">
                  {currentYear}
              </option>
              {(dashboardData?.years || []).filter(yearVal => yearVal !== currentYear)?.map((option: any, idx: number) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col justify-center w-full h-full">
            <label htmlFor="country" className="text-[14.4px]">
              Country
            </label>
            <select
              name="country"
              id="country"
              value={dashboardData?.summary?.country}
              onChange={(e) => setCurrentCountry(e.target.value)}
                className="w-5/6 text-[14px] border rounded h-[34px] text-black px-2 outline-none mt-[4px]"
              >
              <option value={dashboardData?.summary?.country} className="">
                  {dashboardData?.summary?.country}
              </option>
              {[].map((option: any, idx: number) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {/* {`Country: ${dashboardData ? dashboardData?.summary?.country : ""}`} */}
          </div>
        </div>
        <div className="w-full h-30 flex flex-col hover:bg-sky-700 bg-gray-600 rounded-sm">
          <div className="h-1/6 flex items-center justify-center">File new income</div>
          <div className="h-5/6">
            <button className="w-full h-full" onClick={() => {setClickedNew(true)}}>
              <FiPlus className="w-full h-full" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col border-2 w-full h-40 mt-5">
        <p className="h-1/6 text-xl"><strong>{`Your ${currentYear} summary:`} </strong></p>
        <div className="flex flex-row h-5/6">
          <div className="w-1/2 flex justify-center items-center h-full">{"Total filed income"} <strong><p>{`:  ${dashboardData ? dashboardData?.summary?.total_taxed_income?.toLocaleString() : 0}`}</p></strong></div>
          <div className="w-1/2 flex justify-center items-center h-full">{"Total tax due"} <strong><p>{`:  ${dashboardData ? dashboardData?.summary?.total_deducted_tax?.toLocaleString() : 0}`}</p></strong></div>
          <div className="w-1/2 flex justify-center items-center h-full">{"Current tax bracket"} <strong><p>{`:  ${dashboardData?.summary?.current_tax_bracket || ""}`}</p></strong></div>
        </div>
        {/* {dashboardData?.summary.total_taxed_income} */}
      </div>
      <div className="flex flex-col border-2 w-full h-80 mt-5">
        <p className="h-1/6 text-xl"><strong>{`History:`} </strong></p>
        <div className="flex flex-row">
        <div className="overflow-auto bg-white rounded-sm shadow-sm w-full">
              <div className="overflow-auto">
                <table className="table-auto w-full bg-white text-black">
                  <thead className="sticky -top-1 text-[14.4px] z-[9] bg-gray-200">
                    <tr className="">
                      <th className={`min-w-[50px]`}>No.</th>
                      <th
                        className={`${styles.wide_tb_th} border-x-2 border-x-gray-300`}
                      >
                        <span className={`${styles.sort_span}`}>Date</span>
                      </th>
                      <th
                        className={`${styles.wide_tb_th} border-x-2 border-x-gray-300`}
                      >
                        <span className={`${styles.sort_span}`}>
                          Description
                        </span>
                      </th>
                      <th
                        className={`${styles.wide_tb_th}border-x-2 border-x-gray-300`}
                      >
                        <span className={`${styles.sort_span} !block`}>
                          Income
                        </span>
                      </th>
                      <th
                        className={`${styles.wide_tb_th} border-x-2 border-x-gray-300`}
                      >
                        <span className={`${styles.sort_span} !block`}>
                          Tax
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {dashboardData &&
                    dashboardData?.deductions?.length ? (
                      dashboardData?.deductions?.map(
                        (dashboardRow, index) => (
                          <tr
                            key={index}
                            className={
                              index % 2 === 0 ? "bg-white" : "bg-gray-200"
                            }
                          >
                            <td className="text-center p-[10px]">
                              {index + 1}
                            </td>
                            <td
                              className="text-center"
                              title={formatDate2(String(dashboardRow?.created_at))}
                            >
                              {dashboardRow?.created_at &&
                                formatDate2(String(dashboardRow?.created_at))}
                            </td>
                            <td
                              className="text-center truncate-25"
                              title={dashboardRow?.description}
                            >
                              {dashboardRow?.description}
                            </td>
                            <td
                              className="text-center"
                              title="income"
                            >
                              {dashboardRow && dashboardRow?.income ? dashboardRow?.income?.toLocaleString() : 0}
                            </td>
                            <td
                              className="text-center"
                              title="tax"
                            >
                              {dashboardRow && dashboardRow?.tax ? dashboardRow?.tax?.toLocaleString() : 0}
                            </td>
                          </tr>
                        )
                      )
                    ) : (
                      <tr>
                        <td className="border-y text-center py-2" colSpan={12}>
                          <span className="text-red-500 font-extrabold">
                            {`You haven't filed any income yet. Click file new income to get started.`}
                          </span>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
        </div>
      </div>
    </main>)}
    </>
  );
};

export default Dashboard;
