"use client";

import Link from "next/link";
import { FooterProps } from "../types/interfaces";

const Footer = ({ currentYear }: FooterProps) => {
  return (
    <div className="text-xs font-light text-white opacity-50 text-center py-4">
      <p>
        สงวนลิขสิทธิ์{" "}
        <Link
          href="https://github.com/Pathumlnw"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline hover:opacity-80"
        >
          Pathumlnw
        </Link>{" "}
        © {currentYear}
      </p>
    </div>
  );
};

export default Footer;