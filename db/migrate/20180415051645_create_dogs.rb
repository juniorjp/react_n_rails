class CreateDogs < ActiveRecord::Migration[5.1]
  def change
    create_table :dogs do |t|
      t.attachment :avatar
      t.string :name
      t.integer :author_id
      t.timestamps
    end
    add_index :dogs, :author_id
  end
end
