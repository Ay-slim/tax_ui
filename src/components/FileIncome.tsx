"use client"

import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchUserContributions, fileIncome } from "@/data/api_calls";
import { Card, Input, Space, Select, SelectProps } from "antd";
import { FaTimes } from "react-icons/fa";
import { styles } from "@/styles";
import { filingCategoryMap } from "@/data/utils";

const schema = Yup.object().shape({
  amount: Yup.string().required("Amount to file is required"),
  description: Yup.string().required("Income description is required"),
});

const FileIncome = (props: {user_id: string, country_id: string, setClickedNew: any}) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [contributionOptions, setContributionOptions] = useState<SelectProps[]>([]);

  useEffect(() => {
    const contribOptionsFetch = async () => {
      const contribResponse = await fetchUserContributions({
        user_id: props.user_id,
        country_id: props.country_id, 
      });
      setContributionOptions(contribResponse as SelectProps[]);
    }
    contribOptionsFetch();
  }, []);

  const formik = useFormik({
    initialValues: {
      amount: "",
      description: "",
      date: "",
      category: "",
      contributions: [],
    },
    validationSchema: schema,
    onSubmit: async ({
      amount,
      description,
      date,
      category,
      contributions
    }) => {
      try{
        // console.log(values, 'VALUESSS');
        // console.log(amount, description, year, 'AMONEIFEEDE')
        await fileIncome({
          user_id: props.user_id,
          amount: Number(amount),
          description,
          date,
          country_id: props.country_id,
          category,
          contributions,
        });
        // console.log(filedIncome, 'FILED INCOMEEEE');
        setIsSuccess(true);
        // console.log('BEFORE SET NEW')
        props.setClickedNew(false);
        // console.log('AFTER SET NEW')
      } catch (err) {
        setError(true);
      }
    },
  });

  useEffect(() => {
    if (isSuccess) {
      const message = "Income filed";
      toast.success(message, { duration: 5000 });
      //   refetch();
      formik.resetForm();
    }
    if (error) {
      // console.log(error)
      toast.error("Something went wrong", {duration: 5000})
    }
  }, [isSuccess, error]);

  return (
    <>
      <div className="max-sm:min-h-[100vh] min-h-[70vh] flex flex-col justify-center sm:px-6 lg:px-8 z-[-100px] mt-10">
        <h1 className="text-[20px] text-center font-bold">
          File New Income
        </h1>
        <div className="relative mt-6 mx-[10px] sm:mx-auto sm:w-full sm:max-w-md">
          
          <Card bordered={false} style={{width: 400, paddingBottom: 5}}>
          
          {/* <FaTimes
            className="close-icon text-red-600 cursor-pointer absolute top-0 right-5 mt-4 mr-4 hover:bg-red-300"
            onClick={() => props.setClickedNew(false)}
          /> */}
          <button
          onClick={() => props.setClickedNew(false)}
          className="absolute top-0 right-0 mt-4 mr-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Cancel
          </button>
            <div className="mt-4 flex flex-col items-center justify-center">
              <Space direction="vertical">
                <div className="w-full">
                  <span className="text-[12px]">Amount:</span>
                  <Input
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.75)" }}
                    className="h-[45px] text-[12px] shadow-md"
                    value={formik.values.amount?.toLocaleString()}
                    placeholder="Income amount"
                    onChange={(e) => formik.setFieldValue("amount", Number(e.target.value.replace(/,/g, "")))}
                  />
                </div>
                <div className="w-full">
                  <span className="text-[12px]">Description:</span>
                  <Input
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.75)" }}
                    className="h-[45px] text-[12px] shadow-md"
                    value={formik.values.description}
                    placeholder="Income description"
                    onChange={(e) => formik.setFieldValue("description", e.target.value)}
                  />
                </div>
                <label htmlFor="email" className="mt-2 text-[12px]">
                  Category:
                </label>
                <Select
                  defaultValue="--------"
                  className="h-[40px] text-[12px] shadow-md w-full"
                  style={{ width: '100%' }}
                  onChange={(value) => formik.setFieldValue("category", value)}
                  options={Object.keys(filingCategoryMap)?.map(option => ({
                    label: filingCategoryMap[option],
                    value: option,
                  }))}
                />
                <label className="mt-2 text-[12px]">
                  Contributions:
                </label>
                <Select
                  mode="multiple"
                  className="h-[45px] text-[12px] shadow-md"
                  allowClear={true}
                  style={{ width: '100%' }}
                  placeholder="Select contributions"
                  defaultValue={[]}
                  onChange={(value: string[]) => formik.setFieldValue("contributions", [...value])}
                  options={contributionOptions.map(contr => ({label: contr, value: contr}))}
                />
                <div className="w-full">
                  <span className="text-[12px]">Date:</span>
                  <Input
                    type="date"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.75)" }}
                    className="h-[45px] text-[12px] shadow-md"
                    value={formik.values.date}
                    placeholder="Income amount"
                    onChange={(e) => formik.setFieldValue("date", e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="mt-2 bg-gray-100 h-[45px] space-x-2 w-full shadow-md flex items-center justify-center hover:bg-blue-100 transform transition duration-300 hover:scale-105"
                  disabled={formik.isSubmitting}
                  onClick={() => formik.handleSubmit()}
                >
                <span className="text-blue-900 font-bold text-[16px]">
                  {formik.isSubmitting ? "Submitting..." : "Submit"}
                </span>
              </button>
              </Space>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default FileIncome;
