/* global */
(function () {
    'use strict';
    let buttonElem = $('button.commentsButton'),
        commentsForm = $('#commentsForm'),
        id;

    buttonElem.click(function () {
        id = $(this).attr('id');
        buttonElem.hide();
        commentsForm.show();
    });
    commentsForm.submit((e) => {
        e.preventDefault();
        console.log($('#comment').val());
        $.post('/insertComment', { id: id, comment: $('#comment').val() });
        commentsForm.hide();
        buttonElem.show();
    })
}());