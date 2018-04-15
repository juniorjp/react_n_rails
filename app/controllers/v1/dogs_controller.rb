class V1::DogsController < ApplicationController

  before_action :authenticate_user

  def index
    params[:user_id] ? @user = User.find(params[:user_id]) : @user = current_user
    @dogs = @user.dogs
    render :dogs_info
  end
  def create
    @dog = Dog.new(dog_params)
    @dog.author = current_user
    if @dog.save!
      render :dog_info
    else
      head :bad_request
    end
  end

  def dog_params
    params.require(:dog).permit(:name, :avatar)
  end

end