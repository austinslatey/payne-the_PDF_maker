import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

function InputToPdf() {
  const [text, setText] = useState('');

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleConvertClick = () => {
    const doc = new jsPDF();
    doc.text(text, 10, 10);
    doc.save('text.pdf');
  };

  return (
    <div>
      <input type="text" value={text} onChange={handleTextChange} />
      <button onClick={handleConvertClick}>Convert to PDF</button>
    </div>
  );
}

export default InputToPdf;