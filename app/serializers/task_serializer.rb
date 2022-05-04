class TaskSerializer < ActiveModel::Serializer
  attributes :id,
             :description,
             :priority,
             :completed,
             :date_completed,
             :date_added

  has_many :notes
end
