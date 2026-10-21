
function TicketCard({
    ticket,
    onStatusChange,
    onDeleteTicket,
    onEditTicket
}) {
    const statusNames = {
        open: "Offen",
        processing: "In Bearbeitung",
        closed: "Erledigt"
    };

    const priorityNames = {
        low: "Niedrig",
        normal: "Normal",
        high: "Hoch"
    };

    const categoryNames = {
        hardware: "Hardware",
        software: "Software",
        network: "Netzwerk"
    };

    return (
        <article className={`ticket-card ${ticket.status}`}>
            <div className="ticket-header">
                <h3>{ticket.title}</h3>

                <span className={`status-badge ${ticket.status}`}>
                    {statusNames[ticket.status] || ticket.status}
                </span>
            </div>

            <p><strong>Kunde:</strong> {ticket.customer}</p>
            <p>
                <strong>Kategorie:</strong>{" "}
                {categoryNames[ticket.category] || ticket.category}
            </p>
            <p>
                <strong>Priorität:</strong>{" "}
                {priorityNames[ticket.priority] || ticket.priority}
            </p>
            <p><strong>Beschreibung:</strong> {ticket.description}</p>

            <div className="ticket-actions">
                <div>
                    <label htmlFor={`status-${ticket.id}`}>
                        Status ändern:
                    </label>

                    <select
                        id={`status-${ticket.id}`}
                        value={ticket.status}
                        onChange={(event) =>
                            onStatusChange(ticket.id, event.target.value)
                        }
                    >
                        <option value="open">Offen</option>
                        <option value="processing">In Bearbeitung</option>
                        <option value="closed">Erledigt</option>
                    </select>
                </div>

                <button
                    type="button"
                    onClick={() => onEditTicket(ticket)}
                >
                    Bearbeiten
                </button>

                <button
                    type="button"
                    className="delete-button"
                    onClick={() => onDeleteTicket(ticket.id)}
                >
                    Ticket löschen
                </button>
            </div>
        </article>
    );
}

export default TicketCard;
