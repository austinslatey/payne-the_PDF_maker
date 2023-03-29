import React, { useState } from "react";
import Home from './components/pages/HomePage/HomePage'
import Input from './components/pages/InputPage/InputPage'
import AppBar from "./components/AppBar/AppBar";
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState("HomePage");

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  return (
    <div>
      <AppBar
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
      {currentPage === "HomePage" ? (
        <Home />
      ) : (
        <Input />
      )}
    </div>
  );
}

export default App;
