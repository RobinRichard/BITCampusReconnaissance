 $(document).ready(function() {
    var id = $('#upro').attr('data-id');
    $.ajax({
        type: "POST",
        url: 'ajax/getDashboard',
        data: {
            'user_id' : id ,'csrfmiddlewaretoken' : $('input[name="csrfmiddlewaretoken"]').val()
        },
        dataType: 'json',
        success: function (data) {
            if(data.flag == 0)
                console.log(data.result)
            if(data.flag == 1){
                $('#ucount').html(data.user)
                $('#ccount').html(data.category)
                $('#scount').html(data.section)
                $('#qcount').html(data.question)
            }
        },
        error: function (jqXHR, exception) {
            alert("Ajax loading Error");
        }
    });  
 });