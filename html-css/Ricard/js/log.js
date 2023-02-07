const api = 'http://api.test/api/';

let params = window.location.search.substring(1).split("=");
let logId = params[1];

function getLog() {
    fetch(api + "logs/" + logId)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let log = data;
            let id = document.createElement('h4');
            let timestamp = document.createElement('h4');
            let description = document.createElement('h4');

            id.innerHTML = log.id;
            timestamp.innerHTML = log.timestamp;
            description.innerHTML = log.description;

            document.getElementById("log-id").appendChild(id);
            document.getElementById("log-timestamp").appendChild(timestamp);
            document.getElementById("log-description").value = log.description;

        }).catch(function (error) {
            console.log(error);
        });
}
function updateLog() {
    console.log(document.getElementById("log-description").value);
    const dataObject = {
        description: document.getElementById("log-description").value,
    };

    const putData = async () => {
        const response = await fetch(api + 'logs/' + logId, {
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

getLog();