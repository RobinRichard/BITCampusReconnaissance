$(document).ready(function () {

    // get all categories
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
                var object = JSON.parse(data.result)
                var str = ''
                $.each(object, function (i, element) {
                    console.log();
                    str += '<option value="' + element['pk'] + '">' + element['fields'].section_name + '</option>'
                });
                $('#section').append(str)
            }
        },
        error: function (jqXHR, exception) {
            alert("Ajax loading Error");
        }
    });

    // get all question type
    $.ajax({
        type: "POST",
        url: 'ajax/getType',
        data: {
            'type_id': '', 'csrfmiddlewaretoken': $('input[name="csrfmiddlewaretoken"]').val()
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
                    str += '<option value="' + element['pk'] + '">' + element['fields'].question_type + '</option>'
                });
                $('#qtype').append(str)
            }
        },
        error: function (jqXHR, exception) {
            alert("Ajax loading Error");
        }
    });

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
                var object = JSON.parse(data.result)
                var str = ''
                $.each(object, function (i, element) {
                    str += '<tr class="odd gradeX"><td>' + element['fields'].question_text + '</td>';
                    str += '<td>' + element['fields'].question_type + '</td>';
                    str += '<td>' + element['fields'].section + '</td>';
                    str += '<td><div class="text-center"><a  class="btn btn-social-icon btn-facebook editquestion" data-id="' + element['pk'] + '"><i class="fa fa-pencil"></i></a><a class="btn btn-social-icon btn-pinterest deletequestion" data-name="' + element['fields'].question_text + '" data-id="' + element['pk'] + '"><i class="fa fa-trash-o"></i></a></div></td></tr>';
                });
                $('#questiontable').append(str);
                $('#questiontable').DataTable({
                    responsive: true
                });
            }

        },
        error: function (jqXHR, exception) {
            alert("Ajax loading Error");
        }
    });

    $('#wrapper').on('click', '.addquestion', function () {
        $('#qid').val("");
        $('#qtext').val("");
        $('#qtype').val(0);
        $('#section').val(0);
        $('#qvalidator').val("");
        $('#qdesc').val("");
        $('#questionModal').modal({ backdrop: 'static', keyboard: false });
    });

    $('#wrapper').on('click', '#questionSave', function () {
        question_id = $('#qid').val();
        question_text = $('#qtext').val();
        question_type = $('#qtype').val();
        question_validation = $('#qvalidator').val();
        question_description = $('#qdesc').val();
        section_id = $('#section').val();
        var validation = '0';
        if (question_text == "")
            validation = '1';
        if (question_type == 0)
            validation = '1';
        if (section_id == 0)
            validation = '1';
        if (validation == '0') {
            $.ajax({
                type: "POST",
                url: 'ajax/questionaction',
                data: {
                    'id': question_id,
                    'question_text': question_text,
                    'question_type': question_type,
                    'question_validation': question_validation,
                    'question_description': question_description,
                    'section_id': section_id,
                    'csrfmiddlewaretoken': $('input[name="csrfmiddlewaretoken"]').val()
                },
                dataType: 'json',
                success: function (data) {
                    console.log(data)
                    if (data.flag == 0)
                        alert(data.result)
                    if (data.flag == 1) {
                        alert(data.result)
                        $('#questionModal').modal('hide');
                        window.location = 'Question';
                    }
                },
                error: function (jqXHR, exception) {
                    alert("Ajax loading Error");
                }
            });
        }
        else {
            alert('Enter All Fields')
        }
    });



    $('#wrapper').on('click', '.editquestion', function () {
        var id = $(this).attr('data-id');
        $.ajax({
            type: "POST",
            url: 'ajax/getQuestion',
            data: {
                'question_id': id, 'csrfmiddlewaretoken': $('input[name="csrfmiddlewaretoken"]').val()
            },
            dataType: 'json',
            success: function (data) {
                if (data.flag == 0)
                    alert(data.result)
                if (data.flag == 1) {
                    var object = JSON.parse(data.result)
                    console.log(object)
                    $('#qid').val(id);
                    $('#qtext').val(object[0]['fields'].question_text);
                    $('#qtype').val(object[0]['fields'].question_type);
                    $('#qvalidator').val(object[0]['fields'].question_validation);
                    $('#qdesc').val(object[0]['fields'].question_description);
                    $('#section').val(object[0]['fields'].section);
                    $('#questionModal').modal({ backdrop: 'static', keyboard: false });
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

