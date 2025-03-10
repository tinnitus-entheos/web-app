import React from "react";
import BaseLayoutComponent from "../../component/base/base-layout";
import { Navbar } from "../../component/base/navbar";
import FooterComponent from "../../component/base/footer";
import OtherProtocolsSection from "../../component/treatment-counseling/other-protocol";
import OtherTinnitusSection from "../../component/treatment-counseling/tinnitus-protocols";

const OtherProtocolsPage = () => {
  return (
    <BaseLayoutComponent>
      <Navbar />
      <section className="relative bg-gradient-to-r from-[#502888] to-[#2E847C] px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 pt-[200px] pb-32 text-white">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6">Other Protocols</h1>
        </div>
      </section>
      <OtherProtocolsSection />
      <OtherTinnitusSection />
      <FooterComponent />
    </BaseLayoutComponent>
  );
};

export default OtherProtocolsPage;
