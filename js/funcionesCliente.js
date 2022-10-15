
function getClient(){
    $.ajax({
        url:"http://129.151.105.233:8080/api/Client/all",
        type:"GET",
        datatype: "JSON",
        success:function(respuesta){

            pintarCliente(respuesta);
        }

    });

}

function postClient(){

    if($("#name").val().length == 0 || $("#email").val().length == 0 || $("#password").val().length == 0 || $("#age").val().length == 0 ){
        alert("Todos los campos son obligatorios");

    }else{
        let cajasCliente = {
            name:$("#name").val(),
            email:$("#email").val(),
            age:$("#age").val(),
            password:$("#password").val(),

        };

        $.ajax({
            url:"http://129.151.105.233:8080/api/Client/save",
            type:"POST",
            datatype: "JSON",
            contentType:"application/json; chartset=utf-8",
            data: JSON.stringify(cajasCliente) ,
            success:function(respuesta){
                alert("Cliente creado exitosamente!!");

                window.location.reload();
            }

        });
    }    
}

function putClient(idButton){
    if($("#name").val().length == 0 || $("#email").val().length == 0 || $("#password").val().length == 0 || $("#age").val().length == 0 ){
        alert("Todos los campos son obligatorios");

    }else{

            let cajas = {
                idClient:idButton,
                name:$("#name").val(),
                email:$("#email").val(),
                age:$("#age").val(),
                password:$("#password").val()
            };

            $.ajax({
                url:"http://129.151.105.233:8080/api/Client/update",
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

function deleteClient(idButton){
    let id ={
        idClient:idButton
    };

    $.ajax({
        url:"http://129.151.105.233:8080/api/Client/"+idButton,
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

function pintarCliente(respuestaCliente){

    let myTable = "<table class='w-full text-sm text-center text-blue-900 dark:text-blue-500'>";

    myTable+="<thead class='text-xs text-blue uppercase bg-blue-300 dark:text-blue'>";
        myTable+="<tr>";
            myTable+="<th scope='col' class='py-3 px-6 '> Nombre</th>";
            myTable+="<th scope='col' class='py-3 px-6 '>Correo Electronico</th>";
            myTable+="<th scope='col' class='py-3 px-6 '> Contraseña</th>";
            myTable+="<th scope='col' class='py-3 px-6 '> Edad</th>";
            myTable+="<th scope='col' class='py-3 px-6 '> Actualizar</th>";
            myTable+="<th scope='col' class='py-3 px-6 '> Eliminar</th>";
        myTable+="</tr>";
    myTable+="</thead>";

    for (i=0;i<respuestaCliente.length;i++){
        myTable+="<tr class='bg-blue-100 border-b border-blue-400'>";
        myTable+="<td class='border border-blue-600'>"+respuestaCliente[i].name+"</td>";
        myTable+="<td class='border border-blue-600''>"+respuestaCliente[i].email+"</td>";
        myTable+="<td class='border border-blue-600''>"+respuestaCliente[i].password+"</td>";
        myTable+="<td class='border border-blue-600''>"+respuestaCliente[i].age+"</td>";
        myTable+="<td class='border border-blue-600''> <button onclick='putClient("+respuestaCliente[i].idClient+")'  class='bg-purple hover:bg-purple-500 text-gray-700 font-semibold hover:text-white py-1 px-2 border border-purple-500 hover:border-transparent rounded'> Actualizar </button></td>";
        myTable+="<td class='border border-blue-600''> <button onclick='deleteClient("+respuestaCliente[i].idClient+")' class='bg-blue hover:bg-blue-500 text-gray-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded'> Borrar </button></td>";
        myTable+="</tr>";
    }
    myTable+="</table>";

    $("#resultadoCliente").html(myTable);

}