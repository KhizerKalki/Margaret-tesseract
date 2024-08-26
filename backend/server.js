const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const pdf = require("pdf-parse");
const axios = require("axios");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const tesseract = require("node-tesseract-ocr");
dotenv.config();
const port = process.env.PORT || 3000;
app.use(cors());

const uploadsDir = path.join(__dirname, "PdfUploads");
const uploadsDirImg = path.join(__dirname, "ImgUploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
if (!fs.existsSync(uploadsDirImg)) {
  fs.mkdirSync(uploadsDirImg, { recursive: true });
}
async function parseGPTResponse(responseString) {
  try {
    const jsonResponse = JSON.parse(responseString);
    return jsonResponse;
  } catch (error) {
    console.error("Error parsing the response string to JSON:");
    return null;
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, uploadsDirImg);
    } else if (file.mimetype === "application/pdf") {
      cb(null, uploadsDir);
    } else {
      cb(new Error("Unsupported file type"), false);
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage,limits:{fileSize:10*1024*1024}, });

app.post("/uploadPDF", upload.single("pdfFile"), async (req, res) => {
  const pdfPath = req.file.path;
  try {
    const text = await extractTextFromPDF(pdfPath);
    const invoiceData = await queryOpenAI(text, "pdf");
    const parsedData = await parseGPTResponse(invoiceData);
    const responseMessage = processInvoiceData(parsedData);
    fs.unlinkSync(pdfPath);
    res.send(responseMessage);
  } catch (error) {
    console.error("Error processing PDF:");await unlinkAsync(pdfPath).catch(console.error);
    res.status(500).send("Error processing PDF");
  }
});

app.post("/uploadImage", upload.single("image"), async (req, res) => {
  const imageFilePath = req.file.path;
  try {
    const text = await extractTextFromImage(imageFilePath);
    const invoiceData = await queryOpenAI(text, "image");
    const parsedData = await parseGPTResponse(invoiceData);
    const responseMessage = processInvoiceData(parsedData);
    fs.unlinkSync(imageFilePath);
    res.send(responseMessage);
  } catch (error) {
    console.error("Error processing image:");await unlinkAsync(imageFilePath).catch(console.error);
    res.status(500).send("Internal Server Error");
  }
});

function extractTextFromPDF(pdfPath) {
  let dataBuffer = fs.readFileSync(pdfPath);
  return pdf(dataBuffer).then(function (data) {
    console.log(data.text);
    return data.text;
  });
}

function extractTextFromImage(imagePath) {
  const config = {
    lang: "eng",
    oem: 1,
    psm: 3,
  };
  return tesseract.recognize(imagePath, config);
}

async function queryOpenAI(text) {
  const apiKey = process.env.OPENAI_API_KEY;
  const url = "https://api.openai.com/v1/chat/completions";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  const prompt = `
  Extract the following data from the given text. 
  Format the keys without dashes or colons, and if a value is not present, use '0' for numerical fields and an empty string for text fields , use these as the labels for the data.

  general:
  basicSalary, hra, medicalAllowance, conveyanceAllowance, specialAllowance,
  otherAllowance, lta, mealAllowance, npsContribution, childrenEducationAllowance,
  hostelAllowance, washingAllowance, uniformAllowance, otherReimbursements,
  otherAllowances

  monthlySalaryDetails:
  grossAnnualSalaryOld, grossAnnualSalaryNew

  taxability Old Regime:
  grossAnnualSalary, nonTaxableAllowances, professionalTax, standardDeduction,
  hraExemption, ltaExemption, lossFromHouse, incomeFromHouse, incomeFromOther

  taxability New Regime:
  grossAnnualSalary, nonTaxableAllowances, professionalTax, standardDeduction,
  hraExemption, ltaExemption, lossFromHouse, incomeFromHouse, incomeFromOther

  investments:
  currentEmployerPf, previousEmployerPf, vpf, lip, ppf, cef, pensionFunds, fd,
  ulip, hlp, elss, nsc, stampDuty, otherInvestments, totalInvestments

  taxable Income Old Regime:
  incomeTax, rebate87a, balanceTax, surcharge, totalTax, eduCess, netAnnualTax,
  taxSavings

  taxable Income New Regime:
  incomeTax, rebate87a, balanceTax, surcharge, totalTax, eduCess, netAnnualTax,
  taxSavings

  form16Details:
  employeeName, employeeNo, pan, designation, financialYear, assessmentYear,
  form16Enclosed, form12BAEnclosed, taxableIncome, tax, signatureName, signatureDate
`;

  const data = {
    model: "gpt-4",
    messages: [
      { role: "system", content: prompt },
      { role: "user", content: text },
    ],
  };

  try {
    const response = await axios.post(url, data, { headers });
    let content = response.data.choices[0].message.content;
    console.log(content);
    return content;
  } catch (error) {
    console.error("Error calling OpenAI API:");
    return null;
  }
}

