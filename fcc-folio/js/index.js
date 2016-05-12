$(document).ready(function() {
  $(".nav-about").click(function() {
    $('html, body').animate({
      scrollTop: $(".about").offset().top
    }, 600);
  });
  $(".nav-portfolio").click(function() {
    $('html, body').animate({
      scrollTop: $(".portfolio").offset().top
    }, 600);
  });
  $(".nav-contact").click(function() {
    $('html, body').animate({
      scrollTop: $(".contact").offset().top
    }, 600);
  });
});