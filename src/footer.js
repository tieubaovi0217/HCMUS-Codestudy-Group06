import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./footer.css";

function Footer() {
  return (
    <div id="footer" className="footer text-center text-lg-start bg-info">
      <div className="text-center p-3 text-secondary text-light">
        HCMUS - Software Engineering - 18CNTN - GROUP 06
        <br></br>© 2020 Copyright:
        <a className="text-warning" href="/">
          CodeStudy.vn
        </a>
      </div>
    </div>
  );
}

export default Footer;
