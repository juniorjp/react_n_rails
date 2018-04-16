set :rvm_type, :user
set :rvm1_ruby_version, "ruby-2.3.1"
set :rvm1_map_bins, %w{rake gem bundle ruby}

set :application, 'dogs'
set :repo_url, 'git@github.com:juniorjp/react_n_rails.git'

set :branch, 'master'
set :migration_role, :app
set :use_sudo, false
set :bundle_binstubs, nil
set :unicorn_pid, '/home/jr/app/shared/pids/unicorn.dog.pid'
set :linked_files, fetch(:linked_files, []).push('config/database.yml', 'config/application.yml')
set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system')

after 'deploy:publishing', 'deploy:restart'

namespace :deploy do
  task :restart do
    invoke 'unicorn:restart'
  end

  task :seed do
    puts "\n=== Seeding Database ===\n"
    on primary :db do
      within current_path do
        with rails_env: fetch(:stage) do
          execute :rake, 'db:seed'
        end
      end
    end
  end

end