const mongoose = require('mongoose'),
    Employee = require('./employee');
department = require('./department');

mongoose.connect('mongodb://127.0.0.1:27017/companyx');

mongoose.connection.on('error', err => {
    console.error(err);
});

mongoose.connection.on('open', () => {
    console.log('connected');

    const donald = new Employee({
        name: {
            first: 'Donald',
            last: 'Trump'
        },
        salary: '22,000',
        department: 'Sales'
    });

    /*donald.print();
    donald.name.full = 'Hillary Clinton';*/
    donald.save((err, result) => {
        const sales = new department({
            name: 'Sales'
        });
        // employees = new ContactList({
        //     name: 'Employees'
        // });

        sales.employees.push(donald);
        // employees.contacts.push(donald);

        sales.save((err, res) => {
            // employees.save((e, r) => {

            department.find().populate('employees').exec((err, lists) => {
                lists.forEach(list => {
                    list.print();
                });
            });
            // });
        });
    });
});