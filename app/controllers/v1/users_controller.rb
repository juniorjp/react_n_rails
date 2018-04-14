class V1::UsersController < ApplicationController

  def test
    return head(:bad_request) if current_user.nil?
    head :no_content
  end

  def create
     @user = User.new(user_params)
     if @user.save!
       payload = {
         sub: @user.id,
         exp: 1.month.from_now.to_i
       }

       @token = JWT.encode payload, Rails.application.secrets.secret_key_base, 'HS256'
       render :user_info
     else
       head :bad_request
     end
  end

  def authenticate
    login = params[:user][:login]
    @user = User.where(["lower(username) = :value OR lower(email) = :value", { value: login.downcase }]).first
    if @user
      payload = {
          sub: @user.id,
          exp: 1.month.from_now.to_i
      }

      @token = JWT.encode payload, Rails.application.secrets.secret_key_base, 'HS256'
      render :user_info
    else
      head :unauthorized
    end
  end

  def user_params
    params.require(:user).permit(:password, :email, :username, :avatar)
  end

end