
// Based on https://gomakethings.com/how-to-create-a-vanilla-js-search-page-for-a-static-website/
;(function (window, document, undefined) {

  'use strict';

  //
  // Variables
  //

  var form = document.querySelector('#form-search');
  var input = document.querySelector('#input-search');
  var resultList = document.querySelector('#search-results');

  //
  // Methods
  //

  /**
   * Create the HTML for each result
   * @param  {Object} article The article
   * @param  {Number} id      The result index
   * @return {String}         The markup
   */
  var createHTML = function (article, id) {

    var description = article.description.slice(0, 150);

    var html =
        '<li id="search-result-' + id + '">' +
        '<a href="' + article.url + '">' +
        '<div class="search-result-header">' + article.title +
        '<span class="entry-date">' + article.shortdate + '</span>' + '</div>';
    if (!!description) {
      html += '<p class="entry-description">' + description + '</p>';
    }
    html += '</a>' + '</li>';
    return html;
  };

  /**
   * Create the markup when no results are found
   * @return {String} The markup
   */
  var createNoResultsHTML = function () {
    return '<p>Sorry, no matches were found.</p>';
  };

  /**
   * Create the markup for results
   * @param  {Array} results The results to display
   * @return {String}        The results HTML
   */
  var createResultsHTML = function (results) {
    var html = '<p class="search-results-count">Found ' + results.length + ' matching articles</p>';
    html += '<ul class="post-list">';
    html += results.map(function (article, index) {
      return createHTML(article, index);
    }).join('');
    html += '</ul>';
    return html;
  };

  /**
   * Search for matches
   * @param  {String} query The term to search for
   */
  var search = function (query) {

    // Variables
    var reg = new RegExp(query, 'gi');
    var priority1 = [];
    var priority2 = [];

    // Search the content
    searchIndex.forEach(function (article) {
      if (reg.test(article.title)) return priority1.push(article);
      if (reg.test(article.content)) priority2.push(article);
    });

    // Combine the results into a single array
    var results = [].concat(priority1, priority2);

    // Display the results
    resultList.innerHTML = results.length < 1 ? createNoResultsHTML() : createResultsHTML(results);

  };

  /**
   * Handle submit events
   */
  var submitHandler = function (event) {
    // Are we on the search results page?
    if (!!resultList) {
      event.preventDefault();
      search(input.value);
    }
  };

  /**
   * Set up the form input to use the local site search.
   */
  var clearInput = function (term) {
    form.setAttribute('action', '/search');
    if (term === undefined) {
      term = '';
    }
    input.value = input.value.replace(' site:capgemini.github.io', term);
  };

  /**
   * Gets query string parameter - taken from http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
   * @param {String} name
   * @return {String} parameter value
   */
  var getParameterByName = function(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  };

  //
  // Inits & Event Listeners
  //

  // Make sure required content exists
  if (!form || !input) return;

  var term = getParameterByName('q');
  if (!!term) {
    search(term);
    clearInput(term);
  }
  else {
    // Clear the input field
    clearInput('');
  }

  // Create a submit handler
  form.addEventListener('submit', submitHandler, false);

})(window, document);
