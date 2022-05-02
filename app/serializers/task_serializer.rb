class TaskSerializer < ActiveModel::Serializer
  attributes :id, :description, :priority, :completed

  has_many :notes
end
