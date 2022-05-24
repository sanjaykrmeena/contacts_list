const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

// middleware 1
// app.use(function(req, res, next) {         // next will call the next middleware if it is present OR pass the controller to the next function
//     req.myName = "Sanjay";
//     console.log('middleware 1 called');
//     next();
// });

//middleware 2
// app.use(function(req, res, next) {
//     console.log('My Name from MW2', req.myName);
//     console.log('middleware 2 called');
//     next();
// });

var contactList = [
    {
        name: "Sanjay",
        phone: "8448037684"
    },
    {
        name: "Arpan",
        phone: "1111111111"
    }, 
    {
        name: "Tony Stark",
        phone: "1234567890"
    },
    {
        name: "Coding Ninjas",
        phone: "9876543210"
    }
];


app.get('/', function(req, res) { 

    Contact.find({}, function(err, contacts) {
        if(err) {
            console.log('Error in fetching contacts from db');
            return;
        }

        return res.render('home', {
            title: "Contacts List",
            contact_list: contacts
        });

    });

});


app.get('/practice', function(req, res) {
    return res.render('practice', {
        title: "Let us play with ejs"
    });
});

app.post('/create-contact', function(req, res) {
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });
    // contactList.push(req.body);
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact) {
        if(err) {
            console.log('error in creating a contact!');
            return;
        }

        console.log('********', newContact);
        return res.redirect('back');
    });

});



// for deleting the contact
app.get('/delete-contact/', function(req, res) {
    // get the id from query in the url
    let id = req.query.id;
    
    // find the contact in the databas using id and delete
    Contact.findByIdAndDelete(id, function(err) {
        if(err) {
            console.log('error in deleting an object from database');
            return;
        }

        return res.redirect('back');

    });

});



app.listen(port, function(err) {
    if(err) {
        console.log('Error in running the server', err);
        return;
    }

    console.log('Yup!My Express Server is running on Port:', port);
});