import "./App.css";
import { useState } from "react";

function App() {
  // for my ticket area
  const [activeTab, setActiveTab] = useState("open");
  const [page, setPage] = useState("dashboard");

  // State for Add Form
  const [addFormData, setAddFormData] = useState({
    subject: "",
    priority: "",
    group: "",
    description: "",
    file: null,
    tags: "",
  });

  // State for Filter Form
  const [filterData, setFilterData] = useState({
    ticketId: "",
    title: "",
    status: "",
    priority: "",
    tagname: "",
  });

  // Add Form Change
  const handleAddFormChange = (e) => {
    const { name, value, type, files } = e.target;
    setAddFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  // Filter Change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterData((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const openTickets = [
    {
      ticketNo: "TCK001",
      title: "Login Issue",
      createdDate: "2024-02-27",
      status: "Closed",
      priority: "High",
      agentAssigned: "John Doe",
      action: "View",
    },
    {
      ticketNo: "TCK002",
      title: "Payment Failure",
      createdDate: "2024-02-26",
      status: "Closed",
      priority: "Medium",
      agentAssigned: "Jane Smith",
      action: "View",
    },
  ];

  const closedTickets = [
    {
      ticketNo: "TCK003",
      title: "Facing issue with Laptop ",
      createdDate: "2024-02-25",
      status: "Closed",
      priority: "Low",
      agentAssigned: "Mike Ross",
    },
    {
      ticketNo: "TCK004",
      title: "Refund Request",
      createdDate: "2024-02-24",
      status: "Closed",
      priority: "Medium",
      agentAssigned: "Rachel Zane",
    },
  ];

  return (
    <>
      <div className="ticket-dashboard">
        <div className="ticket-title">
          <h1>
            {" "}
            <i className="fa-solid fa-ticket"></i>My Ticket
          </h1>
        </div>
        {/* code for top buttons */}
        <div className="top-btns">
          <button
            className={`add-btn ${page === "add" ? "active-btn" : ""}`}
            onClick={() => setPage(page === "add" ? "dashboard" : "add")}
          >
            {page === "add" ? "X Close" : "+ Add"}
          </button>
          <button
            className={`filter-btn ${page === "filter" ? "active-btn" : ""}`}
            onClick={() => setPage(page === "filter" ? "dashboard" : "filter")}
          >
            {page === "filter" ? "X Close" : "Filter"}
          </button>
        </div>

        {/* Add Ticket Form */}
        {page === "add" && (
          <div className="add-form-container">
            <form className="add-form">
              <div className="form-field">
                <label htmlFor="subject">Subject:</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={addFormData.subject}
                  onChange={handleAddFormChange}
                  required
                  placeholder="Enter subject"
                />
              </div>

              <div className="form-field">
                <label htmlFor="priority">Priority:</label>
                <select
                  id="priority"
                  name="priority"
                  value={addFormData.priority}
                  onChange={handleAddFormChange}
                  required
                >
                  <option value="">Select Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="group">Group:</label>
                <select
                  id="group"
                  name="group"
                  value={addFormData.group}
                  onChange={handleAddFormChange}
                  required
                >
                  <option value="">Select Group</option>
                  <option value="travel">Travel</option>
                  <option value="payroll">Payroll</option>
                  <option value="admin">Admin</option>
                  <option value="it-support">IT Support</option>
                  <option value="hr">HR</option>
                  <option value="reimbursement">Reimbursement</option>
                  <option value="pocket-hrms">Pocket HRMS</option>
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  value={addFormData.description}
                  onChange={handleAddFormChange}
                  required
                  placeholder="Enter description..."
                ></textarea>
              </div>

              <div className="form-field file-upload">
                <label htmlFor="file">Attach File:</label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  accept=".png,.jpg,.jpeg,.doc,.docx,.pdf"
                  onChange={handleAddFormChange}
                />
              </div>

              <div className="form-field">
                <label htmlFor="tags">Tags:</label>
                <select
                  id="tags"
                  name="tags"
                  value={addFormData.tags}
                  onChange={handleAddFormChange}
                >
                  <option value="">Select Tag</option>
                  <option value="query">Tag Name - Query</option>
                  <option value="problem">Tag Name - Problem</option>
                </select>
              </div>

              <div className="button-container">
                <button type="submit" className="submit-btn">Create</button>
              </div>
            </form>
          </div>
        )}

        {/* Filter Ticket Form */}
        {page === "filter" && (
          <div className="filter-page">
            <h2>Filter By:-</h2>
            <form className="filter-ticket-form">
              <div className="filter-form">
                <div className="filter-field">
                  <label htmlFor="ticketId">Filter by Ticket ID:</label>
                  <input
                    type="text"
                    id="ticketId"
                    name="ticketId"
                    value={filterData.ticketId}
                    onChange={handleFilterChange}
                    placeholder="Enter Ticket ID"
                  />
                </div>

                <div className="filter-field">
                  <label htmlFor="title">Filter by Title:</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={filterData.title}
                    onChange={handleFilterChange}
                    placeholder="Enter Title"
                  />
                </div>

                <div className="filter-field">
                  <label htmlFor="status">Filter by Status:</label>
                  <select
                    id="status"
                    name="status"
                    value={filterData.status}
                    onChange={handleFilterChange}
                  >
                    <option value="">Select Status</option>
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <div className="filter-field">
                  <label htmlFor="priority">Filter by Priority:</label>
                  <select
                    id="priority"
                    name="priority"
                    value={filterData.priority}
                    onChange={handleFilterChange}
                  >
                    <option value="">Select Priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>

                <div className="filter-field">
                  <label htmlFor="tagname">Filter by Tag Name:</label>
                  <select
                    id="tagname"
                    name="tagname"
                    value={filterData.tagname}
                    onChange={handleFilterChange}
                  >
                    <option value="">Select Tag Name</option>
                    <option value="query">Query</option>
                    <option value="problem">Problem</option>
                  </select>
                </div>

                <div className="filter-btn-container">
                  <button type="button" className="apply-btn">Apply</button>
                  <button type="button" className="create-btn">Create</button>
                </div>
              </div>
            </form>
          </div>
        )}

        {page === "dashboard" && (
          <>
            {/* Open & Close Buttons */}
            <div className="openclose-btns">
              <button
                className="status-btn"
                onClick={() => setActiveTab("open")}
              >
                <span
                  className={`number-badge ${
                    activeTab === "open" ? "blue-badge" : "grey-badge"
                  }`}
                >
                  2
                </span>{" "}
                Open
              </button>
              <button
                className="status-btn"
                onClick={() => setActiveTab("closed")}
              >
                <span
                  className={`number-badge ${
                    activeTab === "closed" ? "blue-badge" : "grey-badge"
                  }`}
                >
                  7
                </span>{" "}
                Closed
              </button>
            </div>

            {/* Table Section */}
            <div className="ticket-table">
              <div className="div-table">
                <table>
                  <thead>
                    <tr>
                      <th>Ticket No.</th>
                      <th>Title</th>
                      <th>Created Date</th>
                      <th>Status</th>
                      <th>Priority</th>
                      <th>Agent Assigned</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(activeTab === "open" ? openTickets : closedTickets).map(
                      (ticket, index) => (
                        <tr key={index}>
                          <td className={`left-border color-${index % 5}`}>
                            &nbsp;{ticket.ticketNo}
                          </td>
                          <td>{ticket.title}</td>
                          <td>{ticket.createdDate}</td>
                          <td>
                            <span className="status-text">{ticket.status}</span>
                          </td>
                          <td className={`left-border color-${index % 5}`}>
                            &nbsp;{ticket.priority}
                          </td>
                          <td>{ticket.agentAssigned}</td>
                          <td className="action-icons">
                            <button className="edit-btn">
                              <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button className="delete-btn">
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
