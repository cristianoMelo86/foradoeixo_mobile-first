$(window).on('scroll', function(){
    if($(window).scrollTop()){
        $('.container-header').addClass('black');
    }
    else{
        $('.container-header').removeClass('black');
    }
})