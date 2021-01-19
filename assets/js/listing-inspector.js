const getKeywords = () => {
  const keyword = document.getElementById("keyword").value
  console.log(keyword)
  fetch('https://us-central1-mythic-rain-390.cloudfunctions.net/function-1?keyword=' + keyword)
    .then(response => response.json())
    .then(data => console.log(data));
}

document.getElementById("getKeywords").onclick = getKeywords;
