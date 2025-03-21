import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ApiEndpoints from "./endPoints"
function App() {
  // for my ticket area
  const Endpoints = new ApiEndpoints()
  const [activeTab, setActiveTab] = useState("open");
  const [activeCategory, setActiveCategory] = useState("all");
  const [ticketcreatemsg, setTicketCreatemsg] = useState(null)
  const [searchQueries, setSearchQueries] = useState({
    ticketNo: "",
    title: "",
    createdDate: "",
    status: "",
    priority: "",
    agentAssigned: "",
  });
  // State for tickets
  const [tickets, setTickets] = useState([]);

  //  Add Form Api calling
  const [addFormData, setAddFormData] = useState({
    subject: "",
    priority: "",
    status: "",
    group: "",
    description: "",
    file: null,
    tags: "",
  });

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get(Endpoints.FETCH_TICKETS);
      setTickets(response.data.data);
    } catch (error) {
      console.error("Error fetching tickets", error);
    }
  };

  async function CreateTicket() {
    try {
     const response= await axios.post(Endpoints.CREATE_TICKET, addFormData);
      fetchTickets();
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddFormChange = (e) => {
    const { name, value, type, files } = e.target;
    setAddFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  // Delete Ticket API Calling
  const handleDelete = async (ticketId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this ticket?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `https://api.example.com/tickets/${ticketId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete ticket");

      // Update UI after successful deletion
      setTickets((prevTickets) => ({
        open: prevTickets.open.filter((ticket) => ticket.ticketNo !== ticketId),
        closed: prevTickets.closed.filter(
          (ticket) => ticket.ticketNo !== ticketId
        ),
      }));
    } catch (error) {
      console.error("Error deleting ticket:", error.message);
      alert("Failed to delete ticket. Please try again.");
    }
  };

  //  ticket data
  const ticketData = {
    all: {
      open: [
        {
          ticketNo: "101",
          title: "Login Issue",
          createdDate: "2024-03-05",
          priority: "High",
          agentAssigned: "John",
        },
        {
          ticketNo: "103",
          title: "App Crash",
          createdDate: "2024-03-07",
          priority: "Critical",
          agentAssigned: "Emma",
        },
      ],
      closed: [
        {
          ticketNo: "102",
          title: "Payment Failure",
          createdDate: "2024-03-06",
          priority: "Low",
          agentAssigned: "Mike",
        },
        {
          ticketNo: "106",
          title: "Bug in Checkout",
          createdDate: "2024-03-10",
          priority: "High",
          agentAssigned: "David",
        },
        {
          ticketNo: "107",
          title: "Database Error",
          createdDate: "2024-03-11",
          priority: "Critical",
          agentAssigned: "Olivia",
        },
      ],
    },
    myTickets: {
      open: [
        {
          ticketNo: "201",
          title: "My Ticket 1",
          createdDate: "2024-03-02",
          priority: "Medium",
          agentAssigned: "Me",
        },
        {
          ticketNo: "202",
          title: "Software Update Issue",
          createdDate: "2024-03-05",
          priority: "High",
          agentAssigned: "Me",
        },
        {
          ticketNo: "203",
          title: "Network Problem",
          createdDate: "2024-03-07",
          priority: "Low",
          agentAssigned: "Me",
        },
      ],
      closed: [
        {
          ticketNo: "204",
          title: "Email Not Syncing",
          createdDate: "2024-03-08",
          priority: "Medium",
          agentAssigned: "Me",
        },
      ],
    },
    assignedTickets: {
      open: [
        {
          ticketNo: "301",
          title: "User Authentication Failure",
          createdDate: "2024-03-03",
          priority: "High",
          agentAssigned: "Alex",
        },
        {
          ticketNo: "302",
          title: "API Timeout",
          createdDate: "2024-03-04",
          priority: "Critical",
          agentAssigned: "Alex",
        },
      ],
      closed: [
        {
          ticketNo: "303",
          title: "UI Design Issue",
          createdDate: "2024-03-06",
          priority: "Low",
          agentAssigned: "Alex",
        },
        {
          ticketNo: "304",
          title: "Security Vulnerability",
          createdDate: "2024-03-09",
          priority: "Critical",
          agentAssigned: "Alex",
        },
      ],
    },
  };

  const currentTickets = ticketData[activeCategory];
  const filteredTickets = currentTickets[activeTab].filter(
    (ticket) =>
      ticket.ticketNo.includes(searchQueries.ticketNo) &&
      ticket.title.toLowerCase().includes(searchQueries.title.toLowerCase()) &&
      ticket.createdDate.includes(searchQueries.createdDate) &&
      ticket.priority
        .toLowerCase()
        .includes(searchQueries.priority.toLowerCase()) &&
      ticket.agentAssigned
        .toLowerCase()
        .includes(searchQueries.agentAssigned.toLowerCase())
  );

  const handleFilterChange = (column, value) => {
    setSearchQueries((prev) => ({ ...prev, [column]: value }));
  };

  const clearFilter = (column) => {
    setSearchQueries((prev) => ({ ...prev, [column]: "" }));
  };

  return (
    <>
      <div className="ticket-dashboard">
        <div className="ticket-title">
          <h1>
            {" "}
            <i className="fa-solid fa-ticket"></i>My Ticket
          </h1>
          <h2 className="ticket-profile">
            <i class="fa-solid fa-user-tie"></i> John Smith
          </h2>
        </div>
        {/* Category Buttons */}
        <div className="category-btns">
          <button
            className={activeCategory === "all" ? "active" : ""}
            onClick={() => setActiveCategory("all")}
          >
            All Tickets
          </button>
          <button
            className={activeCategory === "myTickets" ? "active" : ""}
            onClick={() => setActiveCategory("myTickets")}
          >
            My Tickets
          </button>
          <button
            className={activeCategory === "assignedTickets" ? "active" : ""}
            onClick={() => setActiveCategory("assignedTickets")}
          >
            Assigned Tickets
          </button>
        </div>

        {/* Open & Close Buttons */}
        <div className="openclose-btns">
          <button className="status-btn" onClick={() => setActiveTab("open")}>
            <span
              className={`number-badge ${
                activeTab === "open" ? "orange-badge" : "grey-badge"
              }`}
            >
              {currentTickets.open.length}
            </span>{" "}
            Open
          </button>
          <button className="status-btn" onClick={() => setActiveTab("closed")}>
            <span
              className={`number-badge ${
                activeTab === "closed" ? "orange-badge" : "grey-badge"
              }`}
            >
              {currentTickets.closed.length}
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
                  {Object.keys(searchQueries).map((column) => (
                    <th key={column}>
                      {column.charAt(0).toUpperCase() + column.slice(1)}
                      <div className="filter-container">
                        <input
                          type="text"
                          className="filter-input"
                          placeholder={`Search ${column}...`} // ✅ Placeholder added
                          value={searchQueries[column]}
                          onChange={(e) =>
                            handleFilterChange(column, e.target.value)
                          }
                        />
                        {searchQueries[column] && (
                          <button
                            className="clear-button"
                            onClick={() => clearFilter(column)}
                          >
                            ✖
                          </button>
                        )}
                      </div>
                    </th>
                  ))}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.length > 0 ? (
                  filteredTickets.map((ticket, index) => (
                    <tr key={index}>
                      <td className={`left-border color-${index % 5}`}>
                        &nbsp;{ticket.ticketNo}
                      </td>
                      <td>{ticket.title}</td>
                      <td>{ticket.createdDate}</td>
                      <td>
                        <span className="status-text">
                          {activeTab === "open" ? "Open" : "Closed"}
                        </span>
                      </td>
                      <td className={`left-border color-${index % 5}`}>
                        &nbsp;{ticket.priority}
                      </td>
                      <td>{ticket.agentAssigned}</td>
                      <td className="action-icons">
                        <button className="edit-btn">
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(ticket.ticketNo)}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      style={{ textAlign: "center", padding: "10px" }}
                    >
                      No tickets found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* add form  */}
        <div className="add-form-container">
          <h2>Add New Ticket</h2>
          <p>{ticketcreatemsg}</p>
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
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="status">Status:</label>
              <select
                id="status"
                name="status"
                value={addFormData.status}
                onChange={handleAddFormChange}
                required
              >
                <option value="">Select Status</option>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
                <option value="Resolved">Resolved</option>
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
                <option value="Travel">Travel</option>
                <option value="Payroll">Payroll</option>
                <option value="Admin">Admin</option>
                <option value="IT Supports">IT Support</option>
                <option value="HR">HR</option>
                <option value="Reimbursements">Reimbursement</option>
                <option value="Pocket HRMS">Pocket HRMS</option>
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
              <div className="file-input">
                <input
                  type="file"
                  id="file"
                  name="file"
                  accept=".png,.jpg,.jpeg,.doc,.docx,.pdf"
                />
                <p className="file-warning">
                  Only PNG, JPG, JPEG, DOC, DOCX, PDF files are allowed to
                  upload
                </p>
              </div>
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
              <button type="submit" className="submit-btn" onClick={CreateTicket}>
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
