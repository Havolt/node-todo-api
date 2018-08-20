const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true },  (err, client) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    //Delete Many
    // db.collection('Todos').deleteMany({text: "Eat Lunch"}).then((result) => {
    //     console.log(result);
    // });

    //Delete One
    // db.collection('Todos').deleteOne({text: "Play Yakuza 0"}).then((result) => {
    //     console.log(result);
    // });

    //Find and Delete One
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // })

    // db.collection('Users').deleteMany({name: 'Mario'}).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndDelete({_id: new ObjectID("5b7afe7698a1f3b79ee33431")}).then((result) => {
        console.log(result);
    });

    //client.close();
});