window.fbAsyncInit = function() {
    FB.init({
      appId      : '1814523758802221',
      xfbml      : true,
      version    : 'v2.8'
    });
    FB.AppEvents.logPageView();

    FB.api(
      '/131666423550255?access_token=1814523758802221|pBV7Mu5BZ8DhWWMfgWSjFxz7rT8',
      'GET',
      {"fields":"events{description,end_time,name,place,start_time,id,cover}"},
      function(response) {
        var results = response.events.data;
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        for (var i = 0; i < results.length; i++) {
          console.log(results[i]);
          var dateString  = results[i].start_time;
          var year        = dateString.substring(0,4);
          var monthNum       = dateString.substring(5,7);
          var day         = dateString.substring(8,10);
          var date        = new Date(year, monthNum-1, day);
          var compare = (date < tomorrow); // Compares day before midnight tonight

          if (compare) {
            if (i === 0) {
              $('.concerts').append('<h4>There are currently no scheduled concerts, please check back later</h4>');
            }
            break;
          }

          var hr = dateString.substring(11,13);
          var min = dateString.substring(14,16);
          var tz = dateString.substring(20,24);
          var ampm = 'AM';
          var monthArr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
          var month = monthArr[monthNum-1];
          var placeName = results[i].place.name;
          var comma = placeName.indexOf(',');
          var venueName = placeName.substring(0,comma);
          var address = placeName.substring(comma+2);
          var description = results[i].description.substring(0,results[i].description.indexOf('\n'));
          var image = results[i].cover.source;

          if (hr > 12) {
            hr = hr - 12;
            ampm = 'PM';
          }

          var $title = '<div class="event"><h3 class="concert-title"><a href="https://www.facebook.com/events/' + results[i].id + '" target="_blank">' + results[i].name + '</a></h3>';
          var $dateTimeLoc = '<div class="event-deets"><span class="date-time-loc">' + month + ' ' + day + ', ' + year + ', ' + hr + ':' + min + ampm + '<br>' + venueName + '<br><a href="https://www.google.ca/maps/place/' + address + '" target="_blank">' + address + '</a></span></div>';
          var $desc = '<p class="concert-desc"><a href="' + image + '" target="_blank"><img class="event-img img-wrap" src="' + image + '"></a>' + description + '</p></div>';

          var $agg = $title + $dateTimeLoc + $desc;

          $('.concerts').append($agg);
        }

      }
    );
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

//jQuery smooth scrolling
$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

$(document).ready(function() {
  $(document).on('click', '#about-foot', function() {
    console.log('click fired');
    var $aboutContent = '';
    $('.about').append($aboutContent);
    $('#about-foot').remove();
  });

  $(document).on('click', '#dynamic-link', function() {
    console.log('click fired');
  });
});
