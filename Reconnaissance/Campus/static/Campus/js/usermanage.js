$(document).ready(function() {

    //User Management Scripts
    $('#wrapper').on('click','.adduser', function(){
        $('#uid').val("")
        $('#udept').val("");
        $('#uroll').val("");
        $('#uname').val("");
        $('#uemail').val("");
        $('#upassword').val("");
        $('#uphone').val("");
        $('#utype').val("0");
        $('#ustatus').val("1");
        $('#uaddress').val("");
        $('#user_profile_div').show()
        $('#img_profile_div').hide()
        $('#hdn_filename').val("");
        $('.help-text').text("");
        $('#userModal').modal({backdrop: 'static', keyboard: false});
    });

    //user edit button
    
    $('#wrapper').on('click','.btn_edit', function(){
        $.confirm({
        title: 'Sure!',
        content: "You want to change profile image can't undo",
        type: 'dark',
        typeAnimated: true,
        buttons: {
            tryAgain: {
                text: 'change',
                btnClass: 'btn-red',
                action: function(){
                     $('#user_profile_div').show()
                     $('#img_profile_div').hide()
                     $('#hdn_filename').val("");
                }
            },
            close: function () {
            }
        }
    });
    });

    $.ajax({
            type: "POST",
            url: 'ajax/getUser',
            data: {
                'user_id' : '' ,'csrfmiddlewaretoken' : $('input[name="csrfmiddlewaretoken"]').val()
            },
            dataType: 'json',
            success: function (data) {
                if(data.flag == 0)
                    alert(data.result)
                if(data.flag == 1){
                 var str = ''
                  $.each(data.result, function(i,element){
                    str += '<tr class="odd gradeX"><td>'+element.user_name+'</td>';
                    str += '<td>'+element.user_department+'</td>';
                    str += '<td>'+element.user_mail +'</td>';
                    str += '<td>'+element.user_role__user_role+'</td>';
                    str += '<td><div class="text-center"><a  class="btn btn-social-icon btn-facebook edituser" data-id="'+element.id+'"><i class="fa fa-pencil"></i></a><a class="btn btn-social-icon btn-pinterest deleteuser" data-name="'+element.user_name+'" data-id="'+element.id+'"><i class="fa fa-trash-o"></i></a></div></td></tr>';
                    });
                     $('#usertable').append(str);
                     $('#usertable').DataTable({
                        responsive: true
                     });
                }
            },
            error: function (jqXHR, exception) {
             alert("Ajax loading Error");
            }
     });

      // get all user type
    $.ajax({
        type: "POST",
        url: 'ajax/getRole',
        data: {
            'role_id': '', 'csrfmiddlewaretoken': $('input[name="csrfmiddlewaretoken"]').val()
        },
        dataType: 'json',
        success: function (data) {
            if (data.flag == 0)
                alert(data.result)
            if (data.flag == 1) {
                var object = JSON.parse(data.result)
                var str = ''
                $.each(object, function (i, element) {
                    console.log();
                    str += '<option value="' + element['pk'] + '">' + element['fields'].user_role + '</option>'
                });
                $('#utype').append(str)
            }
        },
        error: function (jqXHR, exception) {
            alert("Ajax loading Error");
        }
    });

    $('#wrapper').on('click','#userSave', function(){
        var user_id = $('#uid').val();
        var user_name = $('#uname').val();
        var user_rollno= $('#uroll').val();
        var user_depertment = $('#udept').val();
        var user_mail = $('#uemail').val();
        var user_password = $('#upassword').val();
        var user_phone = $('#uphone').val();
        var user_role = $('#utype').val();
        var user_address = $('#uaddress').val();
        var user_status = $('#ustatus').val();
        
        var validation = '0';
        if(user_name == ""){
            $('#uname').parent('div').find('p').text('Enter Name')
             validation = '1';
         }
         if(user_rollno == ""){
            $('#uroll').parent('div').find('p').text('Enter roll number')
             validation = '1';
         }
         if(user_depertment == ""){
            $('#udept').parent('div').find('p').text('Enter department')
             validation = '1';
         }
        if(user_mail == ""){
            $('#uemail').parent('div').find('p').text('Enter email')
             validation = '1';
         }
        if(user_password == ""){
            $('#upassword').parent('div').find('p').text('Enter password')
             validation = '1';
         }
        if(user_phone == ""){
            $('#uphone').parent('div').find('p').text('Enter phone')
             validation = '1';
         }
         if(user_role == "0"){
            $('#utype').parent('div').find('p').text('Enter role')
             validation = '1';
         }
         if(user_address == ""){
            $('#uaddress').parent('div').find('p').text('Enter address')
             validation = '1';
         }
        

        if(validation=='0'){
            $.ajax({
                type: "POST",
                url: 'ajax/checkemail',
                data: {
                    'email' : user_mail ,'id' : user_id, 'csrfmiddlewaretoken' : $('input[name="csrfmiddlewaretoken"]').val()
                },
                dataType: 'json',
                success: function (data) {
                    if(data.flag == 0){
                        $('#uemail').parent('div').addClass('has-error')
                        alert("Email already Exist")
                    }
                    if(data.flag == 1){
                        var formData = new FormData();
                        formData.append("id", user_id);
                        formData.append('user_name', user_name);
                        formData.append('user_mail', user_mail);
                        formData.append('user_department', user_depertment);
                        formData.append('user_rollno' , user_rollno);
                        formData.append('user_password' , user_password);
                        formData.append('user_phone' , user_phone);
                        formData.append('user_role' , user_role);
                        formData.append('user_status' , user_status);
                        formData.append('user_address' , user_address);
                        formData.append('user_profile' , user_profile.files[0]);
                        formData.append('hdn_filename' , $('#hdn_filename').val());
                        formData.append('csrfmiddlewaretoken' , $('input[name="csrfmiddlewaretoken"]').val());
                        $.ajax({
                        type: "POST",
                        url: 'ajax/useraction',
                        data: formData,
                        dataType: 'json',
                        cache: false,
                        contentType: false,
                         processData: false,
                        success: function (data) {
                            if(data.flag == 0)
                                alert(data.result)
                            if(data.flag == 1){
                                alert(data.result)
                                $('#userModal').modal('hide');
                                window.location='User';
                            }
                        },
                        error: function (jqXHR, exception) {
                        alert("Ajax loading Error");
                        }
                    });
                }
                },
               error: function (jqXHR, exception) {
                alert("Ajax loading Error");
                }
            });
        }
        else{
        return false
        }
    });

     $('#wrapper').on('click','.edituser', function(){
         var id = $(this).attr('data-id');
         $('#user_profile_div').hide()
         $('#img_profile_div').show()
         $('.help-text').text("");
         $.ajax({
                type: "POST",
                url: 'ajax/getUser',
                data: {
                    'user_id' : id ,'csrfmiddlewaretoken' : $('input[name="csrfmiddlewaretoken"]').val()
                },
                dataType: 'json',
                success: function (data) {
                    if(data.flag == 0)
                        alert(data.result)
                    if(data.flag == 1){
                     var object = JSON.parse(data.result)
                        $('#uid').val(id);
                        $('#uname').val(object[0]['fields'].user_name);
                        $('#uroll').val(object[0]['fields'].user_rollno);
                        $('#udept').val(object[0]['fields'].user_department);
                        $('#uemail').val(object[0]['fields'].user_mail);
                        $('#upassword').val(object[0]['fields'].user_password);
                        $('#uphone').val(object[0]['fields'].user_phone);
                        $('#utype').val(object[0]['fields'].user_role);
                        $('#ustatus').val(object[0]['fields'].user_status);
                        $('#uaddress').val(object[0]['fields'].user_address);
                        $('#hdn_filename').val(object[0]['fields'].user_image);
                        $('#img_profile').attr('src',object[0]['fields'].user_image)
                        $('#userModal').modal({backdrop: 'static', keyboard: false});
                    }
                },
                error: function (jqXHR, exception) {
                 alert("Ajax loading Error");
                }
         });
        });

//delete user
    $('#wrapper').on('click','.deleteuser', function(){
     var id = $(this).attr('data-id');
     var name = $(this).attr('data-name');
     $.confirm({
        title: 'Sure!',
        content: 'You want to delete user "'+name+'"',
        type: 'dark',
        typeAnimated: true,
        buttons: {
            tryAgain: {
                text: 'Delete',
                btnClass: 'btn-red',
                action: function(){
                      $.ajax({
                        type: "POST",
                        url: 'ajax/delete',
                        data: {
                           'id': id,'type':'user','csrfmiddlewaretoken' : $('input[name="csrfmiddlewaretoken"]').val()
                        },
                        dataType: 'json',
                        success: function (data) {
                            if(data.flag == 0)
                            $.confirm({
                            title: 'Warning!',
                            content: data.result,
                            buttons: {
                                Ok: function () {
                                }
                            }
                            });
                            if(data.flag == 1){
                                $.confirm({
                                title: 'Success',
                                content: 'User "' +name+'" deleted',
                                buttons: {
                                    Ok: function () {
                                        window.location=data.action;
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