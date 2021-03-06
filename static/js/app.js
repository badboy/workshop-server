(function(document, Elm, socket_port) {
    const container = document.getElementById('client-container');
    const app = Elm.Boiding.init({
        node: container
    });

    window.app = app;

    const socket_address = 'ws://127.0.0.1:' + socket_port;
    const socket = new WebSocket(socket_address);
    socket.addEventListener('message', function(event){
        app.ports.updateTeams.send(event.data);
    })

    app.ports.spawn.subscribe(function(team){
        socket.send(JSON.stringify({'Spawn': {'team': team}}));
    })
})(document, Elm, 3435);
