$(document).ready(function () {

    // Set dimensions for full width/height
    var bodyHeight = $('body').height();
    var bodyWidth = $('body').width();
    var topBarHeight = $('#topBar').height();
    var leftBarWidth = $('#leftSide').width();
    var setLeftHeight = bodyHeight - topBarHeight + 'px';
    var setLeftWidth = bodyWidth - leftBarWidth + 'px';

    //$('#leftSide').css({
    //	'height': setLeftHeight,
    //	'top': topBarHeight + 'px'
    //});

    //$('#outputWindow').css({
    //	'height': setLeftHeight,
    //	'width': setLeftWidth,
    //	'top': topBarHeight + 'px',
    //	'left': leftBarWidth + 'px'
    //});
    // End: Set dimensions for full width/height

    // Save/Load Project

    function downloadFile(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    $('.saveAsFile').click(function () {

        var css = cssEditor.getValue();
        var html = htmlEditor.getValue();
        
        $.ajax({
            type: "POST",
            url: "/savehtml",
            data: {
                css,
                html,
            },
            success: function (response) {
                const reshtml = response;
                downloadFile('test.html',reshtml);
            }

        });

        return false;

    });
    // End: Save/Load Project

    // Instant Save

    $('#cssEditor, #htmlEditor').keyup(function () {

        var css = cssEditor.getValue();
        var html = htmlEditor.getValue();

        $('#projectIframe').contents().find('body').html(html);
        $('#projectIframe').contents().find('style').html(css);

    });

    // End: Instant Save

    // $('#leftSide').resizable();

});










