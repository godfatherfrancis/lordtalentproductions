

// $(document).ready(function() {

    // Pause/Play functionality
    /*var playButton = $('.control-play'),
        album = $('.album');

    playButton.on('click', function() {
        $('.music-player-container').toggleClass('is-playing');

    });*/
    var cloudfrontUrl = 'http://d16em58ido2uc5.cloudfront.net';
    // httpGetAsync(cloudfrontUrl);

    function httpGetAsync(theUrl, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        };
        xmlHttp.open("GET", theUrl, true); // true for asynchronous
        xmlHttp.send(null);
    }

    $.ajax({
        type: "GET",
        url: cloudfrontUrl,
        dataType: "xml",
        success: function(xml){
        $(xml).find('Content').each(function(){
            var sKey = $(this).find('Key').text();
            console.log("Key: " + sKey);
        });
    },
    error: function() {
        alert("An error occurred while processing XML file.");
    }
    });


/*var player = $('.music-player-container'),
        audio = player.find('audio'),
        duration = $('.duration'),
        currentTime = $('.current-time'),
        progressBar = $('.progress span'),
        mouseDown = false,
        rewind, showCurrentTime;

    function secsToMins(time) {
        var int = Math.floor(time),
            mins = Math.floor(int / 60),
            secs = int % 60,
            newTime = mins + ':' + ('0' + secs).slice(-2);

        return newTime;
    }

    function getCurrentTime() {
        var currentTimeFormatted = secsToMins(audio[0].currentTime),
            currentTimePercentage = audio[0].currentTime / audio[0].duration * 100;

        currentTime.text(currentTimeFormatted);
        progressBar.css('width', currentTimePercentage + '%');

        if (player.hasClass('playing')) {
            showCurrentTime = requestAnimationFrame(getCurrentTime);
        } else {
            cancelAnimationFrame(showCurrentTime);
        }
    }

    audio.on('loadedmetadata', function() {
        var durationFormatted = secsToMins(audio[0].duration);
        duration.text(durationFormatted);
    }).on('ended', function() {
        if ($('.repeat').hasClass('active')) {
            audio[0].currentTime = 0;
            audio[0].play();
        } else {
            player.removeClass('playing').addClass('paused');
            audio[0].currentTime = 0;
        }
    });

    $('button').on('click', function() {
        var self = $(this);

        if (self.hasClass('play-pause') && player.hasClass('paused')) {
            player.removeClass('paused').addClass('playing');
            audio[0].play();
            getCurrentTime();
        } else if (self.hasClass('play-pause') && player.hasClass('playing')) {
            player.removeClass('playing').addClass('paused');
            audio[0].pause();
        }

        if (self.hasClass('shuffle') || self.hasClass('repeat')) {
            self.toggleClass('active');
        }
    }).on('mousedown', function() {
        var self = $(this);

        if (self.hasClass('ff')) {
            player.addClass('ffing');
            audio[0].playbackRate = 2;
        }

        if (self.hasClass('rw')) {
            player.addClass('rwing');
            rewind = setInterval(function() { audio[0].currentTime -= .3; }, 100);
        }
    }).on('mouseup', function() {
        var self = $(this);

        if (self.hasClass('ff')) {
            player.removeClass('ffing');
            audio[0].playbackRate = 1;
        }

        if (self.hasClass('rw')) {
            player.removeClass('rwing');
            clearInterval(rewind);
        }
    });

    player.on('mousedown mouseup', function() {
        mouseDown = !mouseDown;
    });

    progressBar.parent().on('click mousemove', function(e) {
        var self = $(this),
            totalWidth = self.width(),
            offsetX = e.offsetX,
            offsetPercentage = offsetX / totalWidth;

        if (mouseDown || e.type === 'click') {
            audio[0].currentTime = audio[0].duration * offsetPercentage;
            if (player.hasClass('paused')) {
                progressBar.css('width', offsetPercentage * 100 + '%');
            }
        }
    });*/
// });

/*
(function($) {
    $(document).ready(function() {

        // Pause/Play functionality
        var playButton = $('.control-play'),
            album = $('.album');

        playButton.on('click', function() {
            $('.music-player-container').toggleClass('is-playing');

        });
    });
})(jQuery);*/
