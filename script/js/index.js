// $(document).ready(function() {

var thebeginningtracklist = [],
    index,
    currentTrack = 0,
    cloudfrontUrl = 'https://d16em58ido2uc5.cloudfront.net',
    ping = new Audio("https://d16em58ido2uc5.cloudfront.net/thebeginning/thebeginning00.mp3"),
    testindex = 0,
    loadnexttrack = cloudfrontUrl + '/' + thebeginningtracklist[testindex];

document.querySelector(".music-player-container").addEventListener("click", function() {

    console.log("ping clicked, play ping sound:");
    if(testindex >= 1) {
        ping.pause();
        ping = new Audio(loadnexttrack);
        ping.play();
        $('.album').removeClass('paused').addClass('playing');
    } else {
        ping.play();
        $("#play").hide();
        $('.album').removeClass('paused').addClass('playing');
    }
    testindex++;
});

$.ajax({
    type: "GET",
    url: cloudfrontUrl,
    dataType: "xml",
    success: function(xml){
        var i = 0,
            t = 0;
        $(xml).find('Key').each(function () {
                var sKey = $(this).text();
                if (i >= 2) {
                    thebeginningtracklist[t] = sKey;
                    // console.log(sKey);
                    t++;
                }
                i++;
        });
        index = t;
    },
    error: function() {
        alert("An error occurred while processing XML file.");
    }
});

$(document).ajaxStop(function() {
    // place code to be executed on completion of last outstanding ajax call here
    console.log(thebeginningtracklist.length + " tracks" + ' index ' + index);
    console.log("First track " + thebeginningtracklist[0]);
    console.log("Last track " + thebeginningtracklist[index-1]);
    // readyplayer();

});

function readyplayer() {

    var player = $('.music-player-container'),
        audio = player.find('audio'),
        duration = $('.duration'),
        currentTime = $('.current-time'),
        progressBar = $('.progress span'),
        mouseDown = false,
        rewind, showCurrentTime;

    // console.log("1 - " + $(audio).attr("src")); // get attr value

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

    audio.on('loadedmetadata', function () {
        var durationFormatted = secsToMins(audio[0].duration);
        duration.text(durationFormatted);
    }).on('ended', function () {
        if ($('.repeat').hasClass('active')) {
            audio[0].currentTime = 0;
            audio[0].play();
        } else {
            player.removeClass('playing').addClass('paused');
            audio[0].currentTime = 0;

            loadnexttrack();
        }
    });

    function loadnexttrack() {
        currentTrack++;
        if (currentTrack === index) {
            currentTrack = 0;
        }

        document.getElementsByClassName("artist-name")[0].innerHTML = "Track 0" + currentTrack;
        var loadnexttrack = cloudfrontUrl + '/' + thebeginningtracklist[currentTrack];
        console.log(loadnexttrack);
        $(audio).attr("src", loadnexttrack);
        player.removeClass('paused').addClass('playing');
        audio[0].play();
    }

    function loadprevtrack() {
        if (currentTrack === 0) {
            // do nothing
        } else {
            currentTrack--;
            if (currentTrack === index) {
                currentTrack = 0;
            }
            var loadnexttrack = cloudfrontUrl + '/' + thebeginningtracklist[currentTrack];
            console.log(loadnexttrack);
            $(audio).attr("src", loadnexttrack);
            player.removeClass('paused').addClass('playing');
            audio[0].play();
        }
    }

    $('button').on('click', function() {
        var self = $(this);

        if (self.hasClass('play-pause') && player.hasClass('paused')) {
            player.removeClass('paused').addClass('playing');
            audio[0].play();
            getCurrentTime();
            console.log(thebeginningtracklist[0].toString());
            document.getElementsByClassName("artist-name")[0].innerHTML = "Track 00";
        } else if (self.hasClass('play-pause') && player.hasClass('playing')) {
            player.removeClass('playing').addClass('paused');
            audio[0].pause();
        }

        if (self.hasClass('shuffle') || self.hasClass('repeat')) {
            self.toggleClass('active');
        }

        // Skip
        if (self.hasClass('ff')) {
            player.addClass('ffing');
            loadnexttrack();
        }

        // Rewind
        if (self.hasClass('rw')) {
            player.addClass('rwing');
            loadprevtrack();
        }
    })/*.on('mousedown', function() {
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
    })*/;

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
    });
}
