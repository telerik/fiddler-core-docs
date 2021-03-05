require 'jekyll-sitemap'

module Jekyll
  class JekyllSitemap < Jekyll::Generator
    def generate(site)
      @site = site
      @site.pages << sitemap unless file_exists?("sitemap.xml")
    end
    
    #override the method from the original Jekyll-sitemap gem so it always uses our template instead of using their built-in template
    def source_path
        File.expand_path('sitemap.xml', File.dirname(__FILE__))
      end
    end
	JekyllSitemap.new.source_path

end
