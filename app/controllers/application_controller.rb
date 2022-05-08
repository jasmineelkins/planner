class ApplicationController < ActionController::Base
  include ActionController::Cookies
  skip_before_action :verify_authenticity_token

  # before_action :authorized

  # def authorized
  #   unless session.include? :user_id
  #     return render json: { error: 'Not authorized' }, status: :unauthorized
  #   end
  # end

  def fallback_index_html
    render file: 'public/index.html'
  end
end
