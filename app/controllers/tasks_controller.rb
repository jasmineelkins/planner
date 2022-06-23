class TasksController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :render_invalid_response

  # GET /tasks
  def index
    if params[:user_id] = session[:user_id]
      tasks = Task.where(user_id: params[:user_id])
      render json: tasks
    else
      render json: { message: 'Not authorized' }
    end
  end

  # GET /tasks/:id
  def show
    task = find_task
    render json: task
  end

  # POST /tasks
  def create
    new_task = Task.create!(task_params)
    render json: new_task, status: :created
  end

  # UPDATE /tasks/:id
  def update
    task = find_task
    task.update!(task_params)
    render json: task
  end

  # DELETE /tasks/:id
  def destroy
    task = find_task
    task.destroy
    render json: {}
  end

  private

  def task_params
    params.permit(
      :description,
      :date_added,
      :date_completed,
      :completed,
      :priority,
      :user_id,
    )
  end

  def find_task
    Task.find_by!(id: params[:id])
  end

  def render_invalid_response(invalid)
    render json: {
             errors: invalid.record.errors.full_messages,
           },
           status: :unprocessable_entity
  end
end
