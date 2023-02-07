// const api = 'http://127.0.0.1:8000/api/';
const api = 'http://api.test/api/';

function getServers() {
    let table = document.getElementById('server-table');
    fetch(api + "servers")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let servers = data;
            servers.map(function (server) {
                let tr = document.createElement('tr');
                tr.setAttribute("id", server.id);
                let id = document.createElement('td');
                let ipv4 = document.createElement('td');
                let ipv6 = document.createElement('td');
                let location = document.createElement('td');
                let description = document.createElement('td');
                let options = document.createElement('td')
                let view = document.createElement("button");
                view.innerHTML = "View";
                view.onclick = viewServer;
                let del = document.createElement("button");
                del.innerHTML = "Delete";
                del.onclick = deleteServer;

                id.innerHTML = server.id;
                ipv4.innerHTML = server.ipv4;
                ipv6.innerHTML = server.ipv6;
                location.innerHTML = server.location;
                description.innerHTML = server.description;
                options.appendChild(view);
                options.appendChild(del);
                tr.appendChild(id);
                tr.appendChild(ipv4);
                tr.appendChild(ipv6);
                tr.appendChild(location);
                tr.appendChild(description);
                tr.appendChild(options);
                table.appendChild(tr);
            });
        }).catch(function (error) {
            console.log(error);
        });
}

function clearServers() {
    let table = document.getElementById('server-table');
    while (table.childNodes.length > 2) {
        table.lastChild.remove();
    }
}

function createServer() {
    let data = new FormData(document.getElementById('createServer'));
    let options = {
        method: 'POST',
        body: data
    }
    fetch(api + "servers", options)
        .then(function (response) {
            if (response.ok) {
                clearServers();
                getServers();
                return response.text()
            } else {
                throw "Error";
            }

        })
        .then(function (texto) {
            console.log(texto);
        })
        .catch(function (error) {
            console.log(error);
        });

}

function viewServer() {
    let id = this.parentNode.parentNode.id;
    window.location = "server.html?id=" + id;
}


function deleteServer() {
    let id = this.parentNode.parentNode.id;
    fetch(api + "servers/" + id, {
        method: 'DELETE',
    })
        .then((response) => {
            clearServers();
            getServers();
        })
        .then(response => console.log(response))
}

getServers();