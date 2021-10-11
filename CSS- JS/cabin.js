function getInfo()
{
    $.ajax
    ({
        dataType: 'json',
        url:"https://g38f06f9c3a8d07-reto1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/cabin/cabin",
        type:'GET',
 
        success:function(response)
        {
            var info=response.items;
                $("#dashboard").append("<tr>");
                $("#dashboard").append("<th> ID </th>");
                $("#dashboard").append("<th> Brand </th>");
                $("#dashboard").append("<th> Room </th>");
                $("#dashboard").append("<th> Category </th>");
                $("#dashboard").append("<th> Name </th>");               
                $("#dashboard").append("</tr>");

            for(i=0; i<response.items.length; i++)
            {
                console.log(info[i])
                $("#dashboard").append("<tr>");
                $("#dashboard").append("<td>"+info[i].id+"</td>");
                $("#dashboard").append("<td>"+info[i].brand+"</td>");
                $("#dashboard").append("<td>"+info[i].rooms+"</td>");
                $("#dashboard").append("<td>"+info[i].category_id+"</td>");
                $("#dashboard ").append("<td>"+info[i].name+"</td>");
                $("#dashboard ").append('<td><button class="btn" onclick="deleteInfo('+info[i].id+')"><i class="fa fa-trash"></button></td>');
                $("#dashboard ").append('<td><button class="btn" onclick="getItem('+info[i].id+')"><i class="fa fa-edit"></i></button></td>');
                $("#dashboard").append("</tr>");
            }
        },
        error: function(jqXHR, textStatus, errorThrown)
        {
        }
    });
}

function postInfo()
{
    if(!fieldEmpty($("#nId")))
    {
        var info=
        {
            id:$("#nId").val(),
            brand:$("#brand").val(),
            rooms:$("#rooms").val(),
            category_id:$("#category_id").val(),
            name:$("#name").val()
        }
        var toDelete=JSON.stringify(info);
        console.log(toDelete)
        $.ajax
        (
            {
                dataType: 'json',
                data:info,
                url:"https://g38f06f9c3a8d07-reto1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/cabin/cabin",
                type:'POST',

                success:function(response)
                {
                },

                error: function(jqXHR, textStatus, errorThrown)
                {               
                    console.log(errorThrown)
                    console.log(textStatus)
                }
            }
        );
    alert("Saved successfully")
    }
    else
        alert("Add an ID number");
        return;
    
}

function deleteInfo(idDelete)
{
    var info=
    {
        id:idDelete
    }
var toDelete=JSON.stringify(info);
$.ajax
(
    {
        dataType: 'json',
        data:toDelete,
        url:"https://g38f06f9c3a8d07-reto1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/cabin/cabin",
        type:'DELETE',
        contentType:'application/json',

        success:function(response)
        {
            console.log(response);
            alert("Deleted sucessfully!" )
        },
        error: function(jqXHR, textStatus, errorThrown)
        {
        }
    }
);
}

function getItem(idItem)
{
    $.ajax
    ({
        dataType: 'json',
        url:"https://g38f06f9c3a8d07-reto1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/cabin/cabin",
        type:'GET',
        success:function(response)
        {
            console.log(response);
            var info= response.items[0];
            
            $("#nId").val(info.id);
            $("#brand").val(info.brand);
            $("#rooms").val(info.rooms);
            $("#category_id").val(info.category_id);
            $("#name").val(info.name);            
        },
        error: function(jqXHR, textStatus, errorThrown)
        {
        }
    });
}

function updateInfo()
{
    var info=
        {
            id:$("#nId").val(),
            brand:$("#brand").val(),
            rooms:$("#rooms").val(),
            category_id:$("#category_id").val(),
            name:$("#name").val()
        }

        console.log(info)
    var sentInfo=JSON.stringify(info); 
    $.ajax
    (
        {
            dataType: 'json',
            data:sentInfo,
            contentType:'application/json',
            url:"https://g38f06f9c3a8d07-reto1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/cabin/cabin",
            type:'PUT',

            success:function(response)
            {
                console.log(response);
                alert("Updated!")
            },

            error: function(jqXHR, textStatus, errorThrown)
            {
                console.log(textStatus);
                alert("Updated!")
            }
        }
    );
}

function fieldEmpty(campo)
{
    if (campo.val()=="")
        return true;
    else
        return false;

}