var TimeLog = function($) {

    var TimeLogItem = function(timelog) {
        this.task_id = -1;
        this.start_at = new Date().getTime();
        this.end_at = null;
    };

    TimeLogItem.prototype = {
        getDuration: function(parent) {
            return this._getDuration(parent) * 60 * 10;
        },
        _getDuration: function(parent) {
            if(this.end_at) {
                return this.end_at - this.start_at;
            }
            else {
                return new Date().getTime() - this.start_at;
            }
        },
        finish: function() {
            this.end_at = new Date().getTime();
        },
        isFinished: function() {
            return !!this.end_at;
        }
    };

    /**
    * Constructor
    */
    var TimeLog = function(date,workingHours) {
        this.dateStr = $.datepicker.formatDate('yy-mm-dd', date);
        this.id = 'TimeLog_' + this.dateStr;
        this.workingHours = workingHours;
        this.logs = [];
    };

    /**
    * Public methods
    */
    TimeLog.prototype = {
        getActiveTask: function() {
            for (var i in this.logs) {
                if (!this.logs[i].isFinished()) {
                    return this.logs[i];
                }
            }
            return null;
        },

        toggleTask: function(task_id) {
            var activeTask = this.getActiveTask();
            if (activeTask) {
                activeTask.finish();
            }
            if (!activeTask || task_id != activeTask.task_id) {
                var logItem = new TimeLogItem(this);
                logItem.task_id = task_id;
                this.logs.push(logItem);
            }
            this.store();
        },

        store: function() {
            var db = new SolrDB('/iFUO');
            db.post(this);
        },

        load: function(afterLoad) {
            var db = new SolrDB('/iFUO');
            db.search('id:'+this.id,function(dataArray) {
                if (dataArray && dataArray[0]) {
                    var data = dataArray[0];
                    for (var prop in data) {
                        this[prop] = data[prop];
                    }
                    this.logs = [];
                    for (var i in data.logs){
                        var dataTimeLogItem = data.logs[i];
                        var newItem = new TimeLogItem(this);
                        for(var prop in dataTimeLogItem){
                            newItem[prop] = dataTimeLogItem[prop];
                        }
                        this.logs.push(newItem);
                    }
                }
            });
            if (afterLoad) {afterLoad();}
        },

        leftTime: function() {
            if (!this.logs[0]) {
                return this.workingHours * 60 * 60 * 1000;
            }
            var taskTime = 0;
            for (var i=0; i < this.logs.length; i++) {
                taskTime += this.logs[i].getDuration(this);
            }
            return this.workingHours * 60 * 60 * 1000 - taskTime;
        }
    };

    return TimeLog;
}(jQuery);
