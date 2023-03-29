import React, { useState } from "react";
import Home from './components/pages/HomePage/HomePage'
import Input from './components/pages/InputPage/InputPage'
import AppBar from "./components/AppBar/AppBar";
import './index.css';

function App() {
    const [currentPage, setCurrentPage] = useState("Home");

    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
  
    const renderPage = () => {
      if (currentPage === "Home") {
        return <Home />;
      }  else {
        return <Input />;
      }
    };
  
    return (
      <div>
        <AppBar
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        /> 
        {renderPage()}
      </div>
    );
}

export default App;
