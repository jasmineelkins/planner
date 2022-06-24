class NotesController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :render_invalid_response

  # GET /notes
  def index
    notes = Note.where(task_id: params[:task_id])
    render json: notes
  end

  # GET /notes/:id
  def show
    note = find_note
    render json: note
  end

  # POST /notes
  def create
    new_note = Note.create!(note_params)
    render json: new_note, status: :created
  end

  # UPDATE /notes/:id
  def update
    note = find_note
    note.update!(note_params)
    render json: note
  end

  # DELETE /notes/:id
  def destroy
    note = find_note
    note.destroy
    render json: {}
  end

  # DELETE all notes
  def reset_task_notes
    task_notes = Note.where(task_id: params[:task_id])
    task_notes.destroy_all
  end

  private

  def note_params
    params.permit(:content, :task_id)
  end

  def find_note
    Note.find_by!(id: params[:id])
  end

  def render_invalid_response(invalid)
    render json: {
             errors: invalid.record.errors.full_messages,
           },
           status: :unprocessable_entity
  end
end
