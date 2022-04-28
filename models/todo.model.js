module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define("todo", {
      task: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.INTEGER
      }
    });
    return Todo;
  };