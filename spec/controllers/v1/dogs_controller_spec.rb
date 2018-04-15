require 'rails_helper'

RSpec.describe V1::DogsController, :type => :controller do
  include ActiveJob::TestHelper
  describe 'POST create' do
    render_views
    it 'creates a dog and returns the dog registered info' do
      payload_info = { dog: {
          name: 'pastor',
          avatar: Rack::Test::UploadedFile.new( File.dirname(__FILE__) + '/../../factories/dog_test_avatar.png', 'image/png')
          }
      }
      author = FactoryBot.create(:user)
      authorization_info = {
          sub: author.id,
      }
      @request.headers['Accept'] = 'application/vnd.api+json; version=1'
      token = JWT.encode authorization_info, Rails.application.secrets.secret_key_base, 'HS256'
      @request.headers['Authorization'] = token
      post :create, params: payload_info, format: :json
      dog = Dog.last
      parsed_response = JSON.parse(response.body).with_indifferent_access
      expect(parsed_response[:author][:id]).to eq(author.id)
      expect(parsed_response[:name]).to eq(dog.name)
    end

  end

end
