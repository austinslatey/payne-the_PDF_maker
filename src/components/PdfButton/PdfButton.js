import React from 'react';
import Button from '@mui/material/Button';
import generatePdf from '../../utils/pdfGenerate';

function GeneratePdfButton() {
  const handleGeneratePdf = () => {
    generatePdf();
  };

  return (
    <Button
      variant="outlined"
      sx={{ my: 1, mx: 1.5 }}
      onClick={handleGeneratePdf}
    >
      Generate PDF
    </Button>
  );
}

export default GeneratePdfButton;