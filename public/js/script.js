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
  function setAlbumContent(){
    var album_name = $('input[name=album_name]').val();
    var album_title = $('input[name=album_title]').val();
    var album_number = $('input[name=album_number]').val();
    var album_description = $('textarea').val();
    var images='';
    for(var i=0;i<album_number;i++){
      images+='<li><a title="'+album_title+'" href="/pls/portal/docs/page/arrond_out_fr/media/images/album_photos/album_'+album_name+'/'+album_name+'_0'+(i+1)+'.jpg" rel="lightbox-'+album_name+'">'+(i+1)+'</a></li>';
    }
    var html = '';
    html+='<h1>'+album_title+'</h1>';
    html+='<table class="encadre_gen"> <tbody> <tr> <td> <table class="imageAvecLeg imageAvecLegLien imageFltDrt" style="width: 171px;" cellspacing="0"> <tbody> <tr>';

    html+='<td><a title="'+album_title+'" href="/pls/portal/docs/page/arrond_out_fr/media/images/album_photos/album_'+album_name+'/'+album_name+'_01.jpg" rel="lightbox-'+album_name+'">';
    html+='<img title="'+album_title+'" src="/pls/portal/docs/page/arrond_out_fr/media/images/album_photos/album_'+album_name+'/'+album_name+'_01.jpg" alt="'+album_name+'" width="171" height="114" /><span class="txtCont"><strong>Consultez la galerie photo</strong></span></a>';
    html+='<table class="cont_imgCache"> <tbody> <tr> <td> <ul>';
    /*image list here*/
    html+=images;
    /*image list here*/
    html+='</ul> </td> </tr> </tbody> </table>';
    html+='</tr> </tbody> </table>';
    html+='<p>'+album_description+'</p>';
    html+='</td> </tr> </tbody> </table>';
    $('<textarea class="form-control" rows="3">'+html+'</textarea>').insertAfter($('form'));
    //console.log(html);
  }
  $('button[name=createAlbum]').click(function(){
    var fields = $('form > div input');
    var cpt = 0;
    $.each(fields, function(){
      if($(this).val()!=''){
        cpt++;
        if(cpt==3)
          setAlbumContent();
      }
    });
  });
});
