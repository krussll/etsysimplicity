jQuery(function () {

  // Get the generated search_data.json file so lunr.js can search it locally.
  window.data = $.getJSON('/search_data.json');
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get('search');

  console.log('loading data')
  // Wait for the data to load and add it to lunr
  window.data.then(function(loaded_data) {
    console.log('data loaded')
    console.log(loaded_data)
    var idx = lunr(function () {
      lunrRef = this
      lunrRef.ref('ref');
      lunrRef.field('title');
      lunrRef.field('content', { boost: 10 });
      lunrRef.field('author');
      lunrRef.field('categories');
      
      $.each(loaded_data, function(index, value){
        lunrRef.add(value);
      }, lunrRef);   
    });
    
    console.log('doing search')
    var results = idx.search(searchQuery); // Get lunr to perform a search
    console.log(results)
    
    var $search_results = $("#search_results");
    
    if (results.length) {
        $search_results.empty(); // Clear any old results

        // Iterate over the results
        results.forEach(function(result) {
          var item = loaded_data[result.ref];

          // Build a snippet of HTML for this result
          var appendString = '<li><a href="' + item.url + '">' + item.title + '</a></li>';

          // Add the snippet to the collection of results.
          $search_results.append(appendString);
        });
      } else {
        // If there are no results, let the user know.
        $search_results.html('<li>No results found.<br/>Please check spelling</li>');
      }
  });
});
