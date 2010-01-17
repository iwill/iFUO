var Task = function($) {
    /**
    * Constructor
    */
    var Task = function() {
        this.id = -1;
        this.name = '';
        // this.activityDetail = {};
        this.color = null;
        this.hour = 0;
        this.done = false;
    };

    /**
    * Public methods
    */
    Task.prototype = {
        caculateHour: function(timelog) {
            var taskTime = 0;
            for (var i=0; i < timelog.logs.length; i++) {
                if (this.id == timelog.logs[i].task_id) {
                    taskTime += timelog.logs[i].getDuration(timelog);
                };
            };
            this.hour = Math.round(taskTime / 1000 / 60 / 60 * 10) / 10;
            return this.hour;
        },
        submitToServer: function(date) {
            var dateStr = $.datepicker.formatDate('dd-mm-yy', date);
            var dateArray = dateStr.split('-')
            var year = dateArray[2];
            var month = dateArray[1];
            var dayInMonth = dateArray[0];
            // var project_id = (this.activityDetail.project.id == '-1') ? '': this.activityDetail.project.id;
            // var module_id = (this.activityDetail.module.id == '-1') ? '': this.activityDetail.module.id;

            $.post('http://192.168.4.139:8080/FacturenOnline/uren/InvoerUrenAction.do',{
                editId:'',
                refresh:'',
                lastchange:'',
                toonDatumVan:dateStr,
                toonDatumTm:dateStr,
                medewerker:17,
                // klant:this.activityDetail.client.id,
                // klantList:this.activityDetail.client.id,
                // project:project_id,
                // projectList:this.activityDetail.project.id,
                // module:module_id,
                // moduleList:this.activityDetail.module.id,
                // activiteit:this.activityDetail.activity.id,
                // activiteitList:this.activityDetail.activity.id,
                datumJaar:year,
                datumMaand:month,
                datumDag:dayInMonth,
                hiddenDate:'',
                beschrijving:this.name,
                uren:this.hour
            },function(date) {});
        }
    };

    /**
    * static methods
    */
    Task.DefaultColor = [
        "rgb(157, 231, 119)",
        "rgb(255, 12 , 62 )",
        "rgb(164, 60 , 255)",
        "rgb(255, 121, 0  )",
        "rgb(231, 231, 10 )"
    ];

    Task.tasks = {};
    Task.addTask = function(taskName/* ,activityDetail */) {
        var newTask = new Task();
        newTask.id = new Date().getTime();
        newTask.name = taskName;
        newTask.order = 0;
        for (var i in Task.tasks) { newTask.order++; };

        newTask.color = Task.DefaultColor[newTask.order % Task.DefaultColor.length];
        // newTask.activityDetail = activityDetail;

        Task.tasks[newTask.id] = newTask;
        Task.store();
        return newTask;
    };

    Task.removeTask = function(taskId) {
        var removed_order = Task.tasks[taskId].order;
        Task.tasks[taskId].done = true;
        for(var id in Task.tasks){
            if (Task.tasks[id] && Task.tasks[id].order > removed_order) { Task.tasks[id].order--; }
        };
        Task.store();
    };

    Task.load = function(afterLoad) {
        Task.tasks = {};
        var db = new SolrDB('/iFUO');
        db.search('done:false',function(data) {
            for(var id in data) {
                var loadedTask = new Task();
                for (var prop in data[id]){
                    loadedTask[prop] = data[id][prop];
                };
                Task.tasks[loadedTask.id] = loadedTask;
            };
            if (afterLoad) {afterLoad();}
        });
    };

    Task.store = function() {
        var db = new SolrDB('/iFUO');
        var taskArray = [];
        for (var id in Task.tasks) {
            taskArray.push(Task.tasks[id]);
        }
        db.post(taskArray);
    };

    Task.getOrderedTasks = function() {
        var orderedTasks=[];
        for (var id in Task.tasks) {
            if (Task.tasks[id]){
                var order = Task.tasks[id].order;
                orderedTasks[order] = Task.tasks[id];
            };
        };
        return orderedTasks;
    };

    Task.setTaskOrder = function(orderList) {
        for (var i=0; i < orderList.length; i++) {
            Task.tasks[orderList[i]].order = i;
        };
        Task.store();
    };

    Task.sumUpHours = function() {
        var totalHours = 0;
        for(var id in Task.tasks){
            var task = Task.tasks[id];
            if(task.hour && task.hour > 0) totalHours += task.hour;
        };
        return Math.round(totalHours * 10) / 10;
    };

    Task.dailySubmit = function(date) {
        for(var id in Task.tasks){
            var task = Task.tasks[id];
            if(task && task.hour && task.hour > 0) task.submitToServer(date);
        };
    };

    return Task;
}(jQuery);