function processInvoiceData(invoiceData) {
  try {
    return {
      general: {
        basicSalary: invoiceData.basicSalary || 0,
        hra: invoiceData.hra || 0,
        medicalAllowance: invoiceData.medicalAllowance || 0,
        conveyanceAllowance: invoiceData.conveyanceAllowance || 0,
        specialAllowance: invoiceData.specialAllowance || 0,
        otherAllowance: invoiceData.otherAllowance || 0,
        lta: invoiceData.lta || 0,
        mealAllowance: invoiceData.mealAllowance || 0,
        npsContribution: invoiceData.npsContribution || 0,
        childrenEducationAllowance: invoiceData.childrenEducationAllowance || 0,
        hostelAllowance: invoiceData.hostelAllowance || 0,
        washingAllowance: invoiceData.washingAllowance || 0,
        uniformAllowance: invoiceData.uniformAllowance || 0,
        otherReimbursements: invoiceData.otherReimbursements || 0,
        otherAllowances: invoiceData.otherAllowances || 0,
      },
      monthlySalaryDetails: {
        grossAnnualSalaryOld: invoiceData.grossAnnualSalaryOld || 0,
        grossAnnualSalaryNew: invoiceData.grossAnnualSalaryNew || 0,
      },
      taxability: {
        oldRegime: {
          grossAnnualSalary: invoiceData.grossAnnualSalaryOld || 0,
          nonTaxableAllowances: invoiceData.nonTaxableAllowances || 0,
          professionalTax: invoiceData.professionalTax || 0,
          standardDeduction: invoiceData.standardDeduction || 0,
          hraExemption: invoiceData.hraExemption || 0,
          ltaExemption: invoiceData.ltaExemption || 0,
          lossFromHouse: invoiceData.lossFromHouse || 0,
          incomeFromHouse: invoiceData.incomeFromHouse || 0,
          incomeFromOther: invoiceData.incomeFromOther || 0,
        },
        newRegime: {
          grossAnnualSalary: invoiceData.grossAnnualSalaryNew || 0,
          nonTaxableAllowances: invoiceData.nonTaxableAllowances || 0,
          professionalTax: invoiceData.professionalTax || 0,
          standardDeduction: invoiceData.standardDeduction || 0,
          hraExemption: invoiceData.hraExemption || 0,
          ltaExemption: invoiceData.ltaExemption || 0,
          lossFromHouse: invoiceData.lossFromHouse || 0,
          incomeFromHouse: invoiceData.incomeFromHouse || 0,
          incomeFromOther: invoiceData.incomeFromOther || 0,
        },
      },
      investments: {
        currentEmployerPf: invoiceData.currentEmployerPf || 0,
        previousEmployerPf: invoiceData.previousEmployerPf || 0,
        vpf: invoiceData.vpf || 0,
        lip: invoiceData.lip || 0,
        ppf: invoiceData.ppf || 0,
        cef: invoiceData.cef || 0,
        pensionFunds: invoiceData.pensionFunds || 0,
        fd: invoiceData.fd || 0,
        ulip: invoiceData.ulip || 0,
        hlp: invoiceData.hlp || 0,
        elss: invoiceData.elss || 0,
        nsc: invoiceData.nsc || 0,
        stampDuty: invoiceData.stampDuty || 0,
        otherInvestments: invoiceData.otherInvestments || 0,
        totalInvestments: invoiceData.totalInvestments || 0,
      },
      taxableIncome: {
        oldRegime: {
          incomeTax: invoiceData.incomeTax || 0,
          rebate87a: invoiceData.rebate87a || 0,
          balanceTax: invoiceData.balanceTax || 0,
          surcharge: invoiceData.surcharge || 0,
          totalTax: invoiceData.totalTax || 0,
          eduCess: invoiceData.eduCess || 0,
          netAnnualTax: invoiceData.netAnnualTax || 0,
          taxSavings: invoiceData.taxSavings || 0,
        },
        newRegime: {
          incomeTax: invoiceData.incomeTax || 0,
          rebate87a: invoiceData.rebate87a || 0,
          balanceTax: invoiceData.balanceTax || 0,
          surcharge: invoiceData.surcharge || 0,
          totalTax: invoiceData.totalTax || 0,
          eduCess: invoiceData.eduCess || 0,
          netAnnualTax: invoiceData.netAnnualTax || 0,
          taxSavings: invoiceData.taxSavings || 0,
        },
      },
      form16Details: {
        employeeName: invoiceData.employeeName || "",
        employeeNo: invoiceData.employeeNo || "",
        pan: invoiceData.pan || "",
        designation: invoiceData.designation || "",
        financialYear: invoiceData.financialYear || "",
        assessmentYear: invoiceData.assessmentYear || "",
        form16Enclosed: invoiceData.form16Enclosed || "",
        form12BAEnclosed: invoiceData.form12BAEnclosed || "",
        taxableIncome: invoiceData.taxableIncome || "",
        tax: invoiceData.tax || "",
        signatureName: invoiceData.signatureName || "",
        signatureDate: invoiceData.signatureDate || "",
      },
    };
  } catch (error) {
    console.error("Error fetching data:");
    return null;
  }
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
