json.token @token
json.user_id @user.id
json.extract! @user, :id, :email, :username
json.avatar_url @user.avatar.url(:medium)