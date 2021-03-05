module Reading
    class CtaPanelGenerator < Jekyll::Generator
        def initialize(config)
            @config = config
        end
        
        def generate(site)	
            return if @config["has_cta_panels"] != true
            
            product = @config['product']
            
            cta_panels_data = site.data["cta_panels_data"][product]
            overview_regex = cta_panels_data["overview_regex"] || '(^controls\/).*\/overview\.md$' # '(^controls\/)[^\/]*\/overview\.md$' - seach only one subfolder
            introduction_regex = cta_panels_data["introduction_regex"] || 'introduction\.md$'
            

            # Not sure what the following should actually achieve
            # overview_articles = cta_panels_data["overview_articles"].nil? ? [] : cta_panels_data["overview_articles"]
            # introduction_articles = cta_panels_data["introduction_articles"].nil? ? [] : cta_panels_data["introduction_articles"]
            # overview_paths = overview_articles.keys

            Navigation.load(YAML.load(File.read('_config.yml'))['navigation'])
            
            site.pages.each do |p|	
                shouldCreateCTA = false
                
                next if p.content.match(/\{%.*include.*cta-panel-.*%\}/)
                
                if p.path.match(Regexp.new(introduction_regex))
                    p.data["isIntroduction"] = true

                    shouldCreateCTA = true
                elsif p.path.match(Regexp.new(overview_regex))
                    p.data["isControlOverview"] = true

                    filename = p.path.split("/").pop()
                    controlPath = p.path.sub("/"+filename,"")
                    controlName = Navigation.get_entry(controlPath)

                    if controlName.nil? || controlName.empty?
                        Jekyll.logger.warn "ERROR:", "No title for `#{controlPath}` path. Consider fixing in _config.yml - navigation."
                        
                        p.data["isIntroduction"] = true
                    else
                        p.data["CTAControlName"] = controlName ["title"]
                    end
                    
                    shouldCreateCTA = true
                else
                    p.data["isRestOfPages"] = true
                end

                if shouldCreateCTA
                    createCtaPanel(p.content, p, site)
                end
            end
        end

        def createCtaPanel(content, page, site)
            panel = "\n{% include cta-panel-overview.html %}\n"

            if page.data["isIntroduction"]
                panel = "\n{% include cta-panel-introduction.html %}\n"
            end

            matchLine = ""
            headingFound = false

            content.each_line do |line| 
                hasMatch = line.match(/^\**(\w|`\w)/)

                if headingFound && hasMatch
                    matchLine = line
                elsif headingFound && !hasMatch && !line.match(/^\s*$/)
                    break
                end

                if line.match(/^#\s/)
                    headingFound = true
                    matchLine = line
                end
            end

            content.sub!(matchLine, matchLine + panel);
        end  
        def format_title(title)
            title.split('-').map { |w| w.upcase[0] + w[1,w.size - 1] }.join(' ')
          end
      end
end
