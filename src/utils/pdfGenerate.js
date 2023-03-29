import React from "react";
import { jsPDF } from "jspdf";

export default function GeneratePdf() {
  const handleRenderPdf = () => {
    const doc = new jsPDF();

    // Add logo
    doc.addImage("https://www.example.com/logo.png", "PNG", 10, 10, 50, 50);

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
    doc.text("Invoice Number: INV-001", 10, 90);
    doc.text("Invoice Date: 01/01/2022", 10, 95);

    // Add table headers
    doc.setFontSize(14);
    doc.text("Description", 10, 120);
    doc.text("Rate", 100, 120);
    doc.text("Qty", 140, 120);
    doc.text("Total", 170, 120);

    // Add table rows
    const items = [
      {
        description: "Item 1",
        rate: 10,
        qty: 2,
        total: 20,
      },
      {
        description: "Item 2",
        rate: 20,
        qty: 1,
        total: 20,
      },
    ];
    let y = 130;
    let subtotal = 0;
    items.forEach((item) => {
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
      <button onClick={handleRenderPdf}>Render PDF</button>
    </div>
  );
}
