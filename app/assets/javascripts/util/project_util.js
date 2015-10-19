(function(root) {
  'use strict';

  root.ProjectUtil = {
    fetchUserProjects: function () {
      $.ajax({
        url: '/api/projects',
        success: function (projects) {
          ProjectActions.receiveUserProjects(projects);
        },
        error: function (error) {
          alert(error);
        }
      });
    },

    fetchProject: function (project) {
      $.ajax({
        url: '/api/projects/' + project.id,
        success: function (project) {
          ProjectActions.receiveProject(project);
        },
        error: function (error) {
          alert(error);
        }
      });
    },

    createProject: function (project, callback) {
      $.ajax({
        url: 'api/projects',
        type: 'POST',
        data: { project: project },
        success: function (project) {
          ProjectActions.receiveSingleProject(project);
          if (callback) { callback(); }
        },
        error: function (error) {
          alert(error);
        }
      });
    },

    updateProject: function (project, callback) {
      $.ajax({
        url: 'api/projects/' + project.id,
        type: 'PATCH',
        data: { project: project },
        success: function (project) {
          ProjectActions.receiveSingleProject(project);
          if (callback) { callback(); }
        },
        error: function (error) {
          alert(error);
        }
      });
    },

    deleteProject: function (project, callback) {
      $.ajax({
        url: 'api/projects/' + project.id,
        type: 'DELETE',
        success: function () {
          ProjectActions.removeSingleProject(project);
          if (callback) { callback(); }
        },
        error: function (error) {
          alert(error);
        }
      });
    }
  };
}(this));
