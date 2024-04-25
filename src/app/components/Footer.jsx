import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="footer z-10 border-t bg-[#454544] border-yellow-50 border-l-transparent border-r-transparent text-white">
      <div className="container p-12 flex justify-center flex-col items-center">
        <Image className="rounded-xl my-2" src={"/logo2.svg"} alt="logo" width={100} height={100} />
        <p className="text-[#848666] text-center leading-tight text-sm chivo-mono-font">© All rights reserved 2024</p>
      </div>
    </footer>
  );
};

export default Footer;
