const getKeywords = () => {
  const loadMessage = document.getElementById("loading")
  const results = document.getElementById("result")
  const heading = document.getElementById("search-heading")
  const features = document.getElementById("tool-features")
  const search = document.getElementById("search-bar")
  const keyword = document.getElementById("keyword").value

  // top level elements
  const analysedListings = document.querySelector("[data-analysed-listings]")
  const competiton = document.querySelector("[data-competiton]")
  const uniqueStores = document.querySelector("[data-unique-stores]")

  //top ranking elements
  const topRankingAge = document.querySelector("[data-top-ranking] [data-avg-age]")
  const topRankingViews = document.querySelector("[data-top-ranking] [data-avg-monthly-views]")
  const topRankingStrongMatch = document.querySelector("[data-top-ranking] [data-strong-keyword-match]")
  const topRankingPartial = document.querySelector("[data-top-ranking] [data-partial-keyword-match]")
  const topRankingTags = document.querySelector("[data-top-ranking] [data-top-tags]").getElementsByTagName('tbody')[0]
  const topRankingImages = document.querySelector("[data-top-ranking] [data-top-images]")

  //top performing elements
  const topPerformingAge = document.querySelector("[data-top-performing] [data-avg-age]")
  const topPerformingViews = document.querySelector("[data-top-performing] [data-avg-monthly-views]")
  const topPerformingStrongMatch = document.querySelector("[data-top-performing] [data-strong-keyword-match]")
  const topPerformingPartial = document.querySelector("[data-top-performing] [data-partial-keyword-match]")
  const topPerformingTags = document.querySelector("[data-top-performing] [data-partial-tags]").getElementsByTagName('tbody')[0]
  const topPerformingImages = document.querySelector("[data-top-performing] [data-partial-images]")

  //all listing elements
  const allRankingAge = document.querySelector("[data-top-listings] [data-avg-age]")
  const allRankingViews = document.querySelector("[data-top-listings] [data-avg-monthly-views]")
  const allRankingStrongMatch = document.querySelector("[data-top-listings] [data-strong-keyword-match]")
  const allRankingPartial = document.querySelector("[data-top-listings] [data-partial-keyword-match]")
  const allRankingTags = document.querySelector("[data-top-listings] [data-tags]").getElementsByTagName('tbody')[0]
  const allRankingImages = document.querySelector("[data-top-listings] [data-images]")

  console.log(keyword)
  
  loadMessage.classList.remove("hide")
  results.classList.add("hide")
  
  fetch('https://us-central1-mythic-rain-390.cloudfunctions.net/function-1?keyword=' + keyword)
    .then(response => response.json())
    .then(data => {
      console.log(data)
            
      analysedListings.innerText = data.listingsAnalysed
      competiton.innerText = data.competiton
      uniqueStores.innerText = data.uniqueStores

      topRankingAge.innerText = data.topResults.average_age
      topRankingViews.innerText = data.topResults.monthly_avg_views
      topRankingStrongMatch.innerText = data.topResults.targeting_keyword
      topRankingPartial.innerText = data.topResults.strong_partial
    
      topRankingTags.innerHTML = '';
      data.topResults.common_tags.forEach(element => {        
        let newRow = topRankingTags.insertRow()
        newRow.insertCell().appendChild(document.createTextNode(element.tag))
        newRow.insertCell().appendChild(document.createTextNode(element.count))
      });

      topRankingImages.innerHTML = '';
      data.topResults.sample_images.forEach(element => {
        let img = document.createElement("img")
        img.src = element
        topRankingImages.appendChild(img);
      });
      
      topPerformingAge.innerText = data.topPerformers.average_age
      topPerformingViews.innerText = data.topPerformers.monthly_avg_views
      topPerformingStrongMatch.innerText = data.topPerformers.targeting_keyword
      topPerformingPartial.innerText = data.topPerformers.strong_partial
    
      topPerformingTags.innerHTML = '';
      data.topPerformers.common_tags.forEach(element => {        
        let newRow = topPerformingTags.insertRow()
        newRow.insertCell().appendChild(document.createTextNode(element.tag))
        newRow.insertCell().appendChild(document.createTextNode(element.count))
      });

      topPerformingImages.innerHTML = '';
      data.topPerformers.sample_images.forEach(element => {
        let img = document.createElement("img")
        img.src = element
        topPerformingImages.appendChild(img);
      });

      allRankingAge.innerText = data.totalResults.average_age
      allRankingViews.innerText = data.totalResults.monthly_avg_views
      allRankingStrongMatch.innerText = data.totalResults.targeting_keyword
      allRankingPartial.innerText = data.totalResults.strong_partial
    
      allRankingTags.innerHTML = '';
      data.totalResults.common_tags.forEach(element => {        
        let newRow = allRankingTags.insertRow()
        newRow.insertCell().appendChild(document.createTextNode(element.tag))
        newRow.insertCell().appendChild(document.createTextNode(element.count))
      });
           
      allRankingImages.innerHTML = '';
      data.totalResults.sample_images.forEach(element => {
        let img = document.createElement("img")
        img.src = element
        allRankingImages.appendChild(img);
      });
    
      $("#word-cloud").jQCloud(data.totalResults.common_tags.map(({count, tag}) => { return { text: tag, weight: count }}));
    
      results.classList.remove("hide")
      loadMessage.classList.add("hide")
      heading.classList.add("hide")
      features.classList.add("hide")
      search.classList.add("searching")
  });
}

document.getElementById("search-form").addEventListener('submit', getKeywords)
