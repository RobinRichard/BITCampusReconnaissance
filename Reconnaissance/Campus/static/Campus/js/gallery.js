$(document).ready(function () {

    //User Management Scripts
    $('#wrapper').on('click', '.addimage', function () {
        $('#iid').val("")
        $('#iname').val("");
        $('#idesc').val("");
        $('#gallery_image_div').show()
        $('#img_gallery_div').hide()
        $('#hdn_filename').val("");
        $('.help-text').text("");
        $('#galleryModal').modal({ backdrop: 'static', keyboard: false });
    });

    //user edit button

    $('#wrapper').on('click', '.btn_edit', function () {
        $.confirm({
            title: 'Sure!',
            content: "You want to change image can't undo",
            type: 'dark',
            typeAnimated: true,
            buttons: {
                tryAgain: {
                    text: 'change',
                    btnClass: 'btn-red',
                    action: function () {
                        $('#gallery_image_div').show()
                        $('#img_gallery_div').hide()
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
        url: 'ajax/getImage',
        data: {
            'Image_id': '', 'csrfmiddlewaretoken': $('input[name="csrfmiddlewaretoken"]').val()
        },
        dataType: 'json',
        success: function (data) {
            if (data.flag == 0)
                alert(data.result)
            if (data.flag == 1) {
                var object = JSON.parse(data.result)
                var str = ''
                $.each(object, function (i, element) {
                    str += '<tr class="odd gradeX"><td>' + element['fields'].file_name + '</td>';
                    str += '<td><img src="' + element['fields'].Actual_name + '" height="50" width="50"/></td>';
                    str += '<td><div class="text-center"><a  class="btn btn-social-icon btn-facebook editimage" data-id="' + element['pk'] + '"><i class="fa fa-pencil"></i></a><a class="btn btn-social-icon btn-pinterest deleteIamge" data-name="' + element['fields'].user_name + '" data-id="' + element['pk'] + '"><i class="fa fa-trash-o"></i></a></div></td></tr>';
                });
                $('#gallerytable').append(str);
                $('#gallerytable').DataTable({
                    responsive: true
                });
            }
        },
        error: function (jqXHR, exception) {
            alert("Ajax loading Error");
        }
    });


    $('#wrapper').on('click', '#imageSave', function () {
        var image_id = $('#iid').val();
        var image_name = $('#iname').val();
        var image_description = $('#idesc').val();
        var image = $('#hdn_filename').val()
        var validation = '0';
        if (image_name == "") {
            $('#iname').parent('div').find('p').text('Enter Name')
            validation = '1';
        }
        // if (image == "") {
        //     $('#hdn_filename').parent('div').find('p').text('Select image')
        //     validation = '1';
        // }

        if (validation == '0') {
            var formData = new FormData();
            formData.append("id", image_id);
            formData.append('image_name', image_name);
            formData.append('image_description', image_description);
            formData.append('image_gallery', image_gallery.files[0]);
            formData.append('hdn_filename', $('#hdn_filename').val());
            formData.append('csrfmiddlewaretoken', $('input[name="csrfmiddlewaretoken"]').val());
            $.ajax({
                type: "POST",
                url: 'ajax/imageAction',
                data: formData,
                dataType: 'json',
                cache: false,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data.flag == 0)
                        alert(data.result)
                    if (data.flag == 1) {
                        alert(data.result)
                        $('#galleryModal').modal('hide');
                        window.location = 'Gallery';
                    }
                },
                error: function (jqXHR, exception) {
                    alert("Ajax loading Error");
                }
            });
        }
        else {
            return false
        }
    });

    $('#wrapper').on('click', '.editimage', function () {
        var id = $(this).attr('data-id');
        $('#gallery_image_div').hide()
        $('#img_gallery_div').show()
        $('.help-text').text("");
        $.ajax({
            type: "POST",
            url: 'ajax/getImage',
            data: {
                'Image_id': id, 'csrfmiddlewaretoken': $('input[name="csrfmiddlewaretoken"]').val()
            },
            dataType: 'json',
            success: function (data) {
                if (data.flag == 0)
                    alert(data.result)
                if (data.flag == 1) {
                    var object = JSON.parse(data.result)
                    $('#iid').val(id);
                    $('#iname').val(object[0]['fields'].file_name);
                    $('#idesc').val(object[0]['fields'].description);
                    $('#hdn_filename').val(object[0]['fields'].Actual_name);
                    $('#img_gallery').attr('src', object[0]['fields'].Actual_name)
                    $('#galleryModal').modal({ backdrop: 'static', keyboard: false });
                }
            },
            error: function (jqXHR, exception) {
                alert("Ajax loading Error");
            }
        });
    });

});