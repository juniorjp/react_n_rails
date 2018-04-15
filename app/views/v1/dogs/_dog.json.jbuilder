json.name dog.name
json.id dog.id
json.avatar_url dog.avatar.url(:medium)

json.author do
  json.extract! dog.author, :id, :username, :email
end
