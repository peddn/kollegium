# ROLES

- Administrator
- Supporter | Principal
- Teacher
- Authenticated
- Public

## SystemManager (Systemberteuer*in)

## InternalSupporter

## ExternalSupporter

## Principal (Rektor*in)

## Teacher

## Authenticated

## Public

Auf Basis Ihrer Rückmeldung präsentiere ich Ihnen das aktualisierte Rollen- und Endpunktkonzept:

**Rollen und Berechtigungen:**

1. **Lehrer**:
   - Kann neue Tickets erstellen
   - Kann seine eigenen Tickets anzeigen
   - Kann ein eigenes Ticket als 'erledigt' markieren und archivieren

2. **Interner Supporter**:
   - Kann alles, was ein Lehrer auch kann
   - Kann sich selbst Tickets aus einer Liste der offenen Tickets zuweisen
   - Kann seine zugewiesenen Tickets bearbeiten

3. **Systembetreuer**:
   - Kann alles, was ein Lehrer und ein interner Supporter auch kann
   - Kann Tickets einem internen oder externen Supporter zuweisen
   - Kann alle Zuweisungen von Tickets rückgängig machen

4. **Externer Supporter**:
   - Kann nur die ihm zugewiesenen Tickets bearbeiten

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

Dieses aktualisierte Konzept bietet eine klare Strukturierung der Rollen und entsprechenden Berechtigungen sowie eine intuitive API für die verschiedenen Nutzergruppen. Bitte prüfen Sie das Konzept und teilen Sie mir mit, wenn weitere Anpassungen benötigt werden.

`
// Berechtigungen für Lehrer hinzufügen
await strapi.plugins['users-permissions'].services.userspermissions.updateRole('Lehrer', {
  permissions: {
    tickets: {
      create: true,
      find: {
        own: true,
      },
    },
  },
});
`

<https://forum.strapi.io/t/how-to-use-entityservice-for-user/23087>

`
const user = await strapi.entityService.findOne(
      "plugin::users-permissions.user",
      ctx.state.user.id,
      {
        populate: [
          "role"
        ],
      }
    );```
`
