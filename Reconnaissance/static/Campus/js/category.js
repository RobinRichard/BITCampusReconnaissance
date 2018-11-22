$(document).ready(function() {

    $("#ccolor").spectrum({
        preferredFormat: "hex",
        showInput: true,
        showPalette: true,
        showInitial: true,
        palette: [["red", "rgba(0, 255, 0, .5)", "rgb(0, 0, 255)"]]
    });
    $("#ccolor").show();

      $.ajax({
            type: "POST",
            url: 'ajax/getCategory',
            data: {
                'category_id' : '' ,'csrfmiddlewaretoken' : $('input[name="csrfmiddlewaretoken"]').val()
            },
            dataType: 'json',
            success: function (data) {
                if(data.flag == 0)
                    alert(data.result)
                if(data.flag == 1){
                 var object = JSON.parse(data.result)
                 console.log(object)
                 var str = ''
                  $.each(object, function(i,element){
                    str += '<tr class="odd gradeX"><td>'+element['fields'].category_name+'</td>';
                    str += '<td>'+element['fields'].category_color+'</td>';
                    str += '<td><div class="text-center"><a  class="btn btn-social-icon btn-facebook editcategory" data-id="'+element['pk']+'"><i class="fa fa-pencil"></i></a><a class="btn btn-social-icon btn-pinterest deletecategory" data-name="'+element['fields'].category_name+'" data-id="'+element['pk']+'"><i class="fa fa-trash-o"></i></a></div></td></tr>';
                    });
                     $('#categorytable').append(str);
                     $('#categorytable').DataTable({
                        responsive: true
                     });
                }
               
            },
            error: function (jqXHR, exception) {
             alert("Ajax loading Error");
            }
     });

    $('#wrapper').on('click','.addcategory', function(){
        $('#cid').val("");
        $('#cname').val("");
        $('#ccolor').val("");
        $('#cicon').val("");
        $('.help-text').text("");
        $('#categoryModal').modal({backdrop: 'static', keyboard: false});
    });

   

    $('#wrapper').on('click','#categortSave', function(){
        category_id = $('#cid').val();
        category_name = $('#cname').val();
        category_color = $('#ccolor').val();
        category_icon = $('#cicon').val();
        var validation = '0';
        if(category_name==""){
           $('#cname').parent('div').find('p').text('Enter Name')
            validation = '1';
        }
        if(category_color==""){
            $('#ccolor').parent('div').find('p').text('Choose color')
             validation = '1';
         }
        if(category_icon==""){
            $('#cicon').parent('div').find('p').text('Enter icon Name')
             validation = '1';
         }

        if(validation=='0'){

            $.ajax({
            type: "POST",
            url: 'ajax/categoryaction',
            data: {
                'id' : category_id,
                'category_name' : category_name ,
                'category_color' : category_color ,
                'category_icon' : category_icon ,
                'csrfmiddlewaretoken' : $('input[name="csrfmiddlewaretoken"]').val()
            },
            dataType: 'json',
            success: function (data) {
                console.log(data)
                if(data.flag == 0)
                    alert(data.result)
                if(data.flag == 1){
                    alert(data.result)
                    $('#categoryModal').modal('hide');
                    window.location='Category';
                }
            },
            error: function (jqXHR, exception) {
             alert("Ajax loading Error");
            }
          });
        }
        else{
        return false;
        }
    });

  

    $('#wrapper').on('click','.editcategory', function(){
     var id = $(this).attr('data-id');
     $('.help-text').text("");
     $.ajax({
            type: "POST",
            url: 'ajax/getCategory',
            data: {
                'category_id' : id ,'csrfmiddlewaretoken' : $('input[name="csrfmiddlewaretoken"]').val()
            },
            dataType: 'json',
            success: function (data) {
                if(data.flag == 0)
                    alert(data.result)
                if(data.flag == 1){
                    var object = JSON.parse(data.result)
                    $('#cid').val(id);
                    $('#cname').val(object[0]['fields'].category_name);
                    $('#ccolor').val(object[0]['fields'].category_color);
                    $('#cicon').val(object[0]['fields'].category_icon);
                    $("#ccolor").spectrum("set", object[0]['fields'].category_color);
                    $('#categoryModal').modal({backdrop: 'static', keyboard: false});
                }
            },
            error: function (jqXHR, exception) {
             alert("Ajax loading Error");
            }
     });
    });

    //delete tournament
    $('#wrapper').on('click','.deletetournament', function(){
     var id = $(this).attr('data-id');
     var name = $(this).attr('data-name');
     $.confirm({
        title: 'Sure!',
        content: 'You want to delete tournament "'+name+'"',
        type: 'dark',
        typeAnimated: true,
        buttons: {
            tryAgain: {
                text: 'Delete',
                btnClass: 'btn-red',
                action: function(){
                      $.ajax({
                        type: "POST",
                        url: 'ajax/deletetournament',
                        data: {
                            'tournament_id' : id ,'csrfmiddlewaretoken' : $('input[name="csrfmiddlewaretoken"]').val()
                        },
                        dataType: 'json',
                        success: function (data) {
                            if(data.flag == 0){
                                $.confirm({
                                title: 'Warning!',
                                content: data.result,
                                buttons: {
                                    Ok: function () {
                                    }
                                }
                                });
                            }
                            if(data.flag == 1){
                                $.confirm({
                                title: 'Success',
                                content: 'Tournament "' +name+'" deleted',
                                buttons: {
                                    Ok: function () {
                                        window.location='tournament';
                                    }
                                }
                            });
                            }
                        },
                        error: function (jqXHR, exception) {
                        alert("Ajax loading Error");
                        }
                });
                }
            },
            close: function () {
            }
        }
    });
   
    });

});

