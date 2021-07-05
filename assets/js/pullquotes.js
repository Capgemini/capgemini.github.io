(function() {
  // Add class to blockquotes with citations.
  document.querySelectorAll("blockquote cite").forEach(function(quote) {
    quote.closest("blockquote").classList.add("has-cite");
  });

  // Extract pull quotes from body - see https://css-tricks.com/better-pull-quotes/
  document.querySelectorAll("span.pullquote").forEach(function(quote) {
    var parentParagraph = quote.closest("p");
    parentParagraph.classList.add("pulledquoteparent");
    var clonedQuote = quote.cloneNode();
    clonedQuote.classList.add("pulledquote");
    parentParagraph.insertBefore(clonedQuote, quote);
  });

  document.querySelectorAll("span.pulledquote").forEach(function(quote, i) {
    var row = i % 2 == 1 ? "even" : "odd";
    var parentParagraph = quote.closest("p.pulledquoteparent");

    // Remove the existing span, we'll be creating a new div to replace it
    parentParagraph.removeChild(
      document.querySelector("span.pullquote.pulledquote")
    );

    var quoteSpan = parentParagraph.querySelector("span.pullquote");
    var newDiv = document.createElement("div");
    newDiv.classList.add("pulledquote", row);
    newDiv.innerHTML = "<blockquote>" + quoteSpan.innerHTML + "</blockquote>";

    parentParagraph.insertBefore(newDiv, parentParagraph.firstChild);
  });
})();
