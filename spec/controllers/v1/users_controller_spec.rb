require 'rails_helper'

RSpec.describe V1::UsersController, :type => :controller do
  include ActiveJob::TestHelper
  describe 'POST signup' do

    it 'creates a user and returns a JWT token' do
      payload_info = { user: {
          username: 'jirico',
          email: 'jack@ctu.com',
          password: '123456'
          }
      }
      @request.headers['Accept'] = 'application/vnd.api+json; version=1'

      post :create, params: payload_info
      user = User.last
      parsed_response = JSON.parse(response.body).with_indifferent_access
      decoded_info = JWT.decode(parsed_response[:token], Rails.application.secrets.secret_key_base, 'HS256')[0].with_indifferent_access
      expect(decoded_info[:sub]).to eq(user.id)

    end

  end

end
