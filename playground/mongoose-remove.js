const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');


// Todo.remove({}).then((result) => {
//     console.log(result);
// });

//Todo.findOneAndRemove()

Todo.findOneAndRemove({_id : '5b7d58dfa11a5c9a634ba0c8'}).then((todo) => {
    console.log(todo);
})

Todo.findByIdAndRemove('5b7d58dfa11a5c9a634ba0c8').then((todo) => {
    console.log(todo);
})