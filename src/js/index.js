$(function() {
    $('.footer ul li').on('click', function() {
        var ind = $(this).index();
        $('.section div').eq(ind).show().siblings().hide();
    })

})