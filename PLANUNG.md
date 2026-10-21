
# Projektplanung – SupportDesk

## 1. Projektidee

Entwicklung einer React-Anwendung zur Verwaltung von Support-Tickets.

Mitarbeiter können Support-Anfragen erfassen, anzeigen und verwalten.

## 2. Hauptfunktionen

- Neue Support-Tickets erstellen
- Vorhandene Tickets anzeigen
- Ticketstatus ändern
- Tickets löschen
- Tickets suchen und filtern
- Anzahl der Tickets als Statistik anzeigen
- Tickets im localStorage speichern
- Eingaben im Formular überprüfen
- Erfolgsmeldung nach dem Speichern anzeigen

## 3. Komponenten

App
- Hauptkomponente der Anwendung
- Verwaltet die Tickets und den zentralen State
- Gibt Daten und Funktionen über Props weiter

Header
- Zeigt den Namen der Anwendung an

TicketForm
- Formular zum Erstellen neuer Tickets
- Prüft die Eingaben

TicketFilter
- Suchfeld und Statusfilter

TicketList
- Zeigt die vorhandenen Tickets als Liste an

TicketCard
- Zeigt die Daten eines einzelnen Tickets
- Ermöglicht Statusänderungen und Löschen

Footer
- Zeigt den Fußbereich der Anwendung

## 4. State

tickets
- Speichert alle Support-Tickets

searchTerm
- Speichert den eingegebenen Suchbegriff

statusFilter
- Speichert den ausgewählten Statusfilter

formData
- Speichert die Eingaben im Ticketformular

## 5. Abgeleitete Werte

filteredTickets
- Tickets, die zur Suche und zum Filter passen

ticketCount
- Gesamtanzahl aller Tickets

openTicketCount
- Anzahl der offenen Tickets

processingTicketCount
- Anzahl der Tickets in Bearbeitung

closedTicketCount
- Anzahl der erledigten Tickets

## 6. useEffect

- Speichert die Tickets bei Änderungen im localStorage
- Lässt die Erfolgsmeldung nach einigen Sekunden verschwinden

## 7. localStorage

- Speichert die Support-Tickets im Browser
- Beim erneuten Laden der Seite bleiben die Tickets erhalten
- Auch Statusänderungen und Löschungen werden gespeichert

## 8. useRef

- Wird für das Titelfeld im Formular verwendet
- Nach dem Erstellen eines Tickets wird der Fokus
  wieder auf das Titelfeld gesetzt

## 9. Datenfluss

- App verwaltet die Tickets zentral
- TicketForm meldet neue Tickets über eine Callback-Funktion an App
- App übergibt die Tickets als Props an TicketList
- TicketList gibt einzelne Tickets an TicketCard weiter
- TicketCard meldet Statusänderungen und Löschaktionen zurück an App
- TicketFilter meldet Änderungen der Suche und des Filters an App

## 10. Zusätzliche Funktionen

Folgende Funktionen wurden zusätzlich umgesetzt:

- Bestehende Tickets bearbeiten
- Vorhandenes Formular zum Erstellen und Bearbeiten verwenden
- Bearbeitung abbrechen
- Automatisch zum Bearbeitungsformular scrollen
- Statusabhängige Farben für Ticketkarten
- Responsive Darstellung für Desktop und Smartphone

## 11. Verwendete React-Konzepte

- useState zur Verwaltung veränderbarer Daten
- Props zur Weitergabe von Daten
- Callback-Funktionen für Aktionen der Komponenten
- Lifting State Up für die zentrale Ticketverwaltung
- map() zur Darstellung und Änderung von Tickets
- filter() für Suche, Statusfilter und Löschen
- useEffect für Speicherung, Erfolgsmeldung und Scrollen
- useRef für Eingabefokus und Scrollfunktion
- localStorage zur Speicherung im Browser

## 12. Testergebnisse

Alle zehn durchgeführten Funktionstests bestanden.

Geprüft wurden:
- Tickets erstellen
- Formularvalidierung
- Erfolgsmeldung und Fokus
- Status ändern
- Tickets bearbeiten
- Bearbeitung abbrechen
- Suche und Filter
- Tickets löschen
- localStorage
- Empty State und No Results

Zusätzlich wurden die Desktop- und Smartphone-Darstellung
sowie die Browserkonsole überprüft.
