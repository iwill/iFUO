jQuery(function($) {

    var tasksContainer = $('#tasks');
    $('#taskName').focus();

    var newTaskItem = function(task) {
        return $("<li />", {
            id: task.id,
            "class": "task_item ui-state-default"
        }).append($("<span />", {
            "class": "delete_task_btn ui-icon ui-icon-circle-close",
            task_id: task.id
        })).append($("<input />", {
            name: "hour",
            "class": "input_hour",
            type: "text",
            task_id: task.id,
            value: task.hour
        })).append(task.name);
    };

    var refresh = function(timelog) {
        tasksContainer.empty();
        var orderedTasks = Task.getOrderedTasks();

        for (var i = 0; i < orderedTasks.length; i++) {
            if (!orderedTasks[i].done) {
                orderedTasks[i].caculateHour(timelog);
                tasksContainer.append(newTaskItem(orderedTasks[i]));
            }
        }

        var activeTask = timelog.getActiveTask();
        if (activeTask) {
            $('#' + activeTask.task_id).removeClass('ui-state-default');
            $('#' + activeTask.task_id).addClass('ui-state-highlight');
        }

        tasksContainer.sortable({
            placeholder: 'ui-state-highlight',
            update: function(event, ui) {
                var orderList = tasksContainer.sortable('toArray');
                Task.setTaskOrder(orderList);
            }
        });

        Indicator.draw(timelog,Task.tasks,Task.totalHours());
    };

    $('#datepicker').datepicker().datepicker( 'setDate' , new Date());

    var currentTimeLog = null;
    $('#datepicker').change(function() {
        currentTimeLog = new TimeLog($('#datepicker').datepicker( 'getDate' ), 8);
        currentTimeLog.load(function() {
            refresh(currentTimeLog);
        });
    }).change();

    $('#add_task_form').submit(function(){
        var newTask = Task.addTask($('#taskName').val()/* ,activityDetail */);
        refresh(currentTimeLog);
        $('#taskName').val('');
        $('#taskName').focus();
        return false;
    });

    $(".delete_task_btn").live("click", function(){
        Task.removeTask($(this).attr('task_id'));
        refresh(currentTimeLog);
    });

    $('.task_item').live("dblclick",function() {
        currentTimeLog.toggleTask($(this).attr('id'));
        refresh(currentTimeLog);
    });
});
