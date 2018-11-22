$(document).ready(function () {


    $.ajax({
        type: "POST",
        url: 'ajax/getUser',
        data: {
            'user_id': '', 'csrfmiddlewaretoken': $('input[name="csrfmiddlewaretoken"]').val()
        },
        dataType: 'json',
        success: function (data) {
            if (data.flag == 0)
                alert(data.result)
            if (data.flag == 1) {
                var str = ''
                $.each(data.result, function (i, element) {
                    if(element.user_role__user_role!='Admin'){
                    str += '<tr class="odd gradeX"><td>' + element.user_name + '</td>';
                    str += '<td>' + element.user_department + '</td>';
                    str += '<td>' + element.user_mail + '</td>';
                    str += '<td>' + element.user_role__user_role + '</td>';
                    str += '<td><div class="text-center"><a  class="btn btn-social-icon btn-facebook downloadPDF" data-id="' + element.id + '"><i class="fa fa-download"></i></a></div></td></tr>';
                    }   
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

    $('#wrapper').on('click', '.downloadPDF', function () {
        var id = $(this).attr('data-id');
        window.open('ajax/generatePDF?u_id='+id, '', "width=600,height=900");
    });

});