function traerReporteStatus(){
    $.ajax({
        url:"http://129.151.105.233:8080/api/Reservation/report-status",
        type:"GET",
        datatype: "JSON",
        success:function(respuesta){

            pintarStatus(respuesta);
        }

    });

}



function traerReporteFechas(){
    let startDate = $("#startDate").val() + "T00:00:00.000+00:00";
    let devolutionDate = $("#devolutionDate").val() + "T23:59:59.000+00:00";
    $.ajax({
        url:"http://129.151.105.233:8080/api/Reservation/report-dates/"+startDate+"/"+devolutionDate,
        type:"GET",
        datatype: "JSON",
        success:function(respuesta){
            console.log(respuesta);

            pintarReporteFechas(respuesta);
        }

    });

}



function traerReporteClientes(){
    $.ajax({
        url:"http://129.151.105.233:8080/api/Reservation/report-clients",
        type:"GET",
        datatype: "JSON",
        success:function(respuesta){

            pintarReporteClientes(respuesta);
        }

    });
    
}

function pintarStatus(respuestaStatus){


    let myTable = "<table class='w-full text-sm text-center text-gray-500 dark:text-gray-400'>";

        myTable+="<thead class='text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400'>";
            myTable+="<tr>";
                myTable+="<th  scope='col' class='py-3 px-6'> Numero de reservaciones completadas</th>";
                myTable+="<th  scope='col' class='py-3 px-6'>Numero de reservaciones canceladas</th>";
            myTable+="</tr>";
        myTable+="</thead>";
    
        myTable+="<tr class='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>";
        myTable+="<td class='py-4 px-6'>"+respuestaStatus.completed+"</td>";
        myTable+="<td class='py-4 px-6'>"+respuestaStatus.cancelled+"</td>";
        myTable+="</tr>";
    myTable+="</table>";

    $("#resultadoStatus").html(myTable);

}
//////////////////////////////////////////////////////////////////////////////////////////////////////
function pintarReporteFechas(respuestaFechas){

    if($("#startDate").val().length == 0 || $("#devolutionDate").val().length == 0 ){
        alert("Debe ingresar los intervalos de busqueda !!!");

    }else{

        let myTable = "<table class='w-full text-sm text-center text-gray-500 dark:text-gray-400'>";

        myTable+="<thead class='text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400'>";
            myTable+="<tr>";
                myTable+="<th scope='col' class='py-3 px-6'> N° Reservacion</th>";
                myTable+="<th scope='col' class='py-3 px-6'>Fecha de inicio</th>";
                myTable+="<th scope='col' class='py-3 px-6'> Fecha de entrega</th>";
                myTable+="<th scope='col' class='py-3 px-6'> Status</th>";
                myTable+="<th scope='col' class='py-3 px-6'> Nombre maquina</th>";
                myTable+="<th scope='col' class='py-3 px-6'> Nombre Cliente</th>";
            myTable+="</tr>";
        myTable+="</thead>";

        for (i=0;i<respuestaFechas.length;i++){
            myTable+="<tr class='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>";
                myTable+="<td class='py-4 px-6'>"+respuestaFechas[i].idReservation+"</td>";
                myTable+="<td class='py-4 px-6'>"+respuestaFechas[i].startDate+"</td>";
                myTable+="<td class='py-4 px-6'>"+respuestaFechas[i].devolutionDate+"</td>";
                myTable+="<td class='py-4 px-6'>"+respuestaFechas[i].status+"</td>";
                myTable+="<td class='py-4 px-6'>"+respuestaFechas[i].machine.name+"</td>";
                myTable+="<td class='py-4 px-6'>"+respuestaFechas[i].client.name+"</td>";
            myTable+="</tr>"; 
        }
            
        myTable+="</table>";
        $("#resultadoFechas").html(myTable);
    }
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function pintarReporteClientes(respuestaClientes){

    let myTable = "<table class='w-full text-sm text-center text-gray-500 dark:text-gray-400'>";

    myTable+="<thead class='text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400'>";
        myTable+="<tr>";
            myTable+="<th rowspan='2' scope='col' class='py-3 px-6'> Nombre</th>";
            myTable+="<th rowspan='2' scope='col' class='py-3 px-6'>Email</th>";
            myTable+="<th colspan='4' scope='col' class='py-3 px-6 '> Reservaciones</th>";
        myTable+="</tr>";

        myTable+="<tr>";
            myTable+="<th scope='col' class='py-3 px-6'> Fecha inicio</th>";
            myTable+="<th scope='col' class='py-3 px-6'> fecha Entrega</th>";
            myTable+="<th scope='col' class='py-3 px-6'> Nombre maquina</th>";
            myTable+="<th scope='col' class='py-3 px-6'> Status</th>";
        myTable+="</tr>";
    myTable+="</thead>";


    

    for (i=0;i<respuestaClientes.length;i++){
        let longitud = respuestaClientes[i].client.reservations.length;
        myTable+="<tr class='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>";
        myTable+="<td class='py-3 px-6' rowspan='"+(longitud+1)+"'>"+respuestaClientes[i].client.name+"</td>";
        myTable+="<td class='py-3 px-6' rowspan='"+(longitud+1)+"'>"+respuestaClientes[i].client.email+"</td>";
        myTable+="</tr>";

        for(j=0;j<longitud;j++){
            myTable+="<tr class='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>";
                myTable+="<td class='py-4 px-6'>"+respuestaClientes[i].client.reservations[j].startDate+"</td>";
                myTable+="<td class='py-4 px-6'>"+respuestaClientes[i].client.reservations[j].devolutionDate+"</td>";
                myTable+="<td class='py-4 px-6'>"+respuestaClientes[i].client.reservations[j].machine.name+"</td>";
                myTable+="<td class='py-4 px-6'>"+respuestaClientes[i].client.reservations[j].status+"</td>";
            myTable+="</tr>"; 
        }
            
    }
    myTable+="</table>";


 
    $("#resultadoClientes").html(myTable);

}

