// Get all the links in the main part of the page, excluding lightbox or AnchorJS links.
var links = document.querySelectorAll('.notepad-post-content a[href]:not(.anchorjs-link):not([data-lightbox^="image"]), .author-social-links a, .notepad-site-footer .copyright a');

var uniqueLinks = [];
var uniqueUrls = [];

for (var i = 0; i < links.length; i++) {
    var thisLink = links[i];
    var thisHref = thisLink.getAttribute('href');

    // Ignore internal links within the page.
    if (thisHref.indexOf('#') === 0) {
        continue;
    }

    // Ignore links that are already in the list.
    if (uniqueUrls[thisHref]) {
        continue;
    }
    uniqueUrls[thisHref] = thisLink;
    uniqueLinks.push(thisLink);
}

var linkList = '<div class="print-links"><h3>Links</h3><ol>';
var counter = 0;
for (var i = 0; i < uniqueLinks.length; i++) {
    counter++;

    // Add the footnote to the link.
    var marker = document.createRange().createContextualFragment('<sup class="print-link-footnote">' + counter + '</sup>');
    uniqueLinks[i].appendChild(marker);

    // Add the URL to the list.
    linkList += '<li>' + uniqueLinks[i].href + '</li>';
}
linkList += '</ol></div>';

// Add the list to the page.
var linkNode = document.createRange().createContextualFragment(linkList);
document.body.appendChild(linkNode);
