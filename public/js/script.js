$.fn.orderBy = function(el){
  $(this).find('li[data-id]').sort(function(a,b){
    return ($(b).data(el)) < ($(a).data(el)) ? 1 : -1;
  })
  .appendTo($(this));
}

$(document).ready(function(){
  $('.orderByDate').click(function(){
    $(".list-group").orderBy('date');
  });
  $('.orderById').click(function(){
    $(".list-group").orderBy('id');
  });
  $('.orderByName').click(function(){
    $(".list-group").orderBy('name');
  });
  let currentMonth = new Date().getFullYear()+'-'+(new Date().getMonth()+1);
  //console.log(currentMonth);
  let spanDate = $('span.disabled');
  //console.log(spanDate.length);
  $.each(spanDate, function(){
    if($(this).text().indexOf(currentMonth)==-1){
      $(this).parent().addClass('hidden list-group-item-success');
    }
  });
  $('.displayAll').click(function(){
    $.each(spanDate, function(){
      if($(this).text().indexOf(currentMonth)==-1){
        $(this).parent().removeClass('hidden');
      }
    });
  });
});
