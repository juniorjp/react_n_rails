set :port, 22
set :user, 'jr'
set :deploy_via, :remote_cache
set :use_sudo, false

server '192.241.181.11',
       roles: [:web, :app, :db],
       port: fetch(:port),
       user: fetch(:user),
       primary: true

set :deploy_to, "/home/#{fetch(:user)}/app/#{fetch(:application)}"

set :ssh_options, {
    forward_agent: true,
    auth_methods: %w(publickey),
    user: 'jr',
}

set :rails_env, :production
set :conditionally_migrate, true