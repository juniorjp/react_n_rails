class V1::UsersController < ApplicationController

  def test
    return head(:bad_request) if current_user.nil?
    head :no_content
  end

  def create
     user = User.create(user_params)

     payload = {
       sub: user.id,
       exp: 1.month.from_now.to_i
     }

     token = JWT.encode payload, Rails.application.secrets.secret_key_base, 'HS256'
     render json: {
         id: user.id,
         token: token
     }
  end

  def user_params
    params.require(:user).permit(:password, :email, :username, :avatar)
  end

end