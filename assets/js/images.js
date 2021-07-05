/**
 * Function to wrap all article images in a Lightbox link.
 * Grabs all img elements within the article div, excluding the images on the presentation page. For each image;
 * creates a wrapper element (the lightbox link) and wraps up the original image.
 * Function is an immediately invoked function expression.
 */
(function () {
    var articleImages = document.querySelectorAll('div.article-body img:not(.presentation-thumbnail)');

    articleImages.forEach(function (image) {
        var imageUrl = image.getAttribute("src");

        var imageWrapper = document.createElement("a");
        imageWrapper.setAttribute("href", imageUrl);
        imageWrapper.classList.add('article-gallery');

        image.parentNode.insertBefore(imageWrapper, image);
        imageWrapper.appendChild(image);
    });

    /*
     * Create a new instance of the luminous gallery and groups all our wrapped images into it.
     * Adds a function to give each gallery image a caption which is the alt of the image.
     * https://github.com/imgix/luminous/
     */
    new LuminousGallery(document.querySelectorAll('.article-gallery'), {}, {
        caption: function (trigger) {
            return trigger.querySelector('img').getAttribute('alt');
        }
    });
})();
