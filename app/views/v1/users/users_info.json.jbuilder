json.users do
  json.array! @users do |user|
    json.extract! user, :id, :email, :username
    json.avatar_url user.avatar.url(:medium)
  end
end

