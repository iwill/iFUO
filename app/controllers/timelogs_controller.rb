class TimelogsController < ApplicationController

  # GET /timelogs.json
  def index
    @timelogs = Timelog.all
    render :json => @timelogs 
  end

  # GET /timelogs/1.json
  def show
    @timelog = Timelog.find(params[:id])
    render :json => @timelog 
  end

  # POST /timelogs.json
  def create
    @timelog = Timelog.new(params[:timelog])
    if @timelog.save
      head :ok
    else
      render :json => @timelog.errors, :status => :unprocessable_entity
    end
  end

  # PUT /timelogs/1.json
  def update
    @timelog = Timelog.find(params[:id])
    if @timelog.update_attributes(params[:timelog])
      head :ok
    else
      render :json => @timelog.errors, :status => :unprocessable_entity
    end
  end

  # DELETE /timelogs/1.json
  def destroy
    @timelog = Timelog.find(params[:id])
    @timelog.destroy
    head :ok
  end
end
