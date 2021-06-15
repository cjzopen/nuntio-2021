$(document).on('change input','.input-error .form-control',function(){
  $(this).closest('.input-error').removeClass('input-error');
})