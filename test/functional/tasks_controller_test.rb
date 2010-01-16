require 'test_helper'

class TasksControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:tasks)
  end

  test "should create task" do
    assert_difference('Task.count') do
      post :create, :task => tasks(:one).attributes
    end

    assert_response :success
  end

  test "should show task" do
    get :show, :id => tasks(:one).to_param
    assert_response :success
  end

  test "should update task" do
    put :update, :id => tasks(:one).to_param, :task => tasks(:one).attributes
    assert_response :success
  end

  test "should destroy task" do
    assert_difference('Task.count', -1) do
      delete :destroy, :id => tasks(:one).to_param
    end

    assert_response :success
  end
end
