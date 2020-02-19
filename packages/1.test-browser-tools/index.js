(function(window, document) {
  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this,
        args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      }, wait);
      if (immediate && !timeout) func.apply(context, args);
    };
  }

  function fetchData(text) {
    return fetch("https://www.reddit.com/r/all.json")
      .then(response => response.json())
      .then(data => data.data.children)
      .then(data =>
        data.filter(
          q =>
            q.data.title
              .toLocaleLowerCase()
              .startsWith(text.toLocaleLowerCase()) ||
            q.data.subreddit
              .toLocaleLowerCase()
              .startsWith(text.toLocaleLowerCase()) ||
            q.data.author
              .toLocaleLowerCase()
              .startsWith(text.toLocaleLowerCase())
        )
      );
  }

  function formatData(post) {
    const li = document.createElement("li");
    li.textContent = `${post.data.subreddit} - ${post.data.title}`;
    return li;
  }

  function setupAutocomplete(selector) {
    const autocompleteInput = document.querySelector(`.${selector} input`);
    const autocompleteOutput = document.querySelector(`.${selector} .results`);

    function showResults(data) {
      autocompleteOutput.innerHTML = "";
      for (const post of data) {
        autocompleteOutput.appendChild(formatData(post));
      }
    }

    autocompleteInput.addEventListener(
      "keyup",
      debounce(key => {
        const text = key.target.value;
        showResults(fetchCachedData(text));
      }, 50)
    );
  }

  function init() {
    //get data from server first and then we inizialice the autocomplete
    getData().then(setupAutocomplete("autocomplete"))
  }

  /* --------------Mejoras--------------------*/
  
  const CACHE = 'cachedData'
  const SEARCH_URL = 'https://www.reddit.com/r/all.json'

  //fetches data and stores it on the session cache
  //sessionStorage doesn't allow to store objects, so I simply stringify it
  //it would be a good idea to implement a timeout loop to refresh the data once in a while
  const getData = function(){

    return fetch(SEARCH_URL)
    .then(response => response.json())
    .then(data => data.data.children)
    .then(data => sessionStorage.setItem(CACHE, JSON.stringify(data)));
    //we should implement an error handler here
    
  }

  //retrieves the data from session cache and does the search process
  //data is stored as a json string, so I need to parse it back to a proper object
  //if the text to filter is empty, we simply return an empty array
  const fetchCachedData = function(text){
    
    if (text.length < 1) return [];

    const cache = JSON.parse(sessionStorage.getItem(CACHE));

    return cache.filter(
      q =>
        q.data.title
          .toLocaleLowerCase()
          .startsWith(text.toLocaleLowerCase()) ||
        q.data.subreddit
          .toLocaleLowerCase()
          .startsWith(text.toLocaleLowerCase()) ||
        q.data.author
          .toLocaleLowerCase()
          .startsWith(text.toLocaleLowerCase())
    )
  }

  init();
})(window, document);
