/*
**Endpunkte:**

  1. **Lehrer**:
    - `POST /tickets`: um ein neues Ticket zu erstellen
    - `GET /tickets/own`: um seine eigenen Tickets anzuzeigen
    - `PUT /tickets/own/{id}`: um sein eigenes Ticket zu aktualisieren, z.B. als 'erledigt' zu markieren und zu archivieren

  2. **Interner Supporter**:
    - `GET /tickets/open`: um eine Liste aller offenen Tickets zu sehen
    - `GET /tickets/assigned`: um seine zugewiesenen Tickets anzuzeigen
    - `PUT /tickets/grab/{id}`: um sich selbst ein Ticket zuzuweisen
    - `PUT /tickets/assigned/{id}`: um seine zugewiesenen Tickets zu bearbeiten

  3. **Systembetreuer**:
    - `GET /tickets`: um eine Liste aller Tickets zu sehen
    - `PUT /tickets/{id}`: um Tickets einem internen oder externen Supporter zuzuweisen und alle Zuweisungen von Tickets rückgängig zu machen

  4. **Externer Supporter**:
    - `GET /tickets/assigned`: um die ihm zugewiesenen Tickets anzuzeigen
    - `PUT /tickets/assigned/{id}`: um die ihm zugewiesenen Tickets zu bearbeiten
 */
module.exports = {
  routes: [
    // TODO: `POST /tickets` ist core controller und muss überschrieben werden
    // TODO: checken, wie und ob man hier (handler) policies einsetzen kann...
    {
      method: 'GET',
      path: '/tickets/own',
      handler: 'ticket.readOwn',
    },
    {
      method: 'PUT',
      path: '/tickets/own/:id',
      handler: 'ticket.updateOwn',
    },
    {
      method: 'POST',
      path: '/tickets/external',
      handler: 'ticket.external',
    },
  ],
}
