$(function() {
    $('#search-input').on('focus', function() {
      $('.nav-search').addClass('active');
    })

    $('#search-input').on('keyup', function() {
      $('#hits-container').scrollTop(0);
      var searchField = $('#search-input').val();
      $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      })
      
      $.ajax({
        type:'POST',
        url:'home/post',
        data: {'query': searchField},
        success: function(eventos){
          if(jQuery.isEmptyObject(eventos)){
            $('#hits-container').html('<div id="no-results-message"> <p>No se encontraron resultados <em>"'+searchField+'"</em>.</p></div>');
          }
          else{
            $('#hits-container').empty();
            jQuery.each(eventos, function(index,value){
                $('#hits-container').append('<a href="infoEvents/'+index+'" value="'+index+'"target="_blank"><div class="hit">'+
                '<div class="hit-content"><h2 class="hit-title">'+value['name']+
                '</h2><p class="hit-description">'+value['description'].trim().substring(0,150)+'...</p></div></div></a>');
            });
              
          }
        }
      })
    })
    $('.close-search').on('click', function(evt) {
      evt.preventDefault();
      $('#search-input').val('');
       $('.nav-search').removeClass('active');
     })

   $('#search-input').on('blur', function(evt) {
     if(!evt.isDefaultPrevented) {
       console.log("blur");
      $('.nav-search').removeClass('active');
     }
    })

    $(document).on("click", function(e) {
      if ($(e.target).is("#search-input") === false) {
        $('.nav-search').removeClass('active');
      }
    });
});

function toTitleCase(str) {
    return str.replace(/(?:^|\s)\w/g, function(match) {
        return match.toUpperCase();
    });
}
