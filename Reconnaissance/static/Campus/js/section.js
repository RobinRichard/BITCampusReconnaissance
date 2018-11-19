$(document).ready(function () {

    // get all categories
    $.ajax({
        type: "POST",
        url: 'ajax/getCategory',
        data: {
            'category_id': '', 'csrfmiddlewaretoken': $('input[name="csrfmiddlewaretoken"]').val()
        },
        dataType: 'json',
        success: function (data) {
            if (data.flag == 0)
                alert(data.result)
            if (data.flag == 1) {
                var object = JSON.parse(data.result)
                var str = ''
                $.each(object, function (i, element) {
                    
                    str += '<option value="' + element['pk'] + '">' + element['fields'].category_name + '</option>'
                });
                $('#category').append(str)
            }
        },
        error: function (jqXHR, exception) {
            alert("Ajax loading Error");
        }
    });

    $.ajax({
        type: "POST",
        url: 'ajax/getSection',
        data: {
            'section_id': '', 'csrfmiddlewaretoken': $('input[name="csrfmiddlewaretoken"]').val()
        },
        dataType: 'json',
        success: function (data) {
            if (data.flag == 0)
                alert(data.result)
            if (data.flag == 1) {
                var str = ''
                $.each(data.result, function (i, element) {
                    str += '<tr class="odd gradeX"><td>' + element.section_name + '</td>';
                    str += '<td>' + element.category__category_name + '</td>';
                    str += '<td><div class="text-center"><a  class="btn btn-social-icon btn-facebook editsection" data-id="' + element.id + '"><i class="fa fa-pencil"></i></a><a class="btn btn-social-icon btn-pinterest deletesection" data-name="' + element.section_name + '" data-id="' + element.id + '"><i class="fa fa-trash-o"></i></a></div></td></tr>';
                });
                $('#sectiontable').append(str);
                $('#sectiontable').DataTable({
                    responsive: true
                });
            }

        },
        error: function (jqXHR, exception) {
            alert("Ajax loading Error");
        }
    });

    $('#wrapper').on('click', '.addsection', function () {
        $('#sid').val("");
        $('#sname').val("");
        $('#category').val(0);
        $('.help-text').text("");
        $('#sectionModal').modal({ backdrop: 'static', keyboard: false });
    });

    $('#wrapper').on('click', '#sectionSave', function () {
        section_id = $('#sid').val();
        section_name = $('#sname').val();
        category_id = $('#category').val();
        var validation = '0';
        if (section_name == ""){
            $('#sname').parent('div').find('p').text('Enter section Name')
             validation = '1';
         }
        if (category_id == 0){
            $('#category').parent('div').find('p').text('Select caterory')
             validation = '1';
         }

        if (validation == '0') {

            $.ajax({
                type: "POST",
                url: 'ajax/sectionaction',
                data: {
                    'id': section_id,
                    'section_name': section_name,
                    'category_id': category_id,
                    'csrfmiddlewaretoken': $('input[name="csrfmiddlewaretoken"]').val()
                },
                dataType: 'json',
                success: function (data) {
                    console.log(data)
                    if (data.flag == 0)
                        alert(data.result)
                    if (data.flag == 1) {
                        alert(data.result)
                        $('#sectionModal').modal('hide');
                        window.location = 'Section';
                    }
                },
                error: function (jqXHR, exception) {
                    alert("Ajax loading Error");
                }
            });
        }
        else {
           return false;
        }
    });



    $('#wrapper').on('click', '.editsection', function () {
        var id = $(this).attr('data-id');
        $('.help-text').text("");
        $.ajax({
            type: "POST",
            url: 'ajax/getSection',
            data: {
                'section_id': id, 'csrfmiddlewaretoken': $('input[name="csrfmiddlewaretoken"]').val()
            },
            dataType: 'json',
            success: function (data) {
                if (data.flag == 0)
                    alert(data.result)
                if (data.flag == 1) {
                    var object = data.result
                    console.log(object)
                    $('#sid').val(id);
                    $('#sname').val(object[0].section_name);
                    $('#category').val(object[0].category);
                    $('#sectionModal').modal({ backdrop: 'static', keyboard: false });
                }
            },
            error: function (jqXHR, exception) {
                alert("Ajax loading Error");
            }
        });
    });

    //delete tournament
    $('#wrapper').on('click', '.deletetournament', function () {
        var id = $(this).attr('data-id');
        var name = $(this).attr('data-name');
        $.confirm({
            title: 'Sure!',
            content: 'You want to delete tournament "' + name + '"',
            type: 'dark',
            typeAnimated: true,
            buttons: {
                tryAgain: {
                    text: 'Delete',
                    btnClass: 'btn-red',
                    action: function () {
                        $.ajax({
                            type: "POST",
                            url: 'ajax/deletetournament',
                            data: {
                                'tournament_id': id, 'csrfmiddlewaretoken': $('input[name="csrfmiddlewaretoken"]').val()
                            },
                            dataType: 'json',
                            success: function (data) {
                                if (data.flag == 0) {
                                    $.confirm({
                                        title: 'Warning!',
                                        content: data.result,
                                        buttons: {
                                            Ok: function () {
                                            }
                                        }
                                    });
                                }
                                if (data.flag == 1) {
                                    $.confirm({
                                        title: 'Success',
                                        content: 'Tournament "' + name + '" deleted',
                                        buttons: {
                                            Ok: function () {
                                                window.location = 'tournament';
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

