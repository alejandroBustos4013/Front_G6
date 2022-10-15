function getMachine(){
    $.ajax({
        url:"http://129.151.105.233:8080/api/Machine/all",
        type:"GET",
        datatype: "JSON",
        success:function(respuesta){
            
            pintarMachine(respuesta);
        }

    });

}

function postMachine(){

    if($("#name").val().length == 0 || $("#brand").val().length == 0 || $("#year").val().length == 0  || $("#description").val().length == 0  || $("#select-categoria").val().length == 0){
        alert("Todos los campos son obligatorios");

    }else{
        let cajasMachine = {
            name:$("#name").val(),
            brand:$("#brand").val(),
            year:$("#year").val(),
            description:$("#description").val(),
            category:{id: +$("#select-categoria").val()}

        };

        $.ajax({
            url:"http://129.151.105.233:8080/api/Machine/save",
            type:"POST",
            datatype: "JSON",
            contentType:"application/json; chartset=utf-8",
            data: JSON.stringify(cajasMachine) ,
            success:function(respuesta){
                alert("Creado exitosamente Maquina!!");

                window.location.reload();
            }

        });
    }

}

function putMachine(idButton){

    if($("#name").val().length == 0 || $("#brand").val().length == 0 || $("#year").val().length == 0  || $("#description").val().length == 0  || $("#select-categoria").val().length == 0){
        alert("Todos los campos son obligatorios");

    }else{

            let cajas = {
                id:idButton,
                name:$("#name").val(),
                brand:$("#brand").val(),
                year:$("#year").val(),
                description:$("#description").val(),
                category:{id: +$("#select-categoria").val()}
            };

            $.ajax({
                url:"http://129.151.105.233:8080/api/Machine/update",
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

function deleteMachine(idButton){
    let id ={
        id:idButton
    };

    $.ajax({
        url:"http://129.151.105.233:8080/api/Machine/"+idButton,
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

function pintarMachine(json_maquinas){

    let myTable = "<table class='w-full text-sm text-center text-purple-900 dark:text-purple-500'>";
    myTable+="<thead class='text-xs text-purple uppercase bg-purple-300 dark:text-purple'>";
        myTable+="<tr>";
            myTable+="<th scope='col' class='py-3 px-6 '> Nombre Maquina</th>";
            myTable+="<th scope='col' class='py-3 px-6 '>Marca</th>";
            myTable+="<th scope='col' class='py-3 px-6 '>Año</th>";
            myTable+="<th scope='col' class='py-3 px-6 '>Descripción</th>";
            myTable+="<th scope='col' class='py-3 px-6 '> Actualizar</th>";
            myTable+="<th scope='col' class='py-3 px-6 '> Eliminar</th>";
        myTable+="</tr>";
    myTable+="</thead>";

    for (i=0;i<json_maquinas.length;i++){
        myTable+="<tr class='bg-purple-100 border-b border-purple-400'>";
        myTable+="<td class='border border-purple-600'>"+json_maquinas[i].name+"</td>";
        myTable+="<td class='border border-purple-600'>"+json_maquinas[i].brand+"</td>";
        myTable+="<td class='border border-purple-600'>"+json_maquinas[i].year+"</td>";
        myTable+="<td class='border border-purple-600'>"+json_maquinas[i].description+"</td>";
        myTable+="<td class='border border-purple-600'> <button onclick='putMachine("+json_maquinas[i].id+")' class='bg-purple hover:bg-purple-500 text-gray-700 font-semibold hover:text-white py-1 px-2 border border-purple-500 hover:border-transparent rounded'> Actualizar </button></td>";
        myTable+="<td class='border border-purple-600'> <button onclick='deleteMachine("+json_maquinas[i].id+")' class='bg-blue hover:bg-blue-500 text-gray-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded'> Borrar </button></td>";
        myTable+="</tr>";
    }
    myTable+="</table>";

    $("#resultadoMachine").html(myTable);

}

function getCategoria_Machine(){
    $.ajax({
        url:"http://129.151.105.233:8080/api/Category/all",
        type:"GET",
        datatype: "JSON",
        success:function(respuesta){
            let $select = $("#select-categoria");
            $.each(respuesta, function(id, name){
                $select.append('<option value='+name.id+'>'+name.name+' </option>')
            })

        }

    });
}