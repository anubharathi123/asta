import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./verifydoc.css";
import DropDownArrow from '../../assets/images/dropdown-arrow.png';

const App = () => {
  const [documents] = useState([
    {
      declarationNumber: "1234567890123",
      FileName: "IN-345",
      updatedDate: "2024-12-15",
      documentType: "Invoice",
      actions: "",
      downloadUrl: "/downloads/sample1.pdf",
    },
    {
      declarationNumber: "9876543210123",
      FileName: "DE-446",
      updatedDate: "2024-12-10",
      documentType: "Declaration",
      actions: "",
      downloadUrl: "/downloads/sample2.docx",
    },
    {
      declarationNumber: "1112233445566",
      FileName: "PL-12",
      updatedDate: "2024-12-08",
      documentType: "Packing List",
      actions: "",
      downloadUrl: "/downloads/sample3.xlsx",
    },
  ]);

  const [filteredDocuments, setFilteredDocuments] = useState(documents);
  const [filterDocType, setFilterDocType] = useState("All");
  const [filterDate, setFilterDate] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isDocTypeDropdownOpen, setIsDocTypeDropdownOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [declarationInput, setDeclarationInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const toggleCalendar = () => setIsCalendarOpen(!isCalendarOpen);
  const toggleDocTypeDropdown = () => setIsDocTypeDropdownOpen(!isDocTypeDropdownOpen);

  const applyFilters = () => {
    let filtered = [...documents];

    // Filter by Document Type
    if (filterDocType !== "All") {
      filtered = filtered.filter((doc) => doc.documentType === filterDocType);
    }

    // Filter by Updated Date
    if (filterDate) {
      const formattedDate = filterDate.toISOString().split("T")[0];
      filtered = filtered.filter((doc) => doc.updatedDate === formattedDate);
    }

    // Filter by Declaration Number
    if (declarationInput) {
      filtered = filtered.filter((doc) => doc.declarationNumber.includes(declarationInput));
    }

    setFilteredDocuments(filtered);
  };

  const handleDateChange = (date) => {
    setFilterDate(date);
    setIsCalendarOpen(false);
    applyFilters();
  };

  const handleDocTypeChange = (docType) => {
    setFilterDocType(docType);
    setIsDocTypeDropdownOpen(false);
    applyFilters();
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setDeclarationInput(inputValue);

    if (inputValue) {
      const matchingSuggestions = documents
        .filter((doc) => doc.declarationNumber.startsWith(inputValue))
        .map((doc) => doc.declarationNumber);

      setSuggestions(matchingSuggestions);
    } else {
      setSuggestions([]);
    }

    applyFilters();
  };

  const selectSuggestion = (suggestion) => {
    setDeclarationInput(suggestion);
    setSuggestions([]);
    applyFilters();
  };

  const handleCheckboxChange = (index) => {
    const updatedSelectedRows = [...selectedRows];
    if (updatedSelectedRows.includes(index)) {
      updatedSelectedRows.splice(updatedSelectedRows.indexOf(index), 1);
    } else {
      updatedSelectedRows.push(index);
    }
    setSelectedRows(updatedSelectedRows);
  };

  const handleAction = (actionType) => {
    const updatedDocuments = filteredDocuments.filter((_, index) => {
      if (selectedRows.includes(index)) {
        return false;
      }
      return true;
    });

    setFilteredDocuments(updatedDocuments);
    setSelectedRows([]);
  };

  const resetAction = (index) => {
    const updatedDocuments = [...filteredDocuments];
    updatedDocuments[index].actions = "";
    setFilteredDocuments(updatedDocuments);
  };

  return (
    <div className="verify-container">
      <h2>Verify Document</h2>

      {/* Declaration Number Search */}
      <div className="declaration-number">
        <label className="declaration_no">
          <b>Declaration Number: </b>
        </label>
        <input
          id="declarationNumber"
          type="text"
          value={declarationInput}
          onChange={handleInputChange}
          placeholder="Enter 13-digit DecNum"
        />
        <button className="approvebtn1" onClick={() => handleAction("Approved")} style={{ marginRight: "10px" }}>
          Approve
        </button>
        <button className="rejectbtn1" onClick={() => handleAction("Rejected")}>
          Reject
        </button>

        {/* Suggestion Box */}
        {suggestions.length > 0 && (
          <ul className="suggestion-box">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => selectSuggestion(suggestion)}
                className="suggestion-item"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Document Table */}
      <div className="form-section">
        <table className="document-table">
          <thead>
            <tr>
              <th>Declaration Number</th>
              <th>File Name</th>
              <th>
                Updated Date
                <button className="calendarbtn" onClick={toggleCalendar}>
                  📅
                </button>
                {isCalendarOpen && (
                  <div style={{ position: "absolute", zIndex: 1000 }}>
                    <DatePicker
                      selected={filterDate}
                      onChange={handleDateChange}
                      inline
                    />
                  </div>
                )}
              </th>
              <th>
                Document Type
                <button className="show-doc-type-btn" onClick={toggleDocTypeDropdown}>
                  <img
                    src={DropDownArrow}
                    alt="dropdown-arrow"
                    className="dropdown-arrow"
                  />
                </button>
                {isDocTypeDropdownOpen && (
                  <div className="verifydoc-dropdown-list">
                    <li className="allbtn" onClick={() => {
                        setFilterDocType("All");
                        setIsDocTypeDropdownOpen(false);
                        applyFilters();
                      }}>
                        All
                      </li>
                      <li className="declaration" onClick={() => {
                        setFilterDocType("Declaration");
                        setIsDocTypeDropdownOpen(false);
                        applyFilters();
                      }}>
                        Declaration
                      </li>
                      <li className="invoice" onClick={() => {
                        setFilterDocType("Invoice");
                        setIsDocTypeDropdownOpen(false);
                        applyFilters();
                      }}>
                        Invoice
                      </li>
                      <li className="packing-list" onClick={() => {
                        setFilterDocType("Packing List");
                        setIsDocTypeDropdownOpen(false);
                        applyFilters();
                      }}>
                        Packing List
                      </li>
                  </div>
                )}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDocuments.map((doc, index) => (
              <tr key={index}>
                <td>{doc.declarationNumber}</td>
                <td>
                  {doc.downloadUrl ? (
                    <a href={doc.downloadUrl} target="_blank" rel="noopener noreferrer">
                      {doc.FileName || "View Document"}
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>{doc.updatedDate}</td>
                <td>{doc.documentType}</td>
                <td>
                  {!doc.actions ? (
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(index)}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  ) : (
                    <>
                      <span
                        style={{
                          fontWeight: "bold",
                          color: doc.actions === "Approved" ? "green" : "red",
                        }}
                      >
                        {doc.actions}
                      </span>
                      <button className="reset-btn" onClick={() => resetAction(index)} title="Reset Action">
                        ⛔
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
