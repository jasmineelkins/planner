class Task < ApplicationRecord
  has_many :notes, dependent: :destroy
  belongs_to :user
end
