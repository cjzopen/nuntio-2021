// input error message
$(document).on('change input','.input-error .form-control',function(){
  $(this).closest('.input-error').removeClass('input-error');
});

// menu
var main_menu=$('#menu');
var active_menu_link = main_menu.find('.active');
var window_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var menu_swich = $('#menu-swich-input');
if(window_width>1280){
  main_menu.addClass('expand');
  menu_swich.prop('checked', true);
}

////展開上色
active_menu_link.parents('.menu-list-child').prev('.menu-list-group').addClass('open');
$('.menu-list-parent.open').addClass('active-parent');
////switch

  main_menu.hover(function(){
    if(!menu_swich.is(':checked')){
      $(this).addClass('expand');
      $('.menu-list-group.open').next('.menu-list-child').show();
    }
  },function(){
    if(!menu_swich.is(':checked')){
    $(this).removeClass('expand');
    $('.menu-list-child').slideUp(200);
    }
  })

menu_swich.on('change',function(){
  if(!menu_swich.is(':checked')){
    main_menu.removeClass('expand');
    main_menu.hover(function(){
      if(!menu_swich.is(':checked')){
        $(this).addClass('expand');
        $('.menu-list-group.open').next('.menu-list-child').show();
      }
    },function(){
      if(!menu_swich.is(':checked')){
        $(this).removeClass('expand');
        $('.menu-list-child').slideUp(200);
      }
    })
  }else{
    main_menu.addClass('expand');
  }
})

$(document).on('click','.menu-list-group',function(e){
  e.preventDefault();
  var target_ul =$(this).next('.menu-list-child');
  target_ul.slideToggle(200);
  $(this).toggleClass('open');
  return false;
});

// pagination
function table_pagination(table_element,pagination_element,perPage){
  perPage = (typeof perPage !== 'undefined') ?  perPage : 10;
  var searchTableTr = $(table_element).find('tbody tr');
  searchTableTr.hide();
  searchTableTr.slice(0, perPage).show();

  var pagination1 = new tui.Pagination(document.querySelector(pagination_element), {
    totalItems: searchTableTr.length,
    itemsPerPage: perPage,
    visiblePages: 5,
    centerAlign: true
  });
  pagination1.on('afterMove', function(evt) {
    var currentPage = evt.page;
    searchTableTr.hide();
    searchTableTr.slice((currentPage-1)*perPage, perPage*currentPage).show();
  });
}
var paginations = document.querySelectorAll('.table-with-pagination');
var per_page = 4;
for(var i=0; i < paginations.length; i++){
  console.log(i)
  paginations[i].classList.add('table-with-pagination-' + i);
  table_pagination('.table-with-pagination-' + i +' .table','.table-with-pagination-' + i +' .tui-pagination',per_page);
}

$(document).on('click','.click-to-open-modal',function(e){
  e.preventDefault();
  var target_model = $(this).attr('data-modal');
  $(target_model).fadeIn(150).css('padding-right','16px');
  $('body').addClass('modal-open').append('<div class="modal-backdrop fade show"></div>');
  $('.modal-backdrop').fadeIn(150);

  $(document).on('click','[data-dismiss="modal"]',function(e){
    e.preventDefault();
    $(target_model).fadeOut(150,function(){
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
    });
    return false;
  });

  return false;
});

// input[file]
// var inputFile = document.querySelectorAll('.custom-file-input');
// if (inputFile) {
//   for (var i = 0; i < inputFile.length; i += 1) {
//     var elem = inputFile[i];
//     elem.addEventListener('change', function(){
//       var fileName = this.querySelector('input[type=file]').files[0].name;
//       this.querySelector('.custom-file-label').innerText = fileName;
//     });
//   }
// }
$('input[type=file].custom-file-input').on('change',function(){
  var fileName = $(this).val().split(/(\\|\/)/g).pop();
  $(this).next('.custom-file-label').text(fileName);
});

$(document).on('click','.collapse-toggle',function(e){
  $(this).toggleClass('active');
  $(this).closest('.accordion').find('.accordion-body').slideToggle(250);
});

// loading
var LOADING=$("#loading");
if(window.addEventListener){
  window.addEventListener("load", function() {
    LOADING.fadeOut(150);
  })
}else if(window.attachEvent){
  window.attachEvent("onload",function(){
    LOADING.fadeOut(150);
  })
}else{
  LOADING.fadeOut(150);
}