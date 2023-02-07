// const api = 'http://127.0.0.1:8000/api/';
const api = 'http://api.test/api/';


let params = window.location.search.substring(1).split("=");
let serverId = params[1];

function getServers() {
    let serverInfo = document.getElementById("server-info");
    fetch(api + "servers/" + serverId)
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((data) => {
            let server = data;
            let id = document.createElement('h4');
            let ipv4 = document.createElement('h4');
            let ipv6 = document.createElement('h4');
            let location = document.createElement('h4');
            let description = document.createElement('h4');

            id.innerHTML = server.id;
            ipv4.innerHTML = server.ipv4;
            ipv6.innerHTML = server.ipv6;
            location.innerHTML = server.location;
            description.innerHTML = server.description;

            document.getElementById("server-id").appendChild(id);
            document.getElementById("server-ipv4").value = server.ipv4;
            document.getElementById("server-ipv6").value = server.ipv6;
            document.getElementById("server-location").value = server.location;
            document.getElementById("server-description").value = server.description;


        }).catch(function (error) {
            console.log(error);
        });
}

function getLogs() {
    let table = document.getElementById('logs-table');
    fetch(api + "servers/" + serverId + "/logs")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let logs = data;
            logs.map(function (log) {
                let tr = document.createElement('tr');
                tr.setAttribute("id", log.id);
                let id = document.createElement('td');
                let timestamp = document.createElement('td');
                let description = document.createElement('td');
                let options = document.createElement('td')
                let view = document.createElement("button");
                view.innerHTML = "View";
                view.onclick = viewLog;
                let del = document.createElement("button");
                del.innerHTML = "Delete";
                del.onclick = deleteLog;

                id.innerHTML = log.id;
                timestamp.innerHTML = log.timestamp;
                description.innerHTML = log.description;
                options.appendChild(view);
                options.appendChild(del);
                tr.appendChild(id);
                tr.appendChild(timestamp);
                tr.appendChild(description);
                tr.appendChild(options);
                table.appendChild(tr);
            });
        }).catch(function (error) {
            console.log(error);
        });
}

function clearLogs() {
    let table = document.getElementById('logs-table');
    while (table.childNodes.length > 2) {
        table.lastChild.remove();
    }
}

function viewLog() {
    let id = this.parentNode.parentNode.id;
    window.location = "log.html?id=" + id;
}


function deleteLog() {
    let id = this.parentNode.parentNode.id;
    console.log(id);
    fetch(api + "logs/" + id, {
        method: 'DELETE',
    })
        .then((response) => {
            clearLogs();
            getLogs();
        })
        .then(response => console.log(response))
}


function createLog() {
    console.log("postResult");
    let data = new FormData(document.getElementById('createLog'));
    fetch(api + "servers/" + serverId + "/logs", {
        method: 'POST',
        body: data
    })
        .then(function (response) {
            if (response.ok) {
                clearLogs();
                getLogs();
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

function updateServer() {

    const dataObject = {
        ipv4: document.getElementById("server-ipv4").value,
        ipv6: document.getElementById("server-ipv6").value,
        location: document.getElementById("server-location").value,
        description: document.getElementById("server-description").value,
    };

    const putData = async () => {
        const response = await fetch(api + "servers/" + serverId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataObject)
        });

        const data = await response.json();

        console.log(data);
    };
    putData();

}

getServers();
getLogs();