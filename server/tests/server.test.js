const expect =  require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'First test to do'
}, {
    _id: new ObjectID(),
    text: 'Second test to do',
    completed: true,
    completedAt: 1545555555
}
]

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
})

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        let text = 'Test my todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            })
    });

    it('should not create todo with invalid body data', (done) => {

        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            })

    })
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

//// New test cases for GET /todos/:id

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text)
            })
            .end(done)
    });

    it('should return 404 if todo not found', (done) => {

        const tmpObID = new ObjectID().toHexString();

        request(app)
            .get(`/todos/${tmpObID}`)
            .expect(404)
            .end(done)
    });

    it('should return 404 for non-object ids', (done) => {

        request(app)
            .get(`/todos/123`)
            .expect(404)
            .end(done)
    });
});

//// New test cases for DELETE /todos/:id

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        const hexID = todos[1]._id.toHexString();

        request(app)
            .delete(`/todos/${hexID}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexID)
            })
            .end((err, res) => {
                if(err) {
                    return done(err)
                }

                Todo.findById(hexID, (todo) => {
                    expect(todo).toBeFalsy();
                    done();
                }).catch((e) => done(e));
            })
    });

    it('should return 404 if todo not found', (done) => {
        const hexID = new ObjectID().toHexString();

        request(app)
            .delete(`/todos/${hexID}`)
            .expect(404)
            .end(done)
    });

    it('should return 404 if onject id is invalid', (done) => {
        request(app)
            .delete(`/todos/123`)
            .expect(404)
            .end(done)
    });
})

//// New test cases for PATCH /todos/:id

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {

        const patchObj = {
            completed: true,
            text: "This is my new text"
        }

        request(app)
            .patch(`/todos/${todos[0]._id.toHexString()}`)
            .send(patchObj)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(patchObj.text);
                expect(res.body.todo.completed).toBe(true);
                expect(typeof res.body.todo.completedAt).toBe('number');
            })
            .end(done)
    });

    it('should clear completedAt when todo is not completed', (done) => {

        const patchObj2 = {
            completed: false,
            text: "This is the second patch test"
        }

        request(app)
            .patch(`/todos/${todos[0]._id.toHexString()}`)
            .send(patchObj2)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(patchObj2.text);
                expect(res.body.todo.completed).toBeFalsy();;
                expect(res.body.todo.completedAt).toBeFalsy();
            })
            .end(done)
    })
})