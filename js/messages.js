function successOrErrorMessages(res){
if(res =='success' || res == 'articlePosted'){
  if(res =='success')
  M.toast({html: 'Successfully Logged in!',displayLength:5000, classes:'toastSC'});
  if(res == 'articlePosted')
  M.toast({html: 'Successfully Posted Your Article!',displayLength:5000, classes:'toastSC'});
  $('#viewL').removeClass('tooltipped');
  $('#writeL').removeClass('tooltipped');
  $('#writeL').removeClass('disabled');
  $('#acct').removeClass('active');
  $('#writeL').addClass('active');
  $('#viewL').removeClass('disabled');
}
else{
  if(res == 'err'){
    M.toast({html: 'Log In Failed, Retry!',displayLength:8000, classes:'toastFC'});
    $('#writeL').addClass('disabled');
    $('#viewL').addClass('disabled');
  }
}
}

function expandArticleInModal(){

  $('.openNote').on('click', function(){
    var myTitle = $(this).find('.nTitle').text();
    var myDate = $(this).find('.nDate').text();
    var myNote = $(this).find('.nContent').text();
    $('.modal-content').html('<h4>'+myTitle+'</h4><h6>'+myDate+'</h6><p>'+myNote+'</p>');
  })

}
