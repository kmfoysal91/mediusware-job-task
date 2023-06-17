import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ContactModal from "./components/ContactModal.jsx";
import Index from "./components/Index.jsx";
import Menu from "./components/Menu.jsx";
import Problem1 from "./components/Problem-1.jsx";
import Problem2 from "./components/Problem-2.jsx";

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/" element={<Menu />}>
          <Route path="problem-1" element={<Problem1 />} />
          <Route
            path="problem-2"
            element={
              <Problem2 modalOpen={modalOpen} setModalOpen={setModalOpen} />
            }
          />
          <Route
            path="/problem-2/all-contacts"
            element={
              <div className="d-flex justify-content-center align-items-center">
                <ContactModal
                  path="all-contacts"
                  basePath="contacts"
                  countryPath=""
                  btnText="All Contacts"
                  btnColor="btn-outline-primary"
                  modalOpen={modalOpen}
                  setModalOpen={setModalOpen}
                />
              </div>
            }
          />

          <Route
            path="/problem-2/us-contacts"
            element={
              <div className="d-flex justify-content-center align-items-center">
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
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
