
function TicketFilter({
    searchTerm,
    onSearchChange,
    statusFilter,
    onStatusFilterChange
}) {
    return (
        <section>
            <h2>Tickets suchen und filtern</h2>

            <div>
                <label htmlFor="search">Suche: </label>
                <input
                    type="search"
                    id="search"
                    value={searchTerm}
                    onChange={(event) =>
                        onSearchChange(event.target.value)
                    }
                    placeholder="Titel suchen..."
                />
            </div>

            <div>
                <label htmlFor="statusFilter">Status: </label>
                <select
                    id="statusFilter"
                    value={statusFilter}
                    onChange={(event) =>
                        onStatusFilterChange(event.target.value)
                    }
                >
                    <option value="all">Alle</option>
                    <option value="open">Offen</option>
                    <option value="processing">In Bearbeitung</option>
                    <option value="closed">Erledigt</option>
                </select>
            </div>
        </section>
    );
}

export default TicketFilter;
