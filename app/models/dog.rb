class Dog < ApplicationRecord
  belongs_to :author, class_name: User.name

  validates :name, presence: true
  validates :avatar, presence: true

  has_attached_file :avatar, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: "/images/:style/missing.png"
  validates_attachment_content_type :avatar, :content_type => ["image/jpg", "image/jpeg", "image/png", "image/gif"]
end
