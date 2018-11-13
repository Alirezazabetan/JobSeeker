
$(function() {

  "use strict";

  // Disable demonstrative links!
  $('a[href="#"]').on('click', function(e){
    e.preventDefault();
  });

  // Back to top
  $('#scroll-up').on( 'click', function() {
    $('html, body').animate({scrollTop : 0}, 600);
    return false;
  });

  // Smoothscroll to anchor
  $('a[href^="#"]:not([href="#"])').on('click', function(){
    var id = $(this).attr('href');
    if ($(id).size() > 0) {
      $('html, body').animate({scrollTop: $(id).offset().top}, 600);
    }
    return false;
  });

  // Smoothscroll to anchor in page load
  var hash = location.hash.replace('#','');
  if (hash != '' && $("#"+hash).size() > 0) {
    $('html, body').animate({scrollTop: $("#"+hash).offset().top-100}, 600);
  }

  // Switchery plugin
  if ($('.js-switch').length) {
    var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
    elems.forEach(function(html) {
      var switchery = new Switchery(html, { size: 'small' });
    });
  }
  if ($('.js-switch-big').length) {
    var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch-big'));
    elems.forEach(function(html) {
      var switchery = new Switchery(html);
    });
  }

  // Check all group
  $('.checkall-group input').on('change', function(){
    var boxes = $(this).parents('.checkall-group').find('input');
    var index = boxes.index(this);

    if (index == 0) {
      if (boxes.eq(0).is(':checked')) {
        boxes.slice(1).prop('checked', false);
      }
    }
    else {
      boxes.eq(0).prop('checked', false);
    }
  });

  // Dropify
  $('.dropify').dropify();

  // Upload group
  $('.upload-group input[type="file"]').on('change', function() {
    $(this).parents('.upload-group').children('.form-control').val( $(this).val().replace(/^.*\\/, "") );
  });

  // Set cover image
  $('#cover_img_file').on('change', function() {
    if ( ($(this))[0].files.length > 0 ) {
      var reader = new FileReader();
      reader.onload = function (e) {
        var header = $('.page-header');
        header.css('background-image', 'url(' + e.target.result + ')');
        if (!header.hasClass('bg-img')) {
          header.addClass('bg-img');
        }
      }
      reader.readAsDataURL( ($(this))[0].files[0] );
    }
  });

  // Summernote WYSIWYG
  if (jQuery().summernote) {
    $('.summernote-editor').summernote({
      dialogsInBody: true,
      height: 300
    });
  }

  // Equal height for grid view
  $('.category-grid > a, .equal-team-members .team-member').matchHeight();

  //
  // Add a .body-scrolled to body, when page scrolled
  // Also add smart scroll
  var lastScrollTop = 0;
  var smartScrollTimeout;
  $(window).on('scroll', function() {
    clearTimeout(smartScrollTimeout);
    var st = $(this).scrollTop();
    var navbar = $('.smart-nav.body-scrolled .navbar');

    if (st > 20) {
      $('body').addClass('body-scrolled');
    }
    else {
      $('body').removeClass('body-scrolled');
      navbar.css('top', '');
      return;
    }

    if ($('body').hasClass('offcanvas-show') || navbar.find('.user-account.open').length) {
      return;
    }

    // Smart scroll
    if (st >= lastScrollTop) { // Downscroll
      navbar.css('top', "-70px");
    }
    else { // Upscroll
      navbar.css('top', '0');
      smartScrollTimeout = setTimeout(function(){
        navbar.css('top', "-70px");
      }, 5000);
    }

    lastScrollTop = st;
  });

  // Don't hide navbar if user's dropdown is open
  $('.user-account').on('show.bs.dropdown', function () {
    clearTimeout(smartScrollTimeout);
  });

  // Don't hide navbar if mouse hover on it
  $('.navbar').on('mouseenter', function(){
    clearTimeout(smartScrollTimeout);
  });

  //
  // jQuery.countTo
  //
  $(window).on('scroll', function() {
    $('.counter span:not(.counted-before)').each(function(index, value) {
      if (isScrolledIntoView(this)) {
        $(this).countTo().addClass('counted-before');
      }
    });
  });

  //
  // FAQ Component
  //
  // Case insensitive contains selector
  jQuery.expr[':'].icontains = function(a, i, m) {
    return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
  };

  // Search
  $('#faq-search input').on('keyup', function(e) {
    var s = $(this).val().trim(),
      result = $("#faq-result .faq-items li");
    $('#faq-result section').show();
    if (s === '') {
      result.show();
    }
    else {
      result.not(':icontains(' + s + ')').hide();
      result.filter(':icontains(' + s + ')').show();
    }

    $('.faq-items').each(function() {
      if ($(this).find('li:visible').size() == 0) {
        $(this).parents('section').hide();
      }
      else {
        $(this).parents('section').show();
      }
    });

    $('.faq-items').unhighlight().highlight(s);
  });


  //
  // Offcanvas
  //
  $('[data-toggle="offcanvas"]').on('click', function (e) {

    e.preventDefault();
    clearTimeout(smartScrollTimeout);

    $('body').addClass('offcanvas-show');
    $('.navbar').prepend('<div class="offcanvas-backdrop"></div>');
    //$(this).children().toggleClass('ti-menu ti-close');
    $('html').css('overflow', 'hidden');
    
    /*
    if ($('body').hasClass('offcanvas-show')) {
      $('html').css('overflow', 'hidden');
    }
    else {
      $('html').css('overflow', 'visible');
    }
    */
    
  });

  $(document).on('click', '.offcanvas-backdrop', function(){
    $('body').removeClass('offcanvas-show');
    $('html').css('overflow', 'visible');
    $('.offcanvas-backdrop').remove();
  });

  $(window).on('resize', function(){
    if ($(window).width() > 991) {
      $('body').removeClass('offcanvas-show');
      $('html').css('overflow', 'visible');
    }
  });

  //
  // Form components
  //

  // Remove button
  $('.item-block .btn-remove').on('click', function(e) {
    e.preventDefault();
    var el = $(this).parents('.item-block').parent('div');
    el.fadeOut(600, function() {
      el.remove();
    });
  });

  // Create button
  $('.btn-duplicator').on('click', function(e) {
    e.preventDefault();
    var duplicateable = $(this).parent().siblings('.duplicateable-content');
    var html = $('<div>').append(duplicateable.clone()).html();
    $(html).insertBefore(duplicateable);
    var new_el = duplicateable.prev('.duplicateable-content');
    new_el.fadeIn(600).removeClass('duplicateable-content');

    // Remove button
    new_el.find(".btn-remove").on('click', function(e) {
      e.preventDefault();
      var el = $(this).parents('.item-block').parent('div');
      el.fadeOut(600, function() {
        el.remove();
      });
    });

  });

});


function isScrolledIntoView(elem)
{
  var $elem = $(elem);
  var $window = $(window);
  var docViewTop = $window.scrollTop();
  var docViewBottom = docViewTop + $window.height();
  var elemTop = $elem.offset().top;
  var elemBottom = elemTop + $elem.height();

  return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}