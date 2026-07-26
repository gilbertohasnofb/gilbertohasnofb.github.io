source "https://rubygems.org"

# Use the github-pages gem so your local build uses the exact same
# Jekyll + plugin versions that GitHub Pages uses to build the site.
# This avoids "works locally, breaks on GitHub Pages" issues.
gem "github-pages", group: :jekyll_plugins

group :jekyll_plugins do
  gem "jekyll-sitemap"
  gem "jekyll-feed"
end

# Windows/JRuby compatibility (harmless to include even if you're on
# macOS/Linux)
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]
