require 'jekyll-assets'

Jekyll::Hooks.register :site, :after_init do |site, payload|
  site.config['assets'] = Hash.new unless site.config['assets']
  # site.config['assets']['digest'] = true
  site.config['assets']['compress'] = { 'js' => true, 'css' => true}
end

Jekyll::Hooks.register :site, :post_write do |site|
  path_to_file = "#{site.config['destination']}/to_delete.html"
  File.delete(path_to_file) if File.exist?(path_to_file)
end
