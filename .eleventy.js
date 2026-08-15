module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("style.css");

  eleventyConfig.addFilter("year", function(date) {
    return new Date(date).getFullYear();
  });

  eleventyConfig.addFilter("fullDate", function(date) {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC'
    });
  });

  eleventyConfig.addCollection("writing", function(collectionApi) {
    return collectionApi.getFilteredByGlob("writing/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });

  return {
    // Process .md files as Nunjucks first, then Markdown.
    // This means {{ '/assets/x.jpg' | url }} works inside .md files,
    // fixing image paths on GitHub Pages subdirectory hosting.
    markdownTemplateEngine: "njk",

    pathPrefix: process.env.CI ? "/new-website/" : "/",

    dir: {
      input: ".",
      output: "_site",
      includes: "_includes"
    }
  };
};