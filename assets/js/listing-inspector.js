


chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    var app = document.getElementById('app')

    app.classList.add("hide");
    let url = tabs[0].url;
    console.log(url)

    //let url = "https://www.etsy.com/uk/listing/864774827/definitely-maybe-oasis-inspired-album?ga_order=most_relevant&ga_search_type=all&ga_view_type=gallery&ga_search_query=oasis&ref=sr_gallery-1-11&organic_search_click=1&frs=1&bes=1"

if (url.startsWith("https://www.etsy.com/uk/listing")) {
    
    app.classList.remove("hide");
    let elements = url.split("/")

    let listingId = elements[5]

    console.log(elements)
    console.log(listingId)
    var etsyJSONPScript = document.createElement('script');
    etsyJSONPScript.setAttribute('src','https://openapi.etsy.com/v2/listings/' + listingId + '.js?callback=getData&api_key=eo1zv9wmtwujqsm3t3a886xb');
    document.head.appendChild(etsyJSONPScript);
}
});
function getData(data) {
    console.log(data)
    if (data.ok) {
        var titleDiv = document.getElementById('title')
        var createdDiv = document.getElementById('created')
        var updatedDiv = document.getElementById('updated')
        var isFeaturedDiv = document.getElementById('is-featured')
        var viewsDiv = document.getElementById('views')
        var favoursDiv = document.getElementById('favours')
        var processingTimesDiv = document.getElementById('processing-times')
        var stockQtyDiv = document.getElementById('stock-qty')
        var tagsDiv = document.getElementById('tags')
        var materialsDiv = document.getElementById('materials')
        var categoriesDiv = document.getElementById('categories')
        var styleDiv = document.getElementById('style')

        let listing = data.results[0]

        let created = new Date(listing.creation_tsz * 1000)
        let updated = new Date(listing.last_modified_tsz * 1000) 
        
        titleDiv.innerHTML = listing.title
        createdDiv.innerHTML = created.toDateString()
        updatedDiv.innerHTML = updated.toDateString()
        isFeaturedDiv.innerHTML = listing.featured_rank ? "yes" : "no"
        viewsDiv.innerHTML = listing.views
        favoursDiv.innerHTML = listing.num_favorers
        processingTimesDiv.innerHTML = listing.processing_min + " to " + listing.processing_max + " days"
        stockQtyDiv.innerHTML =listing.quantity
        
        for (var c in listing.tags) {
            var newElement = document.createElement('div');
            newElement.className = "tag";
            newElement.innerHTML = listing.tags[c];
            tagsDiv.appendChild(newElement);
        } 
        
        for (var c in listing.materials) {
            var newElement = document.createElement('div');
            newElement.className = "tag";
            newElement.innerHTML = listing.materials[c];
            materialsDiv.appendChild(newElement);
        } 

        for (var c in listing.taxonomy_path) {
            var newElement = document.createElement('div');
            newElement.className = "tag";
            newElement.innerHTML = listing.taxonomy_path[c];
            categoriesDiv.appendChild(newElement);
        } 

        for (var c in listing.style) {
            var newElement = document.createElement('div');
            newElement.className = "tag";
            newElement.innerHTML = listing.style[c];
            styleDiv.appendChild(newElement);
        } 
      } else {
          alert(data.error);
    }
}
