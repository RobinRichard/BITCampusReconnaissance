
 $(document).ready(function () {
 $.ajax({
        type: "POST",
        url: 'ajax/getQuestion',
        data: {
            'question_id': '', 'csrfmiddlewaretoken': $('input[name="csrfmiddlewaretoken"]').val()
        },
        dataType: 'json',
        success: function (data) {
            if (data.flag == 0)
                alert(data.result)
            if (data.flag == 1) {
                var str = ''
                $.each(data.result, function (i, element) {
                    if(element.question_type=='2'){
                    str += '<tr class="odd gradeX"><td>' + element.question_text + '</td>';
                    str += '<td>' + element.question_type__question_type + '</td>';
                    str += '<td>' + element.section__section_name + '</td>';
                    str += '<td><div class="text-center"><a  class="btn btn-social-icon btn-facebook downloadQr" data-id="' + element.id + '"><i class="fa fa-download"></i></a></div></td></tr>';
                    }    
            });
                $('#questiontable').append(str);
                $('#questiontable').DataTable({
                    responsive: true
                });
            }

        },
        error: function (jqXHR, exception) {
            alert("Ajax Error");
        }
    });

     $('#wrapper').on('click', '.downloadQr', function () {
        var id = $(this).attr('data-id');
        window.open('ajax/generateQR?q_id='+id, '', "width=600,height=900");
    });
 });