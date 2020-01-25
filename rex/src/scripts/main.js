'use strict';

//BOT_TOKEN = '1054252816:AAEgq3pg9KbVc3cemz9AOK09Ycn-y2MEknc'

$(function () {
  const $headerTop = $('.header__top');
  const $headerNavbar = $('.header__navbar');
  
  $headerNavbar.on('click', '.menu-icon', onMenuIconClick);
  $headerNavbar.on('click', '.navbar__menu-item', onMenuItemClick);
  $(window).on('scroll', onScroll);


  function onMenuIconClick() {
    $headerNavbar.toggleClass('menu_state_open')
  }

  function onMenuItemClick() {
    if ( $headerNavbar.hasClass('menu_state_open')) {
      $headerNavbar.removeClass('menu_state_open')
    }
  }

function onScroll() {
  $headerTop.removeClass('affix');
  addClass();
}

function addClass() {
  let windowScroll = $(document).scrollTop();
  let screenWidth = $(window).width()
  
  switch(true) {
    case (windowScroll > 400) && (screenWidth > 768) :
      $headerTop.addClass('affix');
     break;
  }
}

 const servHeight = $('.servicies').height();
 console.log(servHeight)
})

$(function(){
$('.header__slider').slick({
  arrows: false,
  adaptiveHeight: true,
   autoplay: true,
  // autoplaySpeed: 3000,
   fade: true,
   speed: 600
})

})


$(function(){

  $('.team__inner').slick({
    dots: true,
    prevArrow: '<button class="team__slide-btn slick-prev slick-arrow"></button>',
    nextArrow:  '<button class="team__slide-btn slick-next slick-arrow"></button>',
    responsive:[{
      breakpoint: 992,
      settings: {
        arrows: false,
       
      }
    }]
  
  })
})

