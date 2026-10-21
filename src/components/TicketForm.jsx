
import { useState, useEffect, useRef } from "react";

const emptyForm = {
    title: "",
    customer: "",
    email: "",
    category: "",
    priority: "",
    description: ""
};

function TicketForm({
    editingTicket,
    onAddTicket,
    onUpdateTicket,
    onCancelEdit
}) {
    const [formData, setFormData] = useState(
        editingTicket
            ? {
                title: editingTicket.title,
                customer: editingTicket.customer,
                email: editingTicket.email,
                category: editingTicket.category,
                priority: editingTicket.priority,
                description: editingTicket.description
            }
            : { ...emptyForm }
    );

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const titleInputRef = useRef(null);

    // Erfolgsmeldung automatisch entfernen
    useEffect(() => {
        if (!successMessage) return;

        const timeout = setTimeout(() => {
            setSuccessMessage("");
        }, 3000);

        return () => clearTimeout(timeout);
    }, [successMessage]);

    function handleChange(event) {
        const { id, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [id]: value
        }));

        setError("");
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (
            !formData.title.trim() ||
            !formData.customer.trim() ||
            !formData.email.trim() ||
            !formData.category ||
            !formData.priority
        ) {
            setError("Bitte alle Pflichtfelder ausfüllen.");
            return;
        }

        const ticketTitle = formData.title;

        if (editingTicket) {
            onUpdateTicket(formData);
        } else {
            onAddTicket(formData);
            setSuccessMessage(
                `Ticket "${ticketTitle}" wurde angelegt.`
            );
        }

        setFormData({ ...emptyForm });
        setError("");
        titleInputRef.current?.focus();
    }

    return (
        <section>
            <h2>
                {editingTicket
                    ? "Ticket bearbeiten"
                    : "Neues Ticket erstellen"}
            </h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Titel:</label>
                    <input
                        ref={titleInputRef}
                        type="text"
                        id="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="customer">Kunde:</label>
                    <input
                        type="text"
                        id="customer"
                        value={formData.customer}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="email">E-Mail:</label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="category">Kategorie:</label>
                    <select
                        id="category"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="">Bitte auswählen</option>
                        <option value="hardware">Hardware</option>
                        <option value="software">Software</option>
                        <option value="network">Netzwerk</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="priority">Priorität:</label>
                    <select
                        id="priority"
                        value={formData.priority}
                        onChange={handleChange}
                    >
                        <option value="">Bitte auswählen</option>
                        <option value="low">Niedrig</option>
                        <option value="normal">Normal</option>
                        <option value="high">Hoch</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="description">Beschreibung:</label>
                    <textarea
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                {error && (
                    <p style={{ color: "red" }}>{error}</p>
                )}

                {successMessage && (
                    <p style={{ color: "green" }}>
                        {successMessage}
                    </p>
                )}

                <button type="submit">
                    {editingTicket
                        ? "Änderungen speichern"
                        : "Ticket erstellen"}
                </button>

                {editingTicket && (
                    <button
                        type="button"
                        onClick={onCancelEdit}
                        style={{ backgroundColor: "#64748b" }}
                    >
                        Abbrechen
                    </button>
                )}
            </form>
        </section>
    );
}

export default TicketForm;
