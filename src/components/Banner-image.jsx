import React from "react";
import Image from "../assets/dlbc.png";

const BannerImage = () => {
  return (
    <div>
      <div className="banner">
        <img src={Image} alt="" style={{ width: "70%" }} />
      </div>
    </div>
  );
};

export default BannerImage;
