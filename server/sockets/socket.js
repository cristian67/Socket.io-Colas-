const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();



io.on('connection', (client) => {


    //------------------------------------------------------
    // Sienguente Ticket (Escuchando Metodo siguienteTicket)
    //------------------------------------------------------
    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();
        callback(siguiente);
    });

    //--------------------------------
    // Emitir Estado Actual a servidor
    //--------------------------------
    client.emit('estadoActual', {

        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    //------------------------------------------------------
    // Atención Escritorio (Escuchando Metodo atenderTicket)
    //------------------------------------------------------
    client.on('atenderTicket', (data, callback) => {
        //Confirmar que venga el escritorio
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'Escritorio es necesario'

            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);


        //emitir a todos
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });

    });

});