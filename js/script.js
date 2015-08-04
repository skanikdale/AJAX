
function loadBgImage() {

    var street = $('#street').val();
    var city = $('#city').val();
    var address = street + ',' + city;
    
    var streetviewURL = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address;

    console.log(address);
    console.log(streetviewURL);

    $('body').append('<img class="bgimg" src=" ' + streetviewURL +  ' ">');       
}

function loadNYData() {

    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var city = $('#city').val();

    $nytElem.text("");       

    var nyTimesURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' +
                      city + '&sort=newest&api-key=677fe111c8a965cb5a566873b1d34753:6:72581648';

    $.getJSON(nyTimesURL, function(data) {
        
        $nytHeaderElem.text('New York Times articles about:- ' + city);

        articles = data.response.docs;

        for(var i = 0; i < articles.length; i++) {
            var article = articles[i];

            $nytElem.append('<li class="article" >' + 
                '<a href=' + article.web_url + '>' + article.headline.main +
                '</a>' + '<p>' + article.snippet + '</p>' + '</li>')
        };
    }).error(function(e){
        $nytHeaderElem.text('New York Times Articles could not be loaded.');
    });
}

function loadWikiLinks() {

    var city = $('#city').val();
    var $wikiElem = $('#wikipedia-links'); 
    var wikiURL = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' +
                   city + '&format=json&callback=wikiCallback';
                   
    // clear out old data before new request
    $wikiElem.text("");    

    var wikiRequestTimeout = setTimeout(function() {
        $wikiElem.text("failed to get wikipedia resource");
    }, 8000 );

    $.ajax( {
    url: wikiURL,
    dataType: 'jsonp',
    success: function(response) {
       
       var articleList = response[1];

       for(var i = 0; i < articleList.length; i++) {

            var article = articleList[i];
            var url = 'http://en.wikipedia.org/wiki/' + article;

            $wikiElem.append('<li><a href="' + url + '">' + article + '</a></li>');            
        };

        clearTimeout(wikiRequestTimeout);
    }
} );
}

function loadData() {

    loadBgImage();
    loadNYData();
    loadWikiLinks();
 
    return false;
};

$('#form-container').submit(loadData);

