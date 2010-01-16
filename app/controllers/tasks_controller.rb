class TasksController < ApplicationController

  protect_from_forgery :except => :create
  
  # GET /tasks.json
  def index
    @tasks = Task.all
    render :json => @tasks
  end

  # GET /tasks/1.json
  def show
    @task = Task.find(params[:id])
    render :json => @task
  end

  # POST /tasks.json
  def create
    @task = Task.new(params[:task])
    if @task.save
      head :ok
    else
      render :json => @task.errors, :status => :unprocessable_entity
    end
  end

  # PUT /tasks/1.json
  def update
    @task = Task.find(params[:id])
    if @task.update_attributes(params[:task])
      head :ok
    else
      render :json => @task.errors, :status => :unprocessable_entity
    end
  end

  # DELETE /tasks/1.json
  def destroy
    @task = Task.find(params[:id])
    @task.destroy
    head :ok
  end
end
