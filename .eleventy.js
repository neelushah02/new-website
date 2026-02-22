module.exports = function(eleventyConfig) {

  // Copy assets and CSS to the output folder unchanged
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("style.css");

  // Custom filter: extracts just the year from a date
  eleventyConfig.addFilter("year", function(date) {
    return new Date(date).getFullYear();
  });

  // Collection: all .md files in /writing/, newest first
  eleventyConfig.addCollection("writing", function(collectionApi) {
    return collectionApi.getFilteredByGlob("writing/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes"
    }
  };
};