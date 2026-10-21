
import { useState, useEffect, useRef } from "react";
import TicketForm from "./components/TicketForm.jsx";
import TicketFilter from "./components/TicketFilter.jsx";
import TicketList from "./components/TicketList.jsx";
import "./App.css";

const startTickets = [
  {
    id: 1,
    title: "Drucker funktioniert nicht",
    customer: "Erwin Mustermann",
    email: "erwin@example.com",
    category: "hardware",
    priority: "high",
    status: "open",
    description: "Der Netzwerkdrucker reagiert nicht."
  },
  {
    id: 2,
    title: "Passwort vergessen",
    customer: "Anna Müller",
    email: "anna@example.com",
    category: "software",
    priority: "normal",
    status: "processing",
    description: "Anmeldung am Computer nicht möglich."
  }
];

function App() {
  const [tickets, setTickets] = useState(() => {
    const savedTickets = localStorage.getItem("supportdesk-tickets");

    if (savedTickets !== null) {
      try {
        const parsedTickets = JSON.parse(savedTickets);

        if (Array.isArray(parsedTickets)) {
          return parsedTickets;
        }
      } catch (error) {
        console.error("Tickets konnten nicht geladen werden:", error);
      }
    }

    return startTickets;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editingTicket, setEditingTicket] = useState(null);

  // Referenz auf den Formularbereich
  const formRef = useRef(null);

  // Tickets im Browser speichern
  useEffect(() => {
    localStorage.setItem(
      "supportdesk-tickets",
      JSON.stringify(tickets)
    );
  }, [tickets]);

  // Beim Bearbeiten zum Formular scrollen
  useEffect(() => {
    if (editingTicket) {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }, [editingTicket]);

  // Neues Ticket erstellen
  function handleAddTicket(formData) {
    const newTicket = {
      id: Date.now(),
      ...formData,
      status: "open"
    };

    setTickets((previousTickets) => [
      ...previousTickets,
      newTicket
    ]);
  }

  // Bearbeitung starten
  function handleEditTicket(ticket) {
    setEditingTicket(ticket);
  }

  // Ticket aktualisieren
  function handleUpdateTicket(formData) {
    setTickets((previousTickets) =>
      previousTickets.map((ticket) =>
        ticket.id === editingTicket.id
          ? { ...ticket, ...formData }
          : ticket
      )
    );

    setEditingTicket(null);
  }

  // Bearbeitung abbrechen
  function handleCancelEdit() {
    setEditingTicket(null);
  }

  // Ticketstatus ändern
  function handleStatusChange(id, newStatus) {
    setTickets((previousTickets) =>
      previousTickets.map((ticket) =>
        ticket.id === id
          ? { ...ticket, status: newStatus }
          : ticket
      )
    );
  }

  // Ticket löschen
  function handleDeleteTicket(id) {
    const confirmDelete = window.confirm(
      "Möchtest du dieses Ticket wirklich löschen?"
    );

    if (confirmDelete) {
      setTickets((previousTickets) =>
        previousTickets.filter(
          (ticket) => ticket.id !== id
        )
      );

      if (editingTicket?.id === id) {
        setEditingTicket(null);
      }
    }
  }

  // Tickets suchen und filtern
  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch = ticket.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      ticket.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Statistik berechnen
  const ticketCount = tickets.length;

  const openTicketCount = tickets.filter(
    (ticket) => ticket.status === "open"
  ).length;

  const processingTicketCount = tickets.filter(
    (ticket) => ticket.status === "processing"
  ).length;

  const closedTicketCount = tickets.filter(
    (ticket) => ticket.status === "closed"
  ).length;

  return (
    <main>
      <h1>SupportDesk</h1>
      <h2>Support-Tickets</h2>

      <section>
        <h2>Ticketstatistik</h2>

        <p>Tickets insgesamt: {ticketCount}</p>
        <p>Offen: {openTicketCount}</p>
        <p>In Bearbeitung: {processingTicketCount}</p>
        <p>Erledigt: {closedTicketCount}</p>
      </section>

      <div ref={formRef}>
        <TicketForm
          key={editingTicket?.id ?? "new"}
          editingTicket={editingTicket}
          onAddTicket={handleAddTicket}
          onUpdateTicket={handleUpdateTicket}
          onCancelEdit={handleCancelEdit}
        />
      </div>

      <TicketFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      <TicketList
        tickets={filteredTickets}
        totalTickets={ticketCount}
        onStatusChange={handleStatusChange}
        onDeleteTicket={handleDeleteTicket}
        onEditTicket={handleEditTicket}
      />
    </main>
  );
}

export default App;
