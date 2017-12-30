// Mixing jQuery and Node.js code in the same file? Yes please!

$(function(){

    $('.header').append('Piaton ruokalista');

    // Electron's UI library. We will need it for later.
    var shell = require('shell');

    // Fetch the recent posts on Tutorialzine.
    var ul = $('.flipster ul');
    // The same-origin security policy doesn't apply to electron, so we can
    // send ajax request to other sites. Let's fetch Tutorialzine's rss feed:
    $.get('http://www.sonaatti.fi/modules/MenuRss/MenuRss/CurrentWeek?costNumber=1408&language=fi', function(response){
        var rss = $(response);
        // Find all articles in the RSS feed:
        rss.find('item').each(function(){
            var item = $(this);
            var li = $('<li class="ruutu"><h3></h3><p></p></li>');
            li.find('h3')
                .html(item.find("title").text().replace(/-/g,'.'));
            li.find('p')
                .html(item.find("description").text());
            li.appendTo(ul);

        });

        // Initialize the flipster plugin.
        $('.flipster').flipster({
            style: 'carousel'
        });

        // When an article is clicked, open the page in the system default browser.
        // Otherwise it would open it in the electron window which is not what we want.
        $('.flipster').on('click', 'a', function (e) {
            e.preventDefault();
            // Open URL with default browser.
            shell.openExternal(e.target.href);
        });

    });

});