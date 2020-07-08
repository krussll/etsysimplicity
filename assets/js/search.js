jQuery(function () {

  // Get the generated search_data.json file so lunr.js can search it locally.
  window.data = $.getJSON('/search_data.json');

    console.log('loading data')
  // Wait for the data to load and add it to lunr
  const idx = window.data.then(function(loaded_data) {
    console.log(loaded_data)
    return lunr(function () {
      this.field('title');
      this.field('content', { boost: 10 });
      this.field('author');
      this.field('categories');
      
      $.each(loaded_data, function(index, value){
        this.add(value);
      }, this);   
    });
  });
  

    console.log(idx)
  // Event when the form is submitted
  $("#site_search").submit(function(event){
      event.preventDefault();
    console.log(idx)
      var query = $("#search_box").val(); // Get the value for the text field
      var results = idx.search(query); // Get lunr to perform a search
      display_search_results(results); // Hand the results off to be displayed
  });

  function display_search_results(results) {
    var $search_results = $("#search_results");

    // Wait for data to load
    window.data.then(function(loaded_data) {

      // Are there any results?
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
  }
});
