// taken from https://github.com/IronSummitMedia/startbootstrap-scrolling-nav/blob/gh-pages/js/scrolling-nav.js
//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 80
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});


/*
  This widget shows Recent Posts on your Tumblr blog.
  Its dependency is jQuery.
  Usage:

    1) Add html:
      <div id="recent-posts"></div>
    2) Add code into the <head>:
      <script type='text/javascript' src='https://raw.github.com/gist/4056588'></script>

      <script type='text/javascript'
        $(function() { new Tumblr.RecentPosts($("#recent-posts")).render() })
      </script>
  It supports also second parameter specifying the posts count (default is 10).
  License:
  Copyright (c) 2012 Jarmo Pertman
  Permission is hereby granted, free of charge, to any person obtaining
  a copy of this software and associated documentation files (the
  "Software"), to deal in the Software without restriction, including
  without limitation the rights to use, copy, modify, merge, publish,
  distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so, subject to
  the following conditions:
  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
  LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
  WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
var monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
  "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
];

var Tumblr = Tumblr || {};

Tumblr.RecentPosts = function(el, postsCount) {
  var apiUrl = "http://buildinggraceto.tumblr.com/api/read/json?callback=?&filter=text&num=" + (postsCount || 1);
  var titleTypes = {
    regular: "regular-title",
    link: "link-text",
    quote: "quote-source",
    photo: "photo-caption",
    conversation: "conversation-title",
    video: "video-caption",
    audio: "audio-caption",
    answer: "question"
  };

  var renderPosts = function(posts) {
    return $.map($.map(posts, postInfo), renderPost);
  };

  var renderPost = function(post) {
    var post_date = new Date(post.date.split(' ')[0]);
    var date = '<span class="news-date">' + monthNames[post_date.getMonth()] + ' ' + post_date.getDate() + ', ' + post_date.getFullYear() + '</span><br /><br />'

    var title = post.title ? '<h3 style="text-transform:uppercase">' + post.title + '</h3>' : '';

    var media = "";
    if(post.img || post.video || post.audio) {
      media += post.img ? '<img src="' + post.img + '" /><br />' : "";
      media += post.video ? post.videoplayer : "";
      media += post.audio ? post.audioplayer : "";
      media += "<br />";
    }

    var body = "";
    body = post.body || post.quote || post.chat;
    if(!body) {
      body += post.lurl ? '<a href="' + post.lurl + '">' + post.link + '</a>' : "";
    }
    body = body.split(' ', 50).join(' ') + '... ';

    return '<p>' + date + title + media + body + '</p><span><a href="' + post.url + '" class="pull-right">READ MORE &#10095;</a></span>';
  };

  var postInfo = function(post) {
    var titleType = titleTypes[post.type];
    if (titleType in post) {
      return {
        title: post[titleType],
        url: post["url-with-slug"],
        body: post["regular-body"],
        img: post["photo-url-400"],
        quote: post["quote-text"],
        link: post["link-text"],
        lurl: post["link-url"],
        chat: post["conversation-text"],
        videoplayer: post["video-player"],
        audioplayer: post["audio-player"],
        date: post["date-gmt"]
      };
    }
  };

  return {
    render: function() {
      var loadingEl = $("<div>").text("Loading...").appendTo($(el));
      $.getJSON(apiUrl, function(data) {
        console.log(data);
        loadingEl.remove();
        $("<div>").appendTo($(el)).hide().append(renderPosts(data.posts)).slideDown('slow');
      });

      return this;
    }
  }
};

Tumblr.RecentPosts($("#tumblr-post")).render();

$("#totalCommit").blur(function(){
  $("#commit-collaposed").slideDown();
  $('#ss-submit').val("Submit");
})

$('#ss-submit').click(function(){
  $("#commit-collaposed").slideDown();
  $('#ss-submit').val("Submit");

})