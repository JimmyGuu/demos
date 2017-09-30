var FullTime = function () {
    this.hourly = '$12';
}

var PartTime = function () {
    this.hourly = '$11';
}

var Temporary = function () {
    this.hourly = '$10';
}

var Contractor = function () {
    this.hourly = '$15';
}

function Factory() {
    this.createEmployee = function (type) {
        var employee;
        switch (type) {
            case 'fulltime':
                employee = new FullTime();
                break;
            case 'parttime':
                employee = new PartTime();
                break;
            case 'temporary':
                employee = new Temporary();
                break;
            case 'contractor':
                employee = new Contractor();
                break;
        }
        employee.type = type;
        employee.say = function () {
            console.log(this.type + ': rate ' + this.hourly + '/hour');
        }

        return employee;
    }
}

var factory = new Factory();
factory.createEmployee('fulltime').say();