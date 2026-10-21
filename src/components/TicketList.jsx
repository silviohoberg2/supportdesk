
import TicketCard from "./TicketCard.jsx";

function TicketList({
    tickets,
    totalTickets,
    onStatusChange,
    onDeleteTicket,
    onEditTicket
}) {
    return (
        <section>
            <h2>Ticketliste</h2>

            {totalTickets === 0 ? (
                <p>Noch keine Support-Tickets vorhanden.</p>
            ) : tickets.length === 0 ? (
                <p>Keine passenden Tickets gefunden.</p>
            ) : (
                tickets.map((ticket) => (
                    <TicketCard
                        key={ticket.id}
                        ticket={ticket}
                        onStatusChange={onStatusChange}
                        onDeleteTicket={onDeleteTicket}
                        onEditTicket={onEditTicket}
                    />
                ))
            )}
        </section>
    );
}

export default TicketList;
