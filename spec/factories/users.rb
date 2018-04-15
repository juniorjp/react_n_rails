FactoryBot.define do
  sequence :user_email do |n|
    Faker::Internet.user_name + "#{n}@" + Faker::Internet.domain_name
  end
  factory :user do
    username { Faker::Internet.user_name }
    email { generate(:user_email) }
    password Faker::Config.random.seed
  end
end