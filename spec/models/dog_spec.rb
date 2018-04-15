require 'rails_helper'

RSpec.describe Dog, type: :model do
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:avatar) }
end
