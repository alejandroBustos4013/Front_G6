function getMessage(){
    $.ajax({
        url:"http://129.151.105.233:8080/api/Message/all",
        type:"GET",
        datatype: "JSON",
        success:function(respuesta){

            pintarMessage(respuesta);
        }

    });

}

function postMessage(){

    if($("#messageText").val().length == 0 || $("#select-client").val().length == 0 || $("#select-machine").val().length == 0 ){
        alert("Todos los campos son obligatorios");

    }else{
        let cajasMessage = {
            messageText:$("#messageText").val(),
            client:{idClient: +$("#select-client").val()},
            machine:{id: +$("#select-machine").val()},

        };

        $.ajax({
            url:"http://129.151.105.233:8080/api/Message/save",
            type:"POST",
            datatype: "JSON",
            contentType:"application/json; chartset=utf-8",
            data: JSON.stringify(cajasMessage) ,
            success:function(respuesta){
                alert("Mensaje registrado exitosamente!!");

                window.location.reload();
            }

        });
    }
}

function putMessage(idButton){

    if($("#messageText").val().length == 0 || $("#select-client").val().length == 0 || $("#select-machine").val().length == 0 ){
        alert("Todos los campos son obligatorios");

    }else{

            let cajas = {
            idMessage:idButton,
            messageText:$("#messageText").val(),
            client:{idClient: +$("#select-client").val()},
            machine:{id: +$("#select-machine").val()},
            };

        $.ajax({
            url:"http://129.151.105.233:8080/api/Message/update",
            type:"PUT",
            datatype: "JSON",
            contentType:"application/json; chartset=utf-8",
            data: JSON.stringify(cajas) ,
            success:function(respuesta){
                alert("Actualizado exitosamente !!");

                window.location.reload();
            }

        });

    }

}

function deleteMessage(idButton){
    let id ={
        idMessage:idButton
    };

    $.ajax({
        url:"http://129.151.105.233:8080/api/Message/"+idButton,
        type:"DELETE",
        datatype: "JSON",
        data: JSON.stringify(id),
        contentType:"application/json",
        success:function(respuesta){

            alert("El mensaje se eliminó correctamente")
            window.location.reload();
        }
    });
    
}

function pintarMessage(respuestaMessage){


    let myTable = "<table class='w-full text-sm text-center text-amber-900 dark:text-amber-500'>";

    myTable+="<thead class='text-xs text-amber uppercase bg-amber-300 dark:text-blue'>";
        myTable+="<tr>";
            myTable+="<th scope='col' class='py-3 px-6 '> Descripción mensaje</th>";
            myTable+="<th scope='col' class='py-3 px-6 '> Nombre cliente</th>";
            myTable+="<th scope='col' class='py-3 px-6 '> Nombre maquina</th>";
            myTable+="<th scope='col' class='py-3 px-6 '> Actualizar</th>";
            myTable+="<th scope='col' class='py-3 px-6 '> Eliminar</th>";
        myTable+="</tr>";
    myTable+="</thead>";
    for (i=0;i<respuestaMessage.length;i++){
        myTable+="<tr class='bg-amber-50 border-b borderamber-400'>";
        myTable+="<td class='border border-amber-600'>"+respuestaMessage[i].messageText+"</td>";
        myTable+="<td class='border border-amber-600'>"+respuestaMessage[i].client.name+"</td>";
        myTable+="<td class='border border-amber-600'>"+respuestaMessage[i].machine.name+"</td>";
        myTable+="<td class='border border-amber-600'> <button onclick='putMessage("+respuestaMessage[i].idMessage+")' class='bg-purple hover:bg-purple-500 text-gray-700 font-semibold hover:text-white py-1 px-2 border border-purple-500 hover:border-transparent rounded'> Actualizar </button></td>";
        myTable+="<td class='border border-amber-600'> <button onclick='deleteMessage("+respuestaMessage[i].idMessage+")' class='bg-blue hover:bg-blue-500 text-gray-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded'> Borrar </button></td>";
        myTable+="</tr>";
    }
    myTable+="</table>";

    $("#resultadoMensaje").html(myTable);

}

function getMachine_Message(){
    $.ajax({
        url:"http://129.151.105.233:8080/api/Machine/all",
        type:"GET",
        datatype: "JSON",
        success:function(respuesta){
            let $select = $("#select-machine");
            $.each(respuesta, function(id, name){
                $select.append('<option value='+name.id+'>'+name.name+' </option>')
            })

        }

    });
}

function getClient_Message(){
    $.ajax({
        url:"http://129.151.105.233:8080/api/Client/all",
        type:"GET",
        datatype: "JSON",
        success:function(respuesta){
            let $select = $("#select-client");
            $.each(respuesta, function(id, name){
                $select.append('<option value='+name.idClient+'>'+name.name+' </option>')
            })

        }

    });
}