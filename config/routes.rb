Rails.application.routes.draw do
  root 'home#index'
  api_version(module: 'V1', header: { name: 'Accept', value: 'application/vnd.api+json; version=1' }, default: true) do
    post 'sign_up' => 'users#create', format: 'json'
    post 'sign_in' => 'users#authenticate', format: 'json'
    get 'list_users' => 'users#index', format: 'json'
    resources :dogs, defaults: { format: 'json' } do
      post :add_wishlist, on: :member
    end
  end
  get '*path', to: 'home#index'
end
