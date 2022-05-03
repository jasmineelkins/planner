class TaskSerializer < ActiveModel::Serializer
  attributes :id, :description, :priority, :completed, :date_completed

  has_many :notes
end
