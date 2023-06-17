import React, { useEffect, useState } from "react";
import ContactModal from "./ContactModal";

const Problem2 = ({ modalOpen, setModalOpen }) => {
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <ContactModal
            path="all-contacts"
            basePath="contacts"
            countryPath=""
            btnText="All Contacts"
            btnColor="btn-outline-primary"
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
          />

          <ContactModal
            path="us-contacts"
            basePath="country-contacts"
            countryPath="United States"
            btnText="US Contacts"
            btnColor="btn-outline-warning"
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default Problem2;
