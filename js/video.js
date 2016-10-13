var displayvideo;
var vb_site_base = "home/vipjazzb/public_html/index.html";
var vb_site_root = "index.html";
jQuery(document).ready(function($) {
    displayvideo = function(vid, src, vwidth, vheight, twidth, theight, html5, audio) {
        var frame = document.getElementById('video_' + vid);
        var image = document.getElementById('thumb_' + vid);
        var close = document.getElementById('close_' + vid);
        var title = document.getElementById('title_' + vid);
        if ((frame.getAttribute('style').indexOf('block') == -1)) {
            image.style.display = 'none';
            frame.style.display = 'block';
            close.style.display = 'block';
            $(frame).animate({
                height: vheight,
                width: vwidth
            }, {
                duration: 400,
                easing: 'swing',
                queue: false
            });
            $(title).animate({
                width: vwidth
            }, {
                duration: 400,
                easing: 'swing',
                queue: false
            });
            if (html5) {
                var time = src.split('#')[1];
                src = src.split('#')[0];
                frame.parentNode.parentNode.setAttribute('onclick', '');
                frame.setAttribute("poster", image.src.replace(twidth, vwidth).replace(theight, vheight).slice(0, -7));
                if (audio) {
                    frame.innerHTML = '<source src="' + src + '.oga" type="audio/ogg"><source src="' + src + '.mp3" type="audio/mpeg"><source src="' + src + '.webma" type="audio/webm"><source src="' + src + '.wav" type="audio/wav"><source src="' + src + '.m4a" type="audio/mp4">';
                } else {
                    frame.innerHTML = '<source src="' + src + '.ogv" type="video/ogg"><source src="' + src + '.mp4" type="video/mp4"><source src="' + src + '.m4v" type="video/mp4"><source src="' + src + '.webm" type="video/webm">';
                }
                frame.play();
                frame.addEventListener('loadedmetadata', function load(event) {
                    frame.currentTime = time;
                }, false);
            } else {
                frame.src = src;
            }
        } else {
            close.style.display = 'none';
            $(frame).animate({
                height: theight,
                width: twidth
            }, {
                duration: 0,
                easing: 'swing',
                queue: false
            });
            title.style.width = twidth + 'px';
            if (html5) {
                frame.pause();
                var container = frame.parentNode;
                container.removeChild(frame);
                frame = document.createElement('video');
                frame.setAttribute('id', 'video_' + vid);
                frame.setAttribute('controls', 'controls');
                frame.setAttribute('autoplay', 'autoplay');
                frame.setAttribute('style', 'display: none; width: ' + twidth + 'px; height: ' + theight + 'px; display: none;');
                container.parentNode.setAttribute("onclick", "displayvideo('" + vid + "', '" + src + "', '" + vwidth + "', '" + vheight + "', '" + twidth + "', '" + theight + "', " + html5 + ", " + audio + ")");
                container.insertBefore(frame, image);
            } else {
                frame.src = '';
            }
            frame.style.display = 'none';
            image.style.display = 'block';
        }
    }
});
