(function ($) {
    const commentForm = document.getElementById("comment-form");

    if (commentForm){
    let myUl = document.getElementById('post-list');
    let newComment = document.getElementById('commentInput');
    
    commentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        var currentLink = $(this);
        var currentId = currentLink.data('postId');

        //var newComment = $('#new-comment');
        const comment = newComment.value;

        var requestConfig = {
            method: 'POST',
            url: '/posts/comment/' + currentId
        };

        $.ajax(requestConfig).then( function (responseMessage) {
            console.log(responseMessage);
            let li = document.createElement('li');
            li.innerHTML = comment;
            myUl.appendChild(li);
        });

    });
}


})(window.jQuery);
