import debounce from "lodash/debounce";
import React, { useCallback, useEffect, useState } from "react";
import { Card, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DetailsModal from "./DetailsModal";

const ContactModal = ({
  btnText,
  btnColor,
  basePath,
  countryPath,
  modalOpen,
  setModalOpen,
  path,
}) => {
  // Required State
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageNo, setPageNo] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [searchText, setSearchText] = useState("");
  const [filterContacts, setFilterContacts] = useState(null);
  const [showAllContacts, setShowAllContacts] = useState(false);
  const [showUSContacts, setShowUSContacts] = useState(false);

  const navigate = useNavigate();
  const loacation = useLocation();

  const handleClose = () => {
    setModalOpen(false);
    navigate("/problem-2"); // Go back to the previous route
  };

  const handleShow = () => {
    setModalOpen(true);
  };

  // Data Fetching

  useEffect(() => {
    let url = `https://contact.mediusware.com/api/${basePath}/${countryPath}/?format=json&page=${pageNo}&search=${searchText}`;

    if (showAllContacts) {
      url = `https://contact.mediusware.com/api/contacts/?format=json&page=${pageNo}&search=${searchText}`;
    } else if (showUSContacts) {
      url = `https://contact.mediusware.com/api/country-contacts/United States/?format=json&page=${pageNo}&search=${searchText}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((err) => {
        setError(err);
        console.log(err.message);
      })
      .finally(() => {
        setLoading(false);
      });

    !modalOpen && navigate("/problem-2");
  }, [pageNo, showAllContacts, showUSContacts, searchText]);

  // Initialize filterContacts with the original data
  useEffect(() => {
    setFilterContacts(data);
  }, [data]);

  // Reset the pageNo state when the route changes
  useEffect(() => {
    setPageNo(1);
  }, [loacation.pathname]);

  // For Load more pagination
  const loadMore = () => setPageNo(pageNo + 1);

  // Fiter Even Id contacts
  const filterEvenIdContacts = (event) => {
    if (event.target.checked) {
      const evenIdContacts = data?.results?.filter(
        (contact) => contact.id % 2 === 0
      );
      setFilterContacts({ results: evenIdContacts });
    } else {
      setFilterContacts(data);
    }
  };

  // Delay filter contacts
  const delayFilterContacts = useCallback(
    debounce((input) => {
      setSearchText(input);
      setPageNo(1);
    }, 1500),
    [data]
  );

  const handleSearchInputChange = (event) => {
    const input = event.target.value;
    setSearchInput(input);
    delayFilterContacts(input);
  };

  // Get Instant Search Results
  const handleSearchInputKeyDown = (event) => {
    if (event.key === "Enter") {
      setSearchText(event.target.value);
    }
  };

  return (
    <>
      <Link
        to={`/problem-2/${path}`}
        className={`btn btn-lg ${btnColor}`}
        onClick={handleShow}
      >
        {btnText}
      </Link>

      <Modal centered show={modalOpen} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>{btnText}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-4">
            <Col>
              <Form.Control
                className="rounded-pill py-2 px-4 m-auto w-75"
                type="text"
                placeholder="Search by phone number"
                value={searchInput}
                onChange={handleSearchInputChange}
                onKeyDown={handleSearchInputKeyDown}
              />
            </Col>
          </Row>
          <Row>
            {loading && (
              <div className="d-flex justify-content-center align-items-center">
                <Spinner animation="grow" variant="warning" />
              </div>
            )}
            {filterContacts?.results?.map((contact) => {
              return (
                <Col
                  xs="12"
                  sm="6"
                  lg="4"
                  xl="3"
                  className="mb-4"
                  key={contact?.id}
                >
                  <Card>
                    <Card.Body>
                      <Card.Title className="d-flex align-items-center gap-3 mb-3">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                            stroke="#292D32"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M7.99998 3H8.99998C7.04998 8.84 7.04998 15.16 8.99998 21H7.99998"
                            stroke="#292D32"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M15 3C16.95 8.84 16.95 15.16 15 21"
                            stroke="#292D32"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M3 16V15C8.84 16.95 15.16 16.95 21 15V16"
                            stroke="#292D32"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M3 9.0001C8.84 7.0501 15.16 7.0501 21 9.0001"
                            stroke="#292D32"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        {contact?.country?.name}
                      </Card.Title>
                      <Card.Subtitle className="mb-3 text-muted d-flex align-items-center gap-2">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21.97 18.33C21.97 18.69 21.89 19.06 21.72 19.42C21.55 19.78 21.33 20.12 21.04 20.44C20.55 20.98 20.01 21.37 19.4 21.62C18.8 21.87 18.15 22 17.45 22C16.43 22 15.34 21.76 14.19 21.27C13.04 20.78 11.89 20.12 10.75 19.29C9.6 18.45 8.51 17.52 7.47 16.49C6.44 15.45 5.51 14.36 4.68 13.22C3.86 12.08 3.2 10.94 2.72 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C11.27 13.75 11.79 14.24 12.32 14.69C12.84 15.13 13.27 15.43 13.61 15.61C13.66 15.63 13.72 15.66 13.79 15.69C13.87 15.72 13.95 15.73 14.04 15.73C14.21 15.73 14.34 15.67 14.45 15.56L15.21 14.81C15.46 14.56 15.7 14.37 15.93 14.25C16.16 14.11 16.39 14.04 16.64 14.04C16.83 14.04 17.03 14.08 17.25 14.17C17.47 14.26 17.7 14.39 17.95 14.56L21.26 16.91C21.52 17.09 21.7 17.3 21.81 17.55C21.91 17.8 21.97 18.05 21.97 18.33Z"
                            stroke="#292D32"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                          />
                        </svg>
                        {contact?.phone}
                      </Card.Subtitle>
                      <h5>{contact?.id}</h5>
                      <DetailsModal contact={contact} />
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}

            <div>
              {filterContacts?.results?.length < 1 && "No Data Available"}
            </div>
            <div className="d-flex justify-content-center mt-4">
              {filterContacts?.results?.length > 1 ? (
                <button
                  className="btn btn-warning rounded-pill px-4 p-2"
                  onClick={loadMore}
                >
                  {loading ? (
                    <Spinner animation="border" variant="info" />
                  ) : (
                    " Load More"
                  )}
                </button>
              ) : (
                "No Data Available"
              )}
            </div>
          </Row>
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <Form.Check
            id={`default-check-box`}
            label={`Only even`}
            onChange={filterEvenIdContacts}
          />

          <div className="d-flex gap-3">
            <Link
              to={`/problem-2/all-contacts`}
              className="btn"
              style={{ color: " #46139f", borderColor: "#46139f" }}
              onClick={() => {
                setShowAllContacts(true);
                setShowUSContacts(false);
              }}
            >
              All Contacts
            </Link>
            <Link
              to={`/problem-2/us-contacts`}
              className="btn"
              style={{ color: " #ff7f50", borderColor: "#ff7f50" }}
              onClick={() => {
                setShowAllContacts(false);
                setShowUSContacts(true);
              }}
            >
              US Contacts
            </Link>
            <button
              className="btn"
              style={{ borderColor: "#46139f" }}
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ContactModal;
