// get post put y delete

function getCategoria(){
    
    $.ajax({
        url:"http://129.151.105.233:8080/api/Category/all",
        type:"GET",
        datatype: "JSON",
        success:function(respuesta){

            pintarCategoria(respuesta);
        }

    });

}

function postCategoria(){

    if($("#name").val().length == 0 || $("#description").val().length == 0 ){
        alert("Todos los campos son obligatorios");

    }else{

            let cajas = {
                 name:$("#name").val(),
                 description:$("#description").val()
            };

        $.ajax({
            url:"http://129.151.105.233:8080/api/Category/save",
            type:"POST",
            datatype: "JSON",
            contentType:"application/json; chartset=utf-8",
            data: JSON.stringify(cajas) ,
            success:function(respuesta){
                alert("Creado exitosamente !!");

                window.location.reload();
            }

        });

    }

}

function putCategoria(idButton){
    if($("#name").val().length == 0 || $("#description").val().length == 0 ){
        alert("Todos los campos son obligatorios");

    }else{

            let cajas = {
                id:idButton,
                 name:$("#name").val(),
                 description:$("#description").val()
            };

        $.ajax({
            url:"http://129.151.105.233:8080/api/Category/update",
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

function deleteCategoria(idButton){
    let id ={
        id:idButton
    };

    $.ajax({
        url:"http://129.151.105.233:8080/api/Category/"+idButton,
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

//Function additional for show datas of category
function pintarCategoria(respuesta){

    let myTable = "<table  class='w-full text-sm text-center text-green-900 dark:text-green-500 '>";
    myTable+="<thead class='text-xs text-green uppercase bg-green-400 dark:text-green'>";
        myTable+="<tr>";
            myTable+="<th scope='col' class='py-3 px-6 '> Nombre Categoria</th>";
            myTable+="<th scope='col' class=' py-3 px-6'>Descripción</th>";
            myTable+="<th scope='col' class=' py-3 px-6 '> Actualizar</th>";
            myTable+="<th scope='col' class=' py-3 px-6'> Eliminar</th>";
        myTable+="</tr>";
    myTable+="</thead>";

    for (i=0;i<respuesta.length;i++){
        myTable+="<tr class='bg-green-100 border-b border-green-400'>";
        myTable+="<td class='border border-green-600'>"+respuesta[i].name+"</td>";
        myTable+="<td class='border border-green-600'>"+respuesta[i].description+"</td>";
        myTable+="<td class='border border-green-600'> <button onclick='putCategoria("+respuesta[i].id+")' class='bg-purple hover:bg-purple-500 text-gray-700 font-semibold hover:text-white py-1 px-2 border border-purple-500 hover:border-transparent rounded'> Actualizar </button></td>";
        myTable+="<td class='border border-green-600'> <button onclick='deleteCategoria("+respuesta[i].id+")' class='bg-blue hover:bg-blue-500 text-gray-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded'> Borrar </button></td>";
        myTable+="</tr>";
    }
    myTable+="</table>";

    $("#resultado1").html(myTable);

}