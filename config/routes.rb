Rails.application.routes.draw do
  resources :users
  resources :notes
  resources :tasks

  # Defines the root path route ("/")
  # root "articles#index"

  get '*path',
      to: 'application#fallback_index_html',
      constraints: ->(request) { !request.xhr? && request.format.html? }

  # for user login & auth
  get './me', to: 'users#show'
  post '/signup', to: 'users#create'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
end
