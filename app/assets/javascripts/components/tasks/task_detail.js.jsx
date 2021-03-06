(function(root) {
  'use strict';

  root.TaskDetail = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function () {
      if (this.props.task) {
        return {
          title: this.props.task.title,
          description: this.props.task.description,
          deadline: this.props.task.deadline,
          todos_attributes: this.props.task.todos.slice()
        };
      } else {
        return { title: '', description: '', deadline: '', todos_attributes: [] };
      }
    },

    createTask: function (e) {
      e.preventDefault();
      var task = {
        project_id: this.props.project.id,
        title: this.state.title,
        description: this.state.description,
        deadline: this.state.deadline,
        todos_attributes: this.state.todos_attributes
      };

      var callback = function () { this.props.getPreview(); }.bind(this);

      TaskActions.createTask(task, callback);
    },

    updateTask: function (e) {
      e.preventDefault();
      var task = {
        id: this.props.task.id,
        title: this.state.title,
        description: this.state.description,
        deadline: this.state.deadline,
        todos_attributes: this.state.todos_attributes
      };

      var callback = function () { this.props.getPreview(); }.bind(this);
      TaskActions.updateTask(task, callback);
    },

    deleteTask: function (e) {
      e.preventDefault();
      var task = {
        id: this.props.task.id,
        project_id: this.props.project.id
      };

      TaskActions.deleteTask(task);
    },

    getPreview: function (e) {
      e.preventDefault();
      this.props.getPreview();
    },

    updateTodos: function (todo) {
      // receives a todo item with added index field
      this.state.todos_attributes[todo.idx] = todo;
      this.setState({todos_attributes: this.state.todos_attributes});
    },

    render: function () {
      var callback;
      var trash;
      if (this.props.task) {
        callback = this.updateTask;
        trash = (
          <div className="btn btn-default"
            onClick={this.deleteTask}>
            <span className="glyphicon glyphicon-trash"></span>
          </div>
        );
      } else {
        callback = this.createTask;
      }

      return (
        <div className="task-detail">
          <div className="btn-group pull-right">
            { trash }
            <div className="btn btn-default"
              onClick={this.getPreview}>cancel</div>
            <div className="btn btn-default"
              onClick={callback}>save</div>
          </div>
          <input className="custom-input date-input"
            type="date"
            valueLink={this.linkState("deadline")} />
          <input className="custom-input"
            placeholder="Task Title"
            type="text"
            valueLink={this.linkState("title")}
          />
          <textarea className="custom-input"
            rows="5"
            placeholder="Task Description"
            type="text"
            valueLink={this.linkState("description")}
          />
          <div className="custom-input">
            <TodosList todos={this.state.todos_attributes}
              updateTodos={this.updateTodos} />
          </div>
        </div>
      );
    }
  });
}(this));
