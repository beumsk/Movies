import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Container from "@mui/material/Container";
import TopBar from "./TopBar";
import Footer from "./Footer";
import ScrollTop from "./ScrollTop";

export default function Layout({ children }) {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState("");

  const handleOnSubmitSearch = (e) => {
    e.preventDefault();
    if (searchTerm.length >= 3) {
      history.push("/search/" + searchTerm);
    }
  };

  const handleOnChangeSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="App">
      <TopBar
        handleOnSubmitSearch={handleOnSubmitSearch}
        handleOnChangeSearch={handleOnChangeSearch}
        searchTerm={searchTerm}
      />
      <main>
        <Container>{children}</Container>
      </main>
      <Footer />
      <ScrollTop />
    </div>
  );
}
