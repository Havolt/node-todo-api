const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// const id = '5b7c5997ac746f3fe41c7d66';
const userId = '5b7c18a09cefb919e49366e1';

// if(!ObjectID.isValid(id)) {
//     console.log('ID not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     if(!todo) {
//         return console.log('ID not found');
//     }
//     console.log('Todo by id', todo);
// }).catch((e) => console.log(e));

User.findById(userId).then((user) => {
    if(!user) {
        return console.log('ID not found');
    }
    console.log(JSON.stringify(user, undefined, 2));
}).catch((e) => console.log(e));