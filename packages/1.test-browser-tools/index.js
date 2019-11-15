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
    const autocompleteInput = document.querySelector(`${selector} input`);
    const autocompleteOutput = document.querySelector(`${selector} .results`);

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
        fetchData(text).then(showResults);
      }, 50)
    );
    fetchData("").then(showResults);
  }

  function init() {
    setupAutocomplete("autocomplete");
  }

  init();
})(window, document);
