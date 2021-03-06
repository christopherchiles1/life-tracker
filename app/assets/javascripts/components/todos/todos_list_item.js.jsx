(function(root) {
  'use strict';

  root.TodosListItem = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function () {
      if (this.props.todo) {
        return { body: this.props.todo.body, completed: this.props.todo.completed };
      } else {
        return { body: '', completed: false };
      }
    },

    toggleCompleted: function (e) {
      e.preventDefault();
      this.state.completed = !this.state.completed;
      this.onChange();
    },

    onChange: function () {
      if (this.state.body.trim() !== "") {
        if (this.props.todo) {
          this.props.updateTodos({ id: this.props.todo.id, idx: this.props.idx, body: this.state.body, completed: this.state.completed });
        } else {
          this.props.updateTodos({ idx: this.props.idx, body: this.state.body, completed: this.state.completed });
        }
      }
    },

    deleteTodo: function (e) {
      e.preventDefault();
      // TODO: add deletion to todos
    },

    render: function () {
      var icon;
      var trash;
      var completed = "";
      if (this.props.todo) {
        if (this.state.completed) {
          icon = <span className="glyphicon glyphicon-ban-circle"></span>;
          completed="completed";
        } else {
          icon = <span className="glyphicon glyphicon-ok-circle"></span>;
        }
        // trash = <div className="icon input-overlay">
        //   <span className="glyphicon glyphicon-trash hover-option"
        //     onClick={this.deleteTodo} />
        // </div>;
      }

      return (
        <div className={"todos-list-item group hover-options " + completed}>
          <div className="todo-checkbox" onClick={this.toggleCompleted}>
            { icon }
          </div>
          <input type="text" className="custom-input todo-input"
            valueLink={this.linkState("body")}
            placeholder="add a sub-task"
            onBlur={this.onChange} />
          { trash }
        </div>
      );
    }
  });
}(this));
