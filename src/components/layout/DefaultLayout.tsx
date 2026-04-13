import React from "react";
import Header from "./Header";
import Footer from "@/components/layout/Footer";

interface DefaultLayoutProps {
  children?: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div className="default-layout">
      <Header />
      <div className="content">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
