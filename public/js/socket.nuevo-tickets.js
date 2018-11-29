//Establecer comunicacion
var socket = io();

//Referencia difrecta
let lable = $('#lblNuevoTicket')


//Conectar servidor
socket.on('connect', function() {
    console.log("conectado al servidor ");
});

//Desconectar Servidor
socket.on('disconnect', function() {
    console.log('Conexion Perdida con el servidor');
});


socket.on('estadoActual', function(estadoActual) {
    lable.text(estadoActual.actual);
});


$('button').on('click', function() {

    socket.emit('siguienteTicket', null, function(siguienteTicket) {

        lable.text(siguienteTicket);

    });

});