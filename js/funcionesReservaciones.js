function getReservation(){
    $.ajax({
        url:"http://129.151.105.233:8080/api/Reservation/all",
        type:"GET",
        datatype: "JSON",
        success:function(respuesta){

            pintarReservation(respuesta);
        }

    });

}

function postReservation(){

    if($("#startDate").val().length == 0 || $("#devolutionDate").val().length == 0 || $("#status").val().length == 0 || $("#select-client").val().length == 0 || $("#select-machine").val().length == 0 ){
        alert("Todos los campos son obligatorios");

    }else{
        let cajasReservation = {
            startDate:$("#startDate").val(),
            devolutionDate:$("#devolutionDate").val(),
            status:$("#status").val(),
            client:{idClient: +$("#select-client").val()},
            machine:{id: +$("#select-machine").val()},

        };

        $.ajax({
            url:"http://129.151.105.233:8080/api/Reservation/save",
            type:"POST",
            datatype: "JSON",
            contentType:"application/json; chartset=utf-8",
            data: JSON.stringify(cajasReservation) ,
            success:function(respuesta){
                alert("Reservation exitosa!!");

                window.location.reload();
            }

        });
    }

}

function putReservation(idButton){
    if($("#startDate").val().length == 0 || $("#devolutionDate").val().length == 0 || $("#status").val().length == 0 || $("#select-client").val().length == 0 || $("#select-machine").val().length == 0 ){
        alert("Todos los campos son obligatorios");

    }else{

            let cajas = {
                idReservation:idButton,
                startDate:$("#startDate").val(),
                devolutionDate:$("#devolutionDate").val(),
                status:$("#status").val(),
                client:{idClient: +$("#select-client").val()},
                machine:{id: +$("#select-machine").val()}
            };

        $.ajax({
            url:"http://129.151.105.233:8080/api/Reservation/update",
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

function deleteReservation(idButton){
    let id ={
        idReservation:idButton
    };

    $.ajax({
        url:"http://129.151.105.233:8080/api/Reservation/"+idButton,
        type:"DELETE",
        datatype: "JSON",
        data: JSON.stringify(id),
        contentType:"application/json",
        success:function(respuesta){

            alert("El item se eliminó correctamente")
            window.location.reload();
        }
    });
    
}

function pintarReservation(respuestaReservation){


    let myTable = "<table class='w-full text-sm text-center text-pink-900 dark:text-pink-500'>";

    myTable+="<thead class='text-xs text-pink uppercase bg-pink-300 dark:text-pink'>";
        myTable+="<tr>";
            myTable+="<th scope='col' class='py-3 px-6 '> Fecha de Inicio</th>";
            myTable+="<th scope='col' class='py-3 px-6 '>Fecha de Entrega</th>";
            myTable+="<th scope='col' class='py-3 px-6 '> Estado</th>";
            myTable+="<th scope='col' class='py-3 px-6 '> Maquina</th>";
            myTable+="<th scope='col' class='py-3 px-6 '> Cliente</th>";
            myTable+="<th scope='col' class='py-3 px-6 '> Actualizar</th>";
            myTable+="<th scope='col' class='py-3 px-6 '> Eliminar</th>";

        myTable+="</tr>";
    myTable+="</thead>";
    for (i=0;i<respuestaReservation.length;i++){
        myTable+="<tr class='bg-pink-50 border-b borderamber-400'>";
        myTable+="<td class='border border-pink-600'>"+respuestaReservation[i].startDate+"</td>";
        myTable+="<td class='border border-pink-600'>"+respuestaReservation[i].devolutionDate+"</td>";
        myTable+="<td class='border border-pink-600'>"+respuestaReservation[i].status+"</td>";
        myTable+="<td class='border border-pink-600'>"+respuestaReservation[i].machine.name+"</td>";
        myTable+="<td class='border border-pink-600'>"+respuestaReservation[i].client.name+"</td>";
        myTable+="<td class='border border-pink-600'> <button onclick='putReservation("+respuestaReservation[i].idReservation+")' class='bg-purple hover:bg-purple-500 text-gray-700 font-semibold hover:text-white py-1 px-2 border border-purple-500 hover:border-transparent rounded'> Actualizar </button></td>";
        myTable+="<td class='border border-pink-600'> <button onclick='deleteReservation("+respuestaReservation[i].idReservation+")' class='bg-blue hover:bg-blue-500 text-gray-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded'> Borrar </button></td>";
        
        myTable+="</tr>";
    }
    myTable+="</table>";

    $("#resultadoReservation").html(myTable);

}


function getMachine_Reservation(){
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

function getClient_Reservation(){
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