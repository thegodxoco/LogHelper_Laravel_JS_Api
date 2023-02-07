function load(id){
    fetch('http://127.0.0.1:8000/api/logs/'+id)
    .then( response => {
        console.log(response.status);
        if(response.status == 200) {
            response.json().then(function(json){
                console.log(json.timestamp);
                vartimestamp= document.getElementById("timestamp");
                vartimestamp.value=json.timestamp;

                description = document.getElementById("description");
                description.value=json.description;

                server_id = document.getElementById("server_id");
                server_id.value= json.server_id;
            });
        }else {
            throw "Respuesta incorrecta del servidor"; 
          }
    })
}


function updateLog(){
    var x = document.getElementById("timestamp");
console.log(x);
    const dataObject = {
        
        //timestamp: 'pr4',
        timestamp: document.getElementById("timestamp").value,
        description: document.getElementById("description").value,
        server_id: 1,
    };
  
    const putData = async ( ) =>{
        const response = await fetch('http://127.0.0.1:8000/api/logs/2', {
            method: 'PUT', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataObject)
        });
     
       const data = await response.json();
     
       // now do whatever you want with the data  
        console.log(data);
     };
     putData();
    
}

//updateLog();



load(2);