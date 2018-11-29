//Establecer comunicacion
var socket = io();

//Conectar servidor
socket.on('connect', function() {
    console.log("conectado al servidor ");
});

//Desconectar Servidor
socket.on('disconnect', function() {
    console.log('Conexion Perdida con el servidor');
});



//Url
var searchParams = new URLSearchParams(window.location.search);


//Referencia directa
var escritorio = searchParams.get('escritorio');
var label = $('small');


//Validar si viene un escritorio
if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio no es valido')
}

//Enviar a la etiqueta el nombre
$('h1').text('Escritorio: ' + escritorio);


$('button').on('click', function() {
    socket.emit('atenderTicket', {
        escritorio: escritorio
    }, function(resp) {
        if (resp === 'No hay tickets') {
            alert(resp);
            label.text(resp);
        }
        label.text(resp.numero);
        console.log(resp);
    });

});