var TimeLog = function($) {

    var TimeLogItem = function(timelog) {
        this.task_id = -1;
        this.start_at = new Date().getTime();
        this.end_at = null;
    };

    TimeLogItem.prototype = {
        getDuration/* : function(parent) {
            return this._getDuration(parent) * 60 * 10;
        },
        _getDuration */: function(parent) {
            if(this.end_at){
                return this.end_at - this.start_at;
            };
            var endOfDayTime = parent.logs[0].start_at + parent.workingHours * 60 * 60 * 1000;
            var currentTime = new Date().getTime();
            if (currentTime > endOfDayTime){
                return endOfDayTime - this.start_at;
            } else {
                return currentTime - this.start_at;
            }
        },
        finish: function() {
            this.end_at = new Date().getTime();
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
            var lastItem = this.logs[this.logs.length-1];
            if (lastItem && lastItem.task_id != -1) {
                return (lastItem.task_id);
            } else {
                return null;
            }
        },

        toggleTask: function(task_id) {
            var lastItem = this.logs[this.logs.length-1];
            lastItem && lastItem.finish();
            if (lastItem && task_id == lastItem.task_id) {
                var logItem = new TimeLogItem(this);
                logItem.task_id = -1;
                this.logs.push(logItem);
            } else {
                var logItem = new TimeLogItem(this);
                logItem.task_id = task_id;
                this.logs.push(logItem);
            }
            this.store();
            return logItem;
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
            var endOfDayTime = this.logs[0].start_at + this.workingHours * 60 * 60 * 1000;
            var currentTime = new Date().getTime();
            if (currentTime >= endOfDayTime) {
                return 0;
            } else {
                return endOfDayTime - currentTime;
            }
        }
    };

    return TimeLog;
}(jQuery);
