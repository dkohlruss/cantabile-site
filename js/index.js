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
      {"fields":"events"},
      function(response) {
        var results = response.events.data;
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        for (var i = 0; i < results.length; i++) {
          var dateString  = results[i].start_time;
          var year        = dateString.substring(0,4);
          var monthNum       = dateString.substring(5,7);
          var day         = dateString.substring(8,10);
          var date        = new Date(year, monthNum-1, day);
          var compare = (date < tomorrow); // Compares day before midnight tonight

          if (compare) {
            break;
          }

          var hr = dateString.substring(11,13);
          var min = dateString.substring(14,16);
          var tz = dateString.substring(20,24);
          var ampm = 'AM';

          if (hr > 12) {
            hr = hr - 12;
            ampm = 'PM';
          }

          var monthArr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
          var month = monthArr[monthNum-1];

          var placeName = results[i].place.name;
          var comma = placeName.indexOf(',');
          var venueName = placeName.substring(0,comma);
          var address = placeName.substring(comma+2);

          var description = results[i].description.substring(0,results[i].description.indexOf('\n'));

          var $title = '<h3 class="concert-title"><a href="https://www.facebook.com/events/' + results[i].id + '" target="_blank">' + results[i].name + '</a></h3>';
          var $dateTimeLoc = '<span class="date-time-loc">' + month + ' ' + day + ', ' + year + '<br>' + venueName + '<br><a href="https://www.google.ca/maps/place/' + address + '" target="_blank">' + address + '</a></span>';
          var $desc = '<p class="concert-desc">' + description + '</p>';

          console.log(month);
          console.log(results[i]);

          $('.concerts').append($title).append($dateTimeLoc).append($desc);
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
  $('#about-foot').click(function() {
    console.log('click fired');
    var $aboutContent = '<p>Today, Cantabile has grown to become a 20-member ensemble of auditioned vocalists gathered from the Skagit Valley area. The group performs Christmas and spring concerts of sacred and secular works. We enjoy performing classical music that has withstood the test of time, and experimenting with contemporary selections that challenge us and entertain our audiences. Our mission is to share our love of beautiful choral music with audiences throughout the Skagit Valley area and beyond.</p><p>Cantabile’s purpose each season is to enhance the community’s enjoyment and understanding of choral arts through communicating the beauty of music. The group has been honored to support Skagit Opera, Skagit Valley Chorale, Skagit Symphony, and other performing arts groups, through members’ active participation in their productions and concerts. We are pleased to be working in collaboration with the Anacortes Arts Foundation. We look forward to seeing you and your family at our inspiring concerts.</p><h3><a href="#audition">Click here</a> for audition information</h3>';
    $('.about').append($aboutContent);
    $('#about-foot').remove();
  });
});
