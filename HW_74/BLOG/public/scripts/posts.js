(function () {
    'use strict';

    const addCommentGUI = $(`<div>
                                <textarea id="commentContent"></textarea>
                                <button id="addComment">add</button>
                                <button id="cancelComment">cancel</button>
                           </div>`),
        commentContent = addCommentGUI.find('#commentContent');

    $(document).on('click', '.addComment', e => {
        const theTarget = $(e.target);
        theTarget.after(addCommentGUI);
        addCommentGUI.show();
        theTarget.hide();
    });
    $(document).on('click', '.showComments', e => {
        const theTarget = $(e.target);
        if (theTarget.text() === 'Hide Comments') {
            theTarget.next('.comments').hide();
            theTarget.text('Show Comments');
        }
        else {
            $.post('/showComments', {
                id: $(e.target).closest('.post').attr('id')
            });
            theTarget.next('.comments').show();
            theTarget.text('Hide Comments');
        }
    });


    function hideAddCommentGUI() {
        addCommentGUI.hide();
        $('#commentContent').val('');
        $('.addComment').show();
    }

    $(document).on('click', '#addComment', e => {
        $.post('/addComment', {
            id: $(e.target).closest('.post').attr('id'),
            content: $('#commentContent').val()
        });
        hideAddCommentGUI();
    });

    $(document).on('click', '#cancelComment', e => {
        hideAddCommentGUI();
    });

    io().on('comment', data => {
        /*
        <div>{{content}}</div>
        <div class="attribution">Posted by {{author}} at {{date}}</div>
        */
        $('#' + data.post).find('.comments').append(data.comment);
    });
}());