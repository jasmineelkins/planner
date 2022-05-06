# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

t1 =
  Task.create(
    description: 'Feed the cat',
    date_added: '',
    date_completed: '',
    completed: false,
    priority: 'High',
  )

Note.create(content: 'MEOW', task_id: t1.id)
