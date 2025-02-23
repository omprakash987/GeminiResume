import PDFParser from "pdf2json";

export function extractTextFromPdf(pdfBuffer) {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", (err) => {
      console.error("Error parsing PDF:", err);
      reject(err);
    });

    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      console.log("pdf parser data  : ", pdfData)
      let extractedText = "";
  
      pdfData.Pages.forEach((page) => {
        page.Texts.forEach((textItem) => {
          textItem.R.forEach((t) => {
            extractedText += decodeURIComponent(t.T) + " ";
          });
        });
        extractedText += "\n";
      });
      resolve(extractedText);
    });

    pdfParser.parseBuffer(pdfBuffer);
  });
}
