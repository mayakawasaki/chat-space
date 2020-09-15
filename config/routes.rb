Rails.application.routes.draw do
  devise_for :users
  root "groups#index"
  resources :users, only: [:index, :edit, :update]
  resources :groups, only: [:index, :new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
  #apiのrutes記述 namespace :ディレクトリ名  do
  #end
    namespace :api do
      resources :messages, only: :index, defaults: { format: 'json' }
    end
  end
end
