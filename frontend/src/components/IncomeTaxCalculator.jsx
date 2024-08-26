import React, { useState } from "react";
import axios from "axios";

function IncomeTaxCalculator() {
  const sampleData = {
    general: {
      basicSalary: 0,
      hra: 0,
      medicalAllowance: 0,
      conveyanceAllowance: 0,
      specialAllowance: 0,
      otherAllowance: 0,
      lta: 0,
      mealAllowance: 0,
      npsContribution: 0,
      childrenEducationAllowance: 0,
      hostelAllowance: 0,
      washingAllowance: 0,
      uniformAllowance: 0,
      otherReimbursements: 0,
      otherAllowances: 0,
    },
    monthlySalaryDetails: {
      grossAnnualSalaryOld: 0,
      grossAnnualSalaryNew: 0,
    },
    taxability: {
      oldRegime: {
        grossAnnualSalary: 0,
        nonTaxableAllowances: 0,
        professionalTax: 0,
        standardDeduction: 0,
        hraExemption: 0,
        ltaExemption: 0,
        lossFromHouse: 0,
        incomeFromHouse: 0,
        incomeFromOther: 0,
      },
      newRegime: {
        grossAnnualSalary: 0,
        nonTaxableAllowances: 0,
        professionalTax: 0,
        standardDeduction: 0,
        hraExemption: 0,
        ltaExemption: 0,
        lossFromHouse: 0,
        incomeFromHouse: 0,
        incomeFromOther: 0,
      },
    },
    investments: {
      currentEmployerPf: 0,
      previousEmployerPf: 0,
      vpf: 0,
      lip: 0,
      ppf: 0,
      cef: 0,
      pensionFunds: 0,
      fd: 0,
      ulip: 0,
      hlp: 0,
      elss: 0,
      nsc: 0,
      stampDuty: 0,
      otherInvestments: 0,
      totalInvestments: 0,
    },
    taxableIncome: {
      oldRegime: {
        incomeTax: 0,
        rebate87a: 0,
        balanceTax: 0,
        surcharge: 0,
        totalTax: 0,
        eduCess: 0,
        netAnnualTax: 0,
        taxSavings: 0,
      },
      newRegime: {
        incomeTax: 0,
        rebate87a: 0,
        balanceTax: 0,
        surcharge: 0,
        totalTax: 0,
        eduCess: 0,
        netAnnualTax: 0,
        taxSavings: 0,
      },
    },
    form16Details: {
      employeeName: "",
      employeeNo: "",
      pan: "",
      designation: "",
      financialYear: "",
      assessmentYear: "",
      form16Enclosed: "",
      form12BAEnclosed: "",
      taxableIncome: "",
      tax: "",
      signatureName: "",
      signatureDate: "",
    },
  };
  const [inputs, setInputs] = useState(sampleData);
  const [showTables, setShowTables] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);

  const BottomGradient = () => {
    return (
      <>
        <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
      </>
    );
  };
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setError("");
  };
  const uploadFile = async () => {
    setDataFetched(false);
    setLoading(true);
    setError("");
    const formData = new FormData();
    const fieldName =
      selectedFile.type === "application/pdf" ? "pdfFile" : "image";
    const endpoint =
      selectedFile.type === "application/pdf" ? "uploadPDF" : "uploadImage";

    formData.append(fieldName, selectedFile);

    try {
      const response = await axios.post(
        `https://b4d4-2405-201-3023-782e-59a5-8ea7-5f46-c976.ngrok-free.app/${endpoint}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(response.data);
      setInputs(response.data);
      setError("");
      setDataFetched(true);
    } catch (error) {
      console.error("Error:", error);
      setError(
        error.response?.data?.error ||
          "The document is not a form 16.Please try again."
      );
      return;
    } finally {
      setLoading(false);
      setShowTables(true);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError("Please select a file.");
      return;
    }
    await uploadFile();
  };

  const handleChange = (section, key, value) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [section]: {
        ...prevInputs[section],
        [key]: value,
      },
    }));
  };

  const calculateSum = (section) => {
    return Object.values(inputs[section] || {})
      .filter((value) => !isNaN(value) && value !== "")
      .reduce((sum, value) => sum + parseFloat(value), 0)
      .toFixed(2);
  };

  const calculateIncomeFromSalary = (regime) => {
    const regimeData = inputs.taxability?.[regime] || {};
    const {
      grossAnnualSalary = 0,
      nonTaxableAllowances = 0,
      professionalTax = 0,
      standardDeduction = 0,
      hraExemption = 0,
      ltaExemption = 0,
      lossFromHouse = 0,
      incomeFromHouse = 0,
      incomeFromOther = 0,
    } = regimeData;

    return (
      grossAnnualSalary -
      nonTaxableAllowances -
      professionalTax -
      standardDeduction -
      hraExemption -
      ltaExemption -
      lossFromHouse +
      incomeFromHouse +
      incomeFromOther
    );
  };

  const capitalizeFirstLetter = (string) => {
    return (
      string.charAt(0).toUpperCase() +
      string.slice(1).replace(/([A-Z])/g, " $1")
    );
  };

  return (
    <div className="font-sans text-gray-800 p-5">
      <div className="flex justify-center m-5">
        {loading ? (
          <div>
            <div className="flex-col gap-4 w-full flex items-center justify-center">
              <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
                <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
              </div>
            </div>
            <p>Loading</p>
          </div>
        ) : (
          <div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input type="file" onChange={handleFileChange} />
            <button
              className="btn"
              onClick={handleSubmit}
              style={{ marginTop: "10px" }}
            >
              Upload
            </button>
            <BottomGradient />
          </div>
        )}
      </div>

      {showTables && dataFetched && (
        <div className="container mx-auto max-w-5xl p-5 bg-white shadow-lg">
          <h1 className="text-center mb-5 text-gray-600">
            Monthly Salary Details 2023 - 2024
          </h1>
          <table className="w-full border-collapse mb-5">
            <thead>
              <tr>
                <th className="border p-2 text-left bg-gray-700 text-white font-bold">
                  General
                </th>
                <th className="border p-2 text-left bg-gray-700 text-white font-bold"></th>
                <th className="border p-2 text-left bg-gray-700 text-white font-bold">
                  Monthly Salary Details 2023 - 2024
                </th>
                <th className="border p-2 text-left bg-gray-700 text-white font-bold">
                  DELHI
                </th>
              </tr>
            </thead>
            <tbody>
              {/* General Section */}
              {Object.keys(sampleData.general).map((key) => (
                <tr key={key}>
                  <td className="border p-2">{capitalizeFirstLetter(key)}</td>
                  <td className="border p-2">
                    <input
                      type="text"
                      value={inputs.general?.[key]}
                      onChange={(e) =>
                        handleChange("general", key, e.target.value)
                      }
                      className="w-full"
                    />
                  </td>
                  <td className="border p-2"></td>{" "}
                  <td className="border p-2"></td>{" "}
                </tr>
              ))}

              {/* Monthly Salary Details Section */}
              {Object.keys(sampleData.monthlySalaryDetails).map((key) => (
                <tr key={key}>
                  <td className="border p-2"></td>{" "}
                  {/* Empty column for General */}
                  <td className="border p-2"></td>{" "}
                  {/* Empty column for General */}
                  <td className="border p-2">
                    <input
                      type="text"
                      value={inputs.monthlySalaryDetails?.[key]}
                      onChange={(e) =>
                        handleChange(
                          "monthlySalaryDetails",
                          key,
                          e.target.value
                        )
                      }
                      className="w-full"
                    />
                  </td>
                  <td className="border p-2"></td>{" "}
                  {/* Empty column for DELHI */}
                </tr>
              ))}

              <tr className="bg-gray-100 font-bold text-right">
                <td colSpan="3" className="p-2">
                  Total Monthly Gross Salary:
                </td>
                <td className="p-2 text-center text-lg text-gray-700">
                  {calculateSum("general")}
                </td>
              </tr>
            </tbody>
          </table>

          <h1 className="text-center mb-5 text-gray-600">
            Taxability & Calculation as per Old and New Tax Regime
          </h1>
          <table className="w-full border-collapse mb-5">
            <thead>
              <tr>
                <th className="border p-2 text-left bg-gray-700 text-white font-bold">
                  Old Regime
                </th>
                <th className="border p-2 text-left bg-gray-700 text-white font-bold"></th>
                <th className="border p-2 text-left bg-gray-700 text-white font-bold">
                  New Regime
                </th>
                <th className="border p-2 text-left bg-gray-700 text-white font-bold"></th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(sampleData.taxability.oldRegime).map((key) => (
                <tr key={key}>
                  <td className="border p-2">{capitalizeFirstLetter(key)}</td>
                  <td className="border p-2">
                    <input
                      type="text"
                      value={inputs.taxability.oldRegime?.[key]}
                      onChange={(e) =>
                        handleChange(
                          "taxability",
                          {
                            ...inputs.taxability,
                            oldRegime: {
                              ...inputs.taxability?.oldRegime,
                              [key]: e.target.value,
                            },
                          },
                          "oldRegime"
                        )
                      }
                      className="w-full"
                    />
                  </td>
                  <td className="border p-2">{capitalizeFirstLetter(key)}</td>
                  <td className="border p-2">
                    <input
                      type="text"
                      value={inputs.taxability.newRegime?.[key]}
                      onChange={(e) =>
                        handleChange(
                          "taxability",
                          {
                            ...inputs.taxability,
                            newRegime: {
                              ...inputs.taxability?.newRegime,
                              [key]: e.target.value,
                            },
                          },
                          "newRegime"
                        )
                      }
                      className="w-full"
                    />
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-100 font-bold text-right">
                <td className="p-2">Income from Salary:</td>
                <td className="p-2">
                  {calculateIncomeFromSalary("oldRegime")}
                </td>
                <td className="p-2">Income from Salary:</td>
                <td className="p-2">
                  {calculateIncomeFromSalary("newRegime")}
                </td>
              </tr>
            </tbody>
          </table>

          <h1 className="text-center mb-5 text-gray-600">
            Taxable Income as per Old and New Tax Regime
          </h1>
          <table className="w-full border-collapse mb-5">
            <thead>
              <tr>
                <th className="border p-2 text-left bg-gray-700 text-white font-bold">
                  Old Regime
                </th>
                <th className="border p-2 text-left bg-gray-700 text-white font-bold"></th>
                <th className="border p-2 text-left bg-gray-700 text-white font-bold">
                  New Regime
                </th>
                <th className="border p-2 text-left bg-gray-700 text-white font-bold"></th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(sampleData.taxableIncome.oldRegime).map((key) => (
                <tr key={key}>
                  <td className="border p-2">{capitalizeFirstLetter(key)}</td>
                  <td className="border p-2">
                    <input
                      type="text"
                      value={inputs.taxableIncome.oldRegime?.[key]}
                      onChange={(e) =>
                        handleChange(
                          "taxableIncome",
                          {
                            ...inputs.taxableIncome,
                            oldRegime: {
                              ...inputs.taxableIncome?.oldRegime,
                              [key]: e.target.value,
                            },
                          },
                          "oldRegime"
                        )
                      }
                      className="w-full"
                    />
                  </td>
                  <td className="border p-2">{capitalizeFirstLetter(key)}</td>
                  <td className="border p-2">
                    <input
                      type="text"
                      value={inputs.taxableIncome.newRegime?.[key]}
                      onChange={(e) =>
                        handleChange(
                          "taxableIncome",
                          {
                            ...inputs.taxableIncome,
                            newRegime: {
                              ...inputs.taxableIncome?.newRegime,
                              [key]: e.target.value,
                            },
                          },
                          "newRegime"
                        )
                      }
                      className="w-full"
                    />
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-100 font-bold text-right">
                <td className="p-2">Net Annual Tax:</td>
                <td className="p-2">
                  {calculateSum("taxableIncome.oldRegime")}
                </td>
                <td className="p-2">Net Annual Tax:</td>
                <td className="p-2">
                  {calculateSum("taxableIncome.newRegime")}
                </td>
              </tr>
            </tbody>
          </table>

          <h1 className="text-center mb-5 text-gray-600">Form 16 Details</h1>
          <div className="border p-5 bg-white shadow rounded">
            <table className="w-full border-collapse mb-5">
              <tbody>
                {Object.keys(sampleData.form16Details).map((key) => (
                  <tr key={key}>
                    <td className="border p-2 font-bold text-left">
                      {capitalizeFirstLetter(key)}
                    </td>
                    <td className="border p-2 text-left">
                      <input
                        type="text"
                        value={inputs.form16Details?.[key]}
                        onChange={(e) =>
                          handleChange("form16Details", key, e.target.value)
                        }
                        className="w-full"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-5">
              <p className="text-gray-600 text-sm">
                <strong>Signature Details</strong>
              </p>
              <p className="text-gray-600 text-sm">
                This form has been signed and certified using a Digital
                Signature Certificate as specified under section 119 of the
                income-tax Act, 1961. (Please refer circular No.2/2007, dated
                21-5-2007).
              </p>
              <p className="text-gray-600 text-sm mt-3">
                The Digital Signature of the signatory has been affixed below.
                To see the details and validate the signature, you should click
                on the signature.
              </p>
            </div>

            <div className="mt-5 text-center">
              <p className="text-gray-600 text-sm font-bold">
                Caution: Please do not attempt to modify / tamper with your Form
                16. Any alteration will render the same invalid.
              </p>
              <p className="text-gray-600 text-sm">
                Digitally Signed by {inputs.form16Details?.signatureName}
              </p>
              <p className="text-gray-600 text-sm">
                Date: {inputs.form16Details?.signatureDate}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default IncomeTaxCalculator;
