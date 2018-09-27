module.exports = (app) => {
  const tasks = require('./controller.js');

  app.post('/newTask/:content', tasks.create);
  app.get('/', tasks.findAll);
  app.put('/updateTask/:taskId', tasks.update);
  app.delete('/deleteTask/:taskId', tasks.delete);
}