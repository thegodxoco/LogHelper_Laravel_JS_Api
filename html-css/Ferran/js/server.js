const api = 'http://127.0.0.1:8000/api/';

let params = window.location.search.substring(1).split("=");
let serverId = params[1];
var ipv4 = new Array();
var ipv6 = new Array();
var ipv6Ac;
var ipv4Ac;
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
            ipv4Ac = server.ipv4;
            ipv6Ac = server.ipv6;

            document.getElementById("server-id").appendChild(id);
            /*document.getElementById("server-ipv4").appendChild(ipv4);
            document.getElementById("server-ipv6").appendChild(ipv6);
            document.getElementById("server-location").appendChild(location);
            document.getElementById("server-description").appendChild(description);*/
            document.getElementById("server-ipv4").value=server.ipv4;
            document.getElementById("server-ipv6").value=server.ipv6;
            document.getElementById("server-location").value=server.location;
            document.getElementById("server-description").value=server.description;


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
    window.location = "log.html?id="+id;
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
    //console.log("postResult");
    let data = new FormData(document.getElementById('createLog'));
    console.log(data.get("description"));
    if(data.get("description") !== ""){
    fetch(api + "servers/" + serverId + "/logs", {
        method: 'POST',
        body: data
    })
        .then(function (response) {
            console.log(response.status);
            if (response.status===200) {
                clearLogs();
                getLogs();
                return response.text()
            } else {
                console.log("error "+response.status);
                console.log(response.statusText);
                //throw "Error en la llamada Ajax";
            }
        })
        /*.then(function (texto) {
            console.log(texto);
        })
        .catch(function (error) {
            console.log(error);
        });*/
    }else{
        console.log("error");
    var div = document.getElementById("show");
    div.setAttribute("class","error");
    div.innerHTML="<b>camp description buit</b>";
    setTimeout(function(){
        div.setAttribute("class","");
        div.innerHTML="";
    },2000);
    }
  }

  function updateServer(){
   //console.log("pr");
    const dataObject = {
        ipv4 : document.getElementById("server-ipv4").value,
        ipv6 : document.getElementById("server-ipv6").value,
        location : document.getElementById("server-location").value,
        description : document.getElementById("server-description").value,
    };

if(dataObject.ipv4 ==="" &&  dataObject.ipv6===""){
    var div = document.getElementById("show");
    div.setAttribute("class","error");
    div.innerHTML="<b>has d'omplir algun camp de ip</b>";
    setTimeout(function(){
        div.setAttribute("class","show");
        div.innerHTML="";
    },2000);
}else if(checkIfValidIPv4()===false ){
    var div = document.getElementById("show");
    div.setAttribute("class","error");
    div.innerHTML="<b>IPv4 Incorrecta</b>";
    setTimeout(function(){
        div.setAttribute("class","show");
        div.innerHTML="";
    },2000);
}else if(checkIfValidIPv6()===false ){
    var div = document.getElementById("show");
    div.setAttribute("class","error");
    div.innerHTML="<b>IPv6 Incorrecta</b>";
    setTimeout(function(){
        div.setAttribute("class","show");
        div.innerHTML="";
    },2000);
}else if(ipv4r()===false ){
    var div = document.getElementById("show");
    div.setAttribute("class","error");
    div.innerHTML="<b>IPv4 Repetida</b>";
    setTimeout(function(){
        div.setAttribute("class","show");
        div.innerHTML="";
    },2000);

}else if(ipv6r()===false ){
    var div = document.getElementById("show");
    div.setAttribute("class","error");
    div.innerHTML="<b>IPv6 Repetida</b>";
    setTimeout(function(){
        div.setAttribute("class","show");
        div.innerHTML="";
    },2000);
}else if(dataObject.location == "" ){
    var div = document.getElementById("show");
    div.setAttribute("class","error");
    div.innerHTML="<b>camp location buit</b>";
    setTimeout(function(){
        div.setAttribute("class","show");
        div.innerHTML="";
    },2000);
}else if( dataObject.description == ""){
    var div = document.getElementById("show");
    div.setAttribute("class","error");
    div.innerHTML="<b>camp description buit</b>";
    setTimeout(function(){
        div.setAttribute("class","show");
        div.innerHTML="";
    },2000);

  }else{

    
    const putData = async ( ) =>{
        const response = await fetch(api + "servers/"+ serverId, {
            method: 'PUT', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataObject)
        });
        console.log(response.status);
        if(response.status==200){
       const data = await response.json();
       var div = document.getElementById("show");
            div.setAttribute("class","good");
            div.innerHTML="<b>server edited successfully</b>";
            setTimeout(function(){
                ipv4Ac = dataObject.ipv4;
                ipv6Ac = dataObject.ipv6;
                saveIps();
                div.setAttribute("class","");
                div.innerHTML="";
            },2000);
        }else{
            var div = document.getElementById("show");
            div.setAttribute("class","error");
            div.innerHTML="<b>error number:"+response.status+"->"+response.statusText+"</b>";
            setTimeout(function(){
                div.setAttribute("class","");
                div.innerHTML="";
            },2000);
        }
      
     };
     putData();
  }
   
    
}
function checkIfValidIPv6() {
    // Regular expression to check if string is a IPv6 address
    const regexExp = /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/gi;
  if(document.getElementById("server-ipv6").value === ""){
      return true;
  }
    return regexExp.test(document.getElementById("server-ipv6").value);
  }
  function checkIfValidIPv4() {
    // Regular expression to check if string is a IPv6 address
    const regexExp = /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$/gm;
    if(document.getElementById("server-ipv4").value === ""){
        return true;
    }
    return regexExp.test(document.getElementById("server-ipv4").value);
  }

  function ipv4r(){
    var x = true;
    var y = false;
    if(document.getElementById("server-ipv4").value !== ""){
        if(document.getElementById("server-ipv4").value !== ipv4Ac){
        for(var i = 0 ; i<ipv4.length;i++){
            console.log(ipv4[i]);
            if(ipv4[i] === document.getElementById("server-ipv4").value){
                x=false;
            }
        }
    }
    }   
    console.log(x);
        return x;
    }

    function ipv6r(){
        
        var x = true;
        
        if(document.getElementById("server-ipv6").value !== ""){
            if(document.getElementById("server-ipv6").value !== ipv6Ac){
            for(var i = 0 ; i<ipv6.length;i++){
               
               
                if(ipv6[i] === document.getElementById("server-ipv6").value){
                   
                    x=false;
                    
                    
            }
            }
        }
    }

            return x;
        }
       function saveIps(){
        fetch(api + "servers")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log("p");
            let servers = data;
            let x = true;
            for(var i = 0;i<servers.length;i++){
                ipv4[i]=servers[i].ipv4;
                ipv6[i]=servers[i].ipv6;
            }
            
            
      }).catch(function (error) {
        console.log(error);
        return false;
      });
      
        }

getServers();
getLogs();
saveIps();