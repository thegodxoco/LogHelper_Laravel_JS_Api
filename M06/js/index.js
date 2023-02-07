const api = 'http://127.0.0.1:8000/api/';

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
                ipv4.setAttribute("class","ipv4");
                let ipv6 = document.createElement('td');
                ipv6.setAttribute("class","ipv6");
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
    //validateForm();
    //console.log(checkIfValidIPv4());
    //console.log(checkIfValidIPv6());
   //console.log(ipv4r()); 
 if(data.get("ipv4")==="" &&  data.get("ipv6")===""){
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

}else if(data.get("location") == "" ){
    var div = document.getElementById("show");
    div.setAttribute("class","error");
    div.innerHTML="<b>camp location buit</b>";
    setTimeout(function(){
        div.setAttribute("class","show");
        div.innerHTML="";
    },2000);
}else if(data.get("description") == ""){
    var div = document.getElementById("show");
    div.setAttribute("class","error");
    div.innerHTML="<b>camp description buit</b>";
    setTimeout(function(){
        div.setAttribute("class","show");
        div.innerHTML="";
    },2000);
}else{
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
}

function viewServer() {
    let id = this.parentNode.parentNode.id;
    window.location = "server.html?id="+id;
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
//regular expression copiades
//https://stackoverflow.com/questions/23483855/javascript-regex-to-validate-ipv4-and-ipv6-address-no-hostnames
function checkIfValidIPv6() {
    // Regular expression to check if string is a IPv6 address
    const regexExp = /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/gi;
  if(document.getElementById("ipv6").value === ""){
      return true;
  }
    return regexExp.test(document.getElementById("ipv6").value);
  }
  function checkIfValidIPv4() {
    // Regular expression to check if string is a IPv6 address
    const regexExp = /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$/gm;
    if(document.getElementById("ipv4").value === ""){
        return true;
    }
    return regexExp.test(document.getElementById("ipv4").value);
  }

function ipv4r(){
    var ip =document.getElementsByClassName("ipv4");
    var x = true;
    if(document.getElementById("ipv4").value !== ""){
        for(var i = 0 ; i<ip.length;i++){
            if(ip[i].innerHTML === document.getElementById("ipv4").value){
                x=false;
            }
        }
    }
        return x;
    }

    function ipv6r(){
        var ip =document.getElementsByClassName("ipv6");
        var x = true;
        if(document.getElementById("ipv6").value !== ""){
            for(var i = 0 ; i<ip.length;i++){
                
                if(ip[i].innerHTML === document.getElementById("ipv6").value){
                    x=false;
                }
            }
        }
            return x;
        }

    getServers();


  


