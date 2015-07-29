
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

    var nyTimesURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + city + '&sort=newest&api-key=677fe111c8a965cb5a566873b1d34753:6:72581648';

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


function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links'); 
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");    

    loadBgImage();
    loadNYData();
   

    // load streetview

    // YOUR CODE GOES HERE!

    return false;
};

$('#form-container').submit(loadData);

