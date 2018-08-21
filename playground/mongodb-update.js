const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true },  (err, client) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5b7bf6a4d8ea70894ddf7022')
    // }, {
    //     $set : {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false    
    // }).then((result) => {
    //     console.log(result);
    // })

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5b7af26b98a1f3b79ee3312b')
    }, {
        $set: {
            name: 'Barney'
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    })

    db.collection('Users').findOneAndDelete({_id: new ObjectID("5b7afe7698a1f3b79ee33431")}).then((result) => {
        console.log(result);
    });

    //client.close();
});