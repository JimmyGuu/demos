// Super constructor function
function CarMaker() { }

// Subclasses common methods
CarMaker.prototype.drive = function () {
    console.log('Vroom, I have ' + this.doors + ' doors');
}

// Static factory function, subclasses cannot extend
CarMaker.factory = function (type) {
    var constr = type,
        newcar;

    if (typeof CarMaker[constr] !== 'function') {
        throw {
            name: 'Error',
            message: constr + ' does not exist.'
        }
    }

    // Extend supclass
    if (typeof CarMaker[constr].prototype.drive !== 'function') {
        CarMaker[constr].prototype = new CarMaker();
    }

    newcar = new CarMaker[constr]();

    return newcar;
}

CarMaker.Compact = function () {
    this.doors = 4;
}

CarMaker.Convertible = function () {
    this.doors = 2;
}

CarMaker.SUV = function () {
    this.doors = 24;
}

// Test
var corolla = CarMaker.factory('Compact');
var solstice = CarMaker.factory('Convertible');
var cherokee = CarMaker.factory('SUV');
corolla.drive();
solstice.drive();
cherokee.drive();