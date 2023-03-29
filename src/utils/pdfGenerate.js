import React, { useState, useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import InputPage from "../components/pages/InputPage/InputPage";

export default function GeneratePdf() {
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform some action with the form data here
  };
  const handleQuantityChange = (event) => {
    event.preventDefault();
    // Perform some action with the form data here
    setPrice(event.target.value);
  };

  const handlePriceChange = (event) => {
    event.preventDefault();
    // Perform some action with the form data here
    setQuantity(event.target.value);
  };

  const componentRef = useRef();

  const handleRenderPdf = async () => {
    const canvas = await html2canvas(componentRef.current);
    const dataUrl = canvas.toDataURL();

    setImageUrl(dataUrl);

    const doc = new jsPDF();

    // // Add logo
    // doc.addImage(
    //   "https://github.com/austinslatey/RecipEase/blob/main/assets/images/newREADMEimg.jpg",
    //   "JPG",
    //   10,
    //   10,
    //   50,
    //   50
    // );

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
    doc.text(`Invoice Number: 001`, 10, 90);
    doc.text(`Invoice Date: ${new Date().toLocaleDateString()}`, 10, 95);

    // Add table headers
    doc.setFontSize(14);
    doc.text("Description", 10, 120);
    doc.text("Rate", 100, 120);
    doc.text("Qty", 140, 120);
    doc.text("Total", 170, 120);

    // Add table rows
    let y = 130;
    const rate = parseFloat(price);
    const qty = parseFloat(quantity);
    const total = rate * qty;
    doc.text("Product", 10, y);
    doc.text(rate.toFixed(2).toString(), 100, y);
    doc.text(qty.toFixed(2).toString(), 140, y);
    doc.text(total.toFixed(2).toString(), 170, y);
    y += 10;

    // Add subtotal
    doc.setFontSize(12);
    doc.text("Subtotal:", 140, y);
    doc.text(total.toFixed(2).toString(), 170, y);
    y += 10;

    // Add tax
    const taxRate = 0.1;
    const taxAmount = total * taxRate;
    doc.text(`Tax (${(taxRate * 100).toFixed(0)}%):`, 140, y);
    doc.text(taxAmount.toFixed(2).toString(), 170, y);
    y += 10;

    // Add total
    const grandTotal = total + taxAmount;
    doc.setFontSize(16);
    doc.text("Total:", 140, y);
    doc.text(grandTotal.toFixed(2).toString(), 170, y);

    doc.save("invoice.pdf");
  };
  return (
    <div>
      <button onClick={handleRenderPdf}>Render PDF</button>
      {!imageUrl ? (
        <div ref={componentRef}>
          <InputPage
            price={price}
            quantity={quantity}
            onSubmit={handleSubmit}
            onPriceChange={handlePriceChange}
            onQuantityChange={handleQuantityChange}
          />
        </div>
      ) : (
        console.log('deezNutz')
      )}
    </div>
  );
      }