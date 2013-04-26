require 'httparty'
require 'mustache'
require 'json'
require 'fileutils'

response = HTTParty.get('http://list.cape.io/jobs_northmpls.json')

Mustache.template_file = 'job-details.mustache'
view = Mustache.new

# Make sure to create

response.each do |item|
  puts "#{item['jobtitle']} #{item['company']}"

  save_path = "jobs/#{item['jobkey']}"

  unless File.directory?(save_path)
    #puts save_path
    FileUtils.mkdir_p(save_path)
  end

  # Render the .html file
  rendered_item = view.render(item)

  File.open("jobs/#{item['jobkey']}.html","w") do |f|
    f.write(rendered_item)
  end

  File.open("jobs/#{item['jobkey']}/index.html","w") do |f|
    f.write(rendered_item)
  end

  # json output
  File.open("jobs/#{item['jobkey']}.json","w") do |f|
    f.write(item.to_json)
  end
end
