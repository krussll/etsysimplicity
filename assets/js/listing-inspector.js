const getKeywords = () => {
  const loadMessage = document.getElementById("loading")
  const results = document.getElementById("result")
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

  //top performing elements
  const topPerformingAge = document.querySelector("[data-top-performing] [data-avg-age]")
  const topPerformingViews = document.querySelector("[data-top-performing] [data-avg-monthly-views]")
  const topPerformingStrongMatch = document.querySelector("[data-top-performing] [data-strong-keyword-match]")
  const topPerformingPartial = document.querySelector("[data-top-performing] [data-partial-keyword-match]")

  //all listing elements
  const allRankingAge = document.querySelector("[data-top-listings] [data-avg-age]")
  const allRankingViews = document.querySelector("[data-top-listings] [data-avg-monthly-views]")
  const allRankingStrongMatch = document.querySelector("[data-top-listings] [data-strong-keyword-match]")
  const allRankingPartial = document.querySelector("[data-top-listings] [data-partial-keyword-match]")

  const keyword = document.getElementById("keyword").value
  console.log(keyword)
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
      
      topPerformingAge.innerText = data.topPerformers.average_age
      topPerformingViews.innerText = data.topPerformers.monthly_avg_views
      topPerformingStrongMatch.innerText = data.topPerformers.targeting_keyword
      topPerformingPartial.innerText = data.topPerformers.strong_partial

      allRankingAge.innerText = data.totalResults.average_age
      allRankingViews.innerText = data.totalResults.monthly_avg_views
      allRankingStrongMatch.innerText = data.totalResults.targeting_keyword
      allRankingPartial.innerText = data.totalResults.strong_partial
      const cloudTags = data.totalResults.common_tags.map(({count, tag}) => { return { text: tag, weight: count }})

      console.log(cloudTags)
      $("#word-cloud").jQCloud(cloudTags);
    
      results.classList.remove("hide")
  
      loadMessage.classList.add("hide")
  });
}

document.getElementById("getKeywords").onclick = getKeywords;
