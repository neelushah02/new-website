module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("style.css");

  eleventyConfig.addFilter("year", function(date) {
    return new Date(date).getFullYear();
  });

  eleventyConfig.addCollection("writing", function(collectionApi) {
    return collectionApi.getFilteredByGlob("writing/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });

  return {
    // Use /new-website/ prefix only when building for GitHub Pages (CI=true).
    // Locally, no prefix so localhost:8080 works normally.
    pathPrefix: process.env.CI ? "/new-website/" : "/",

    dir: {
      input: ".",
      output: "_site",
      includes: "_includes"
    }
  };
};