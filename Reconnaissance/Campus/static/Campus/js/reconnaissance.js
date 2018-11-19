$(document).ready(function() {
    $('#wrapper').on('keyup','.clrValidation', function(){
        $(this).parent('div').find('p').text(' ')
    });
    $('#wrapper').on('change','.clrValidation', function(){
        $(this).parent('div').find('p').text(' ')
    })
});