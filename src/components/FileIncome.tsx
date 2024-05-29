import { useFormik } from "formik";
import * as Yup from "yup";
import { styles } from "../styles";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fileIncome } from "@/data/api_calls";
import { yearsArray } from "@/data/utils";

const schema = Yup.object().shape({
  amount: Yup.string().required("Amount to file is required"),
  description: Yup.string().required("Income description is required"),
});

const FileIncome = (props: {user_id: string, country_id: string, setClickedNew: any}) => {
  const currentYear = new Date().getFullYear();
  const [isSuccess, setIsSucces] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      amount: 0,
      description: "",
      year: currentYear,
    },
    validationSchema: schema,
    onSubmit: async ({
      amount,
      description,
      year,
    }) => {
      try{
        // console.log(values, 'VALUESSS');
        // console.log(amount, description, year, 'AMONEIFEEDE')
        const filedIncome = await fileIncome({
          user_id: props.user_id,
          income: amount,
          description,
          year,
          country_id: props.country_id,
        });
        // console.log(filedIncome, 'FILED INCOMEEEE');
        setIsSucces(true);
        // console.log('BEFORE SET NEW')
        props.setClickedNew();
        // console.log('AFTER SET NEW')
      } catch (err) {
        setError(true);
      }
    },
  });

  useEffect(() => {
    if (isSuccess) {
      const message = `$Something` || "Successful!";
      toast.success(message, { duration: 5000 });
      //   refetch();
      formik.resetForm();
    }
    if (error) {
      // console.log(error)
      toast.error("Something went wrong", {duration: 5000})
    }
  }, [isSuccess, error]);

  const { errors, touched, values, setFieldValue, handleChange, handleSubmit } =
    formik;

  return (
    <>
      <div className="max-sm:min-h-[100vh] min-h-[70vh] flex flex-col justify-center sm:px-6 lg:px-8 z-[-100px] mt-10">
        <h1 className="text-[20px] text-center font-bold">
          File New Income
        </h1>
        <button
        onClick={() => props.setClickedNew(false)}
        className="absolute top-0 right-0 mt-4 mr-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
      >
        Cancel
      </button>
        <div className="mt-6 mx-[10px] sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-5 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="mt-6 mx-[10px] sm:mx-auto sm:w-full sm:max-w-md">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="description" className="text-[14.4px] text-black">
                    Description
                  </label>
                  <input
                    type="text"
                    id="description"
                    value={values.description}
                    onChange={handleChange}
                    className="w-full text-[14px] border rounded h-[34px] text-black px-2 outline-none mt-[4px]"
                    placeholder="Enter description"
                  />
                  {errors.description && touched.description && (
                    <span className="text-red-500 pt-2 block fade-in">
                      {errors.description}
                    </span>
                  )}
                </div>

                <div>
                  <label htmlFor="amount" className={`${styles.label}`}>
                    Amount
                  </label>
                  <input
                    type="number"
                    id="amount"
                    value={values.amount}
                    onChange={handleChange}
                    className={`${styles.input}`}
                    placeholder="Enter amount"
                  />
                  {errors.amount && touched.amount && (
                    <span className="text-red-500 pt-2 block fade-in">
                      {errors.amount}
                    </span>
                  )}
                </div>

                <div>
                  <label htmlFor="bank" className={`${styles.label}`}>
                    Select Year
                  </label>
                  <div className="mt-1">
                    <select
                      name="year"
                      id="year"
                      value={values.year}
                      onChange={handleChange}
                      className={`${styles.input}`}
                    >
                      <option value={values.year} className="">
                        {values.year}
                      </option>
                      {yearsArray(currentYear).filter(yearVal => yearVal !== values.year)?.map((option: any, idx: number) => (
                        <option key={idx} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="w-full text-center mt-5 flex justify-center item-center text-[14px]">
                  <button type="submit" className="flex w-2/6 h-3/6 justify-center gap-2 items-center relative cursor-pointer text-black bg-gray-400 hover:bg-sky-700 rounded-sm">
                    {"Submit"}
                  </button>
                </div>
                <br />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileIncome;
