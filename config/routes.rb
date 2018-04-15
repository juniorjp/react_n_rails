Rails.application.routes.draw do
  root 'home#index'
  api_version(module: 'V1', header: { name: 'Accept', value: 'application/vnd.api+json; version=1' }, default: true) do
    post 'sign_up' => 'users#create', format: 'json'
    post 'sign_in' => 'users#authenticate', format: 'json'

    resources :dogs, defaults: { format: 'json' }
  end
  get '*path', to: 'home#index'
end
