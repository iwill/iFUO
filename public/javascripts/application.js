jQuery(function($) {
	var taskTemplate = new JSTemplate($('#taskTemplate').html());
	// var activityOptions = new ActivityOptions();

	var refreshTaskList = function(timelog) {
		var container = $('#tasks');
		container.empty();
		var orderedTasks = Task.getOrderedTasks();

		for (var i = 0; i < orderedTasks.length; i++) {
			if (!orderedTasks[i].done) {
				orderedTasks[i].caculateHour(timelog);
				container.append(taskTemplate.process(orderedTasks[i]));
			}
		};

		var activeTaskId = timelog.getActiveTask();
		if (activeTaskId) {
			$('#'+activeTaskId).removeClass('ui-state-default');
			$('#'+activeTaskId).addClass('ui-state-highlight');
		};

		container.sortable({
            placeholder: 'ui-state-highlight',
		    update: function(event, ui) {
		    	var orderList = container.sortable('toArray');
				Task.setTaskOrder(orderList);
			}
		});

		Indicator.draw(timelog,Task.tasks);
		$('#sum_hours').html(Task.sumUpHours());
		$('#working_hours_input').val(timelog.workingHours);
	};

	// var refreshActivityHints = function() {
		// activityOptions.parseFromFUO($('#datepicker').datepicker('getDate'),function(data) {
			// $("#activity_select_box").autocompleteArray(data,{
						// delay:10,
						// minChars:0,
						// matchSubset:1,
						// onItemSelect:function(){$('#activity_select_box').focus();},
						// matchContains:true,
						// maxItemsToShow:50
			// });
		// });
	// };

	$('#taskName').focus();

	$('#datepicker').datepicker();
	$('#datepicker').datepicker( 'setDate' , new Date());
	var currentTimeLog = new TimeLog($('#datepicker').datepicker( 'getDate' ),9);

	// refreshActivityHints();

	currentTimeLog.load(function() {
		Task.load(function() {
			refreshTaskList(currentTimeLog);
		});
	});

	$('#datepicker').change(function() {
		// refreshActivityHints();
		currentTimeLog = new TimeLog($('#datepicker').datepicker( 'getDate' ),9);
		currentTimeLog.load(function() {
			refreshTaskList(currentTimeLog);
		});
	});

	$('#add_task_form').submit(function(){
		// var activityDetail = activityOptions.getActivityDetail($("#activity_select_box").val());
		var newTask = Task.addTask($('#taskName').val()/* ,activityDetail */);
		refreshTaskList(currentTimeLog);
		$('#taskName').val('');
		// $('#activity_select_box').val('');
		$('#taskName').focus();
		return false;
	});

	$(".delete_task_btn").live("click", function(){
		Task.removeTask($(this).attr('task_id'));
		refreshTaskList(currentTimeLog);
    });

	$(".input_hour").live("change",function() {
		var task = Task.tasks[$(this).attr('task_id')];
		task.hour = 1 * $(this).val();
		$('#sum_hours').html(Task.sumUpHours());
	});

	$('.input_hour').live("click",function(){
		$(this).select();
	});

	$("#submit_btn").click(function() {
		Task.dailySubmit($('#datepicker').datepicker('getDate'));
	});

	$('.task_item').live("dblclick",function() {
		currentTimeLog.toggleTask($(this).attr('id'));
		refreshTaskList(currentTimeLog);
	});

	$('#working_hours_input').change(function() {
		currentTimeLog.workingHours=$(this).val();
		currentTimeLog.store();
		Indicator.draw(currentTimeLog,Task.tasks);
	});


	$(document).keydown(function(e){
	   // if(e.keyCode == 16 && !keyDown) {}
	});
  	// $('#color_picker').farbtastic('#color');
});
