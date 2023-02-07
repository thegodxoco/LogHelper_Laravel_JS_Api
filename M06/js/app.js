//const api = 'http://api.test/api/';
const api = 'http://127.0.0.1:8000/api/';

/*
function getServers() {
    let list = document.getElementById('server-list');
    let ul = document.createElement("ul");
    fetch(api + "servers")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let servers = data;
            servers.map(function (server) {
                let li = document.createElement('li');
                let id = document.createElement('h3');
                let ipv4 = document.createElement('span');
                let ipv6 = document.createElement('span');
                let location = document.createElement('span');
                let description = document.createElement('span');
                id.innerHTML = "Server Id: " + server.id;
                ipv4.innerHTML = "IPv4: " + server.ipv4 + " - ";
                ipv6.innerHTML = "IPv6: " + server.ipv6 + " - ";
                location.innerHTML = "Location: " + server.location + " - ";
                description.innerHTML = "Description: " + server.description;

                li.appendChild(id);
                li.appendChild(ipv4);
                li.appendChild(ipv6);
                li.appendChild(location);
                li.appendChild(description);
                ul.appendChild(li);
            });
        }).catch(function (error) {
            console.log(error);
        });
    list.appendChild(ul);
}
*/
function getServers() {
    let list = document.getElementById('server-table');
    // let table = document.createElement("table");
    fetch(api + "servers")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let servers = data;
            servers.map(function (server) {
                let tr = document.createElement('tr');
                let id = document.createElement('td');
                let ipv4 = document.createElement('td');
                let ipv6 = document.createElement('td');
                let location = document.createElement('td');
                let description = document.createElement('td');
                id.innerHTML = "Server Id: " + server.id;
                ipv4.innerHTML = "IPv4: " + server.ipv4;
                ipv6.innerHTML = "IPv6: " + server.ipv6;
                location.innerHTML = "Location: " + server.location;
                description.innerHTML = "Description: " + server.description;

                tr.appendChild(id);
                tr.appendChild(ipv4);
                tr.appendChild(ipv6);
                tr.appendChild(location);
                tr.appendChild(description);
                list.appendChild(tr);
            });
        }).catch(function (error) {
            console.log(error);
        });
    // list.appendChild(table);
}

function createServer() {
    let data = new FormData(document.getElementById('createServer'));
    fetch(api + "servers", {
        method: 'POST',
        body: data
    })
        .then(function (response) {
            if (response.ok) {
                return response.text()
            } else {
                throw "Error en la llamada Ajax";
            }
        })
        .then(function (texto) {
            console.log(texto);
        })
        .catch(function (error) {
            console.log(error);
        });
}

getServers();