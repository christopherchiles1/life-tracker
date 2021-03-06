Rails.application.routes.draw do
  root to: 'static_pages#root'

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :projects, except: [:new, :edit] do
      resources :tasks, only: [:create, :index]
    end
    resources :tasks, only: [:show, :update, :destroy]
  end
end
