---
layout: post
title: SVG Icon Workflow for Jekyll with Gulp
description: "Improving performance by replacing icon fonts with SVG"
comments: true
author: malcolm_young
category: Frontend
tags: [Frontend, Blog, Jekyll, Performance]
---

The engineering blog is a great opportunity for us to make decisions without those pesky clients getting in the way. For one thing, the audience is other developers, which means that the browser profile of our visitors is very different to our normal work with large corporations. In other words, we don't need to support IE8.

When the blog started, we wanted to just get something up and running quickly, so we chose Jekyll, and found the [Notepad theme][notepad] which uses Foundation and Font Awesome for a nice clean blog theme. As time has gone on, we've made a few tweaks to the appearance and performance, and user experience enhancements, which we're putting into [our fork of Notepad][notepad2] as we get round to it. 

One tweak which I've been meaning to investigate for a while is SVG icons, ever since I heard [Chris Coyier talking about SVG at Smashing Conference][smashing]. I've been pleasantly surprised by how easy it was to implement within our existing Jekyll and Gulp setup.

## Why
There's an excellent write-up of the [pros and cons of various icon systems by Damon Bauer][damon], and there's a good [summary of the benefits of SVG compared to icon fonts on CSS Tricks][cagematch], but something that it doesn't mention much is performance. Icon fonts can be quite inefficient, especially if you're only using a few glyphs from the font. The Font Awesome font itself is 82kb, which may not seem too bad, but this site only uses 10 glyphs - combined into a single SVG, the file is only 4kb.

On top of that, Font Awesome needs styles. In our case, we were minifying and including the styles for Font Awesome within our main stylesheet, so it was only adding one HTTP request, but removing the styles from Font Awesome reduced the size of our stylesheet by 20kb (before gzip). 

## How
There are plenty of good tutorials out there already, not least by [Chris Coyier][coyier] and [Charles Peters][arwhd]. This setup is mainly lifted straight from those tutorials - the only original work here is making it work in Jekyll.

The first step was to get the images - luckily there's a repo with [the Font Awesome glyphs as separate SVG and PNG files][awesomeSVG]. Put the ones you want in a directory in your Jekyll install - I've created ```./src/assets/icons/``` for this. Within your gulpfile, set up an `icons` task, which uses [gulp-svgmin][gulp-svgmin], [gulp-svgstore][gulp-svgstore] and [gulp-cheerio][gulp-cheerio]. The README for gulp-svgstore is very helpful, and even proposes a PNG fallback (although we haven't used it), as well as the main gulp task:

```javascript
gulp.task('icons', function () {
  return gulp.src('./src/assets/icons/*')
    .pipe(svgmin())
    .pipe(svgstore({ fileName: 'icons.svg', inlineSvg: true}))
    .pipe(cheerio({
      run: function ($, file) {
        $('svg').addClass('hide');
        $('[fill]').removeAttr('fill');
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(gulp.dest('./_includes/'));
});
```

We're sending the output to the ```_includes``` directory of our Jekyll theme, and then we include the icons inline at the top of the page - in our case, in the ```header.html``` include:

```ruby
{% raw %}{% include icons.svg %}{% endraw %}
```

Then, it's easy to use the icons inline, using the symbol IDs generated from the file names of the source SVGs. For instance, here's the markup for our Search button:

```html
<button type="submit" value="Search" class="search-submit">
  <svg class="icon">
    <use xlink:href="#search"></use>
  </svg>
  <span>Search</span>
</button>
```

Then you can style the icons however you see fit - in our case, it's fairly minimal - here's the whole of our ```_icons.scss``` partial:

```scss
.icon {
  height: 1em;
  width: 1em;
  line-height: 1;
  fill: currentColor;

  .author-social-links & {
    vertical-align: -0.15em;
    display: inline-block;
  }
}
```

Finally, just to keep your production site tidy, exclude your source icons from being included in the Jekyll build, by adding it to the exclude variable in your `_config.yml` - here's our full exclude list:

```yaml
exclude: ["lib", "config.rb", "Gemfile", "Capfile", "Gemfile.lock", "config", "log", "Rakefile", "Rakefile.rb", "tmp", "less", "*.sublime-project", "*.sublime-workspace", "test", "spec", "gulpfile.js", "package.json", "node_modules", "README.md", "scss-lint.yml", "src"]
```

## Results    
The effect of this has been to reduce overall weight of our home page (running locally without gzip) from 558kb in 26 HTTP requests to 450kb in 20 HTTP requests. Given how simple this site looks, there's definitely still room for improvement - even though we're minifying and concatenating everything, our stylesheet weighs in at 143kb and our JavaScript is 121kb. Next on my hit-list is thinking about whether we can get rid of jQuery, and stripping out the unnecessary bits of CSS and JavaScript that are included from Foundation. 

[smashing]: https://capgemini.github.io/learning/super-smashing-great/
[cagematch]: https://css-tricks.com/icon-fonts-vs-svg/
[coyier]: https://css-tricks.com/svg-sprites-use-better-icon-fonts/
[arwhd]: https://arwhd.co/2015/05/18/svg-gulp-workflow/
[damon]: http://damonbauer.me/implementing-svg/
[awesomeSVG]: https://github.com/encharm/Font-Awesome-SVG-PNG
[notepad]: https://github.com/hmfaysal/Notepad
[notepad2]: https://github.com/Capgemini/notepad2
[gulp-svgmin]: https://github.com/ben-eb/gulp-svgmin
[gulp-svgstore]: https://github.com/w0rm/gulp-svgstore
[gulp-cheerio]: https://github.com/knpwrs/gulp-cheerio 
