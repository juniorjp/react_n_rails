Rails.application.routes.draw do
  root 'home#index'
  api_version(module: 'V1', header: { name: 'Accept', value: 'application/vnd.api+json; version=1' }, default: true) do
    post 'sign_up' => 'users#create'

  end
end
