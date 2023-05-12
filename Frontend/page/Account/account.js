$(document).ready(function() {
    $('.menu-icon').click(function() {
      $('.menu-container, .hide-menu').toggleClass('open');
    });

    $('#show-hide-btn').click(function() {
      if ($('#password-input').attr('type') == 'password') {
        $('#show-hide-btn').html("<i class=\"fa-solid fa-eye-slash\"></i>");
        $('#password-input').attr('type', 'text');
      }
      else {
        $('#show-hide-btn').html("<i class=\"fa-solid fa-eye\"></i>");
        $('#password-input').attr('type', 'password');
      }
    })
})