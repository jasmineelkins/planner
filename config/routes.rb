Rails.application.routes.draw do
  resources :users do
    resources :tasks
  end

  resources :tasks do
    resources :notes
  end

  resources :notes

  delete '/reset/:task_id', to: 'notes#reset_task_notes'

  # Defines the root path route ("/")
  # root "articles#index"

  get '*path',
      to: 'application#fallback_index_html',
      constraints: ->(request) { !request.xhr? && request.format.html? }

  # for user login & auth
  get '/me', to: 'users#show'
  post '/signup', to: 'users#create'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
end
