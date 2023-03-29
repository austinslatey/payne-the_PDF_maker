import React, { useState, useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas"
import InputToPdf from "../components/InputToPdf/InputToPdf";

export default function GeneratePdf({ data }) {
  const [imageUrl, setImageUrl] = useState("");

  const componentRef = useRef();

  const handleRenderPdf = async () => {
    const canvas = await html2canvas(componentRef.current);
    const dataUrl = canvas.toDataURL();

    setImageUrl(dataUrl);

    const doc = new jsPDF();

    // Add logo
    doc.addImage("https://github.com/austinslatey/RecipEase/blob/main/assets/images/newREADMEimg.jpg", "JPG", 10, 10, 50, 50);

    // Add company details
    doc.setFontSize(14);
    doc.text("Example Company", 80, 20);
    doc.setFontSize(12);
    doc.text("123 Main Street", 80, 30);
    doc.text("Anytown, USA 12345", 80, 35);
    doc.text("Phone: (123) 456-7890", 80, 40);
    doc.text("Email: info@example.com", 80, 45);

    // Add invoice details
    doc.setFontSize(16);
    doc.text("Invoice", 10, 80);
    doc.setFontSize(12);
    doc.text(`Invoice Number: ${data.invoiceNumber}`, 10, 90);
    doc.text(`Invoice Date: ${data.invoiceDate}`, 10, 95);

    // Add table headers
    doc.setFontSize(14);
    doc.text("Description", 10, 120);
    doc.text("Rate", 100, 120);
    doc.text("Qty", 140, 120);
    doc.text("Total", 170, 120);

    // Add table rows
    let y = 130;
    let subtotal = 0;
    data.items.forEach((item) => {
      doc.text(item.description, 10, y);
      doc.text(item.rate.toString(), 100, y);
      doc.text(item.qty.toString(), 140, y);
      doc.text(item.total.toString(), 170, y);
      y += 10;
      subtotal += item.total;
    });

    // Add subtotal
    doc.setFontSize(12);
    doc.text("Subtotal:", 140, y);
    doc.text(subtotal.toString(), 170, y);
    y += 10;

    // Add tax
    const taxRate = 0.1;
    const taxAmount = subtotal * taxRate;
    doc.text(`Tax (${(taxRate * 100).toFixed(0)}%):`, 140, y);
    doc.text(taxAmount.toFixed(2), 170, y);
    y += 10;

    // Add total
    const total = subtotal + taxAmount;
    doc.setFontSize(16);
    doc.text("Total:", 140, y);
    doc.text(total.toFixed(2), 170, y);

    doc.save("invoice.pdf");
  };

  return (
    <div>
      <button >Render PDF</button>
      <div ref={componentRef}>
        {<InputToPdf onClick={handleRenderPdf}/>}
      </div>
      {imageUrl && <img src={imageUrl} alt="Preview" />}
    </div>
  );
}
