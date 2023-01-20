// import React, { useState } from "react";
import Home from "./pages/Home.js";
import { Route, Routes } from "react-router-dom";
import Student from "./pages/Student.js";
import NotFound from "./pages/NotFound.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:name" element={<Student />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}
export default App;
