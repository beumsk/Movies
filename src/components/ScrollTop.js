import React, { useState } from "react";
import Button from "@mui/material/Button";

const ScrollTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <Button
      onClick={scrollToTop}
      variant="contained"
      sx={{
        display: visible ? "inline" : "none",
        position: "fixed",
        bottom: "10px",
        right: "10px",
        zIndex: "100",
        minWidth: "40px"
      }}
    >
      ▲
    </Button>
  );
};

export default ScrollTop;
