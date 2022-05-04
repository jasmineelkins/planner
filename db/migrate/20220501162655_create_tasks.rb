class CreateTasks < ActiveRecord::Migration[7.0]
  def change
    create_table :tasks do |t|
      t.string :description
      t.datetime :date_added
      t.datetime :date_completed
      t.boolean :completed
      t.string :priority

      t.timestamps
    end
  end
end
