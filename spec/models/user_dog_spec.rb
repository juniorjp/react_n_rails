require 'rails_helper'

RSpec.describe UserDog, type: :model do
  it { should belong_to(:user) }
  it { should belong_to(:dog) }
end
