json.dogs do
  json.array! @dogs do |dog|
    json.partial! 'v1/dogs/dog', dog: dog
  end
end