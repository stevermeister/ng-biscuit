module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  var srcPath = './src',
      distPath = './dist';

  grunt.initConfig({

    srcPath: srcPath,

    distPath: distPath,

    express: {
      server: {
        options: {
          server: 'server.js',
          livereload: true
        }
      }
    },
    copy: {
      dev: {
        files: [
          {src: 'bower_components/angular/angular.js', dest: srcPath + '/javascript/libs/angular.js'},
        ]
      }
    },
    ngAnnotate: {
      app1: {
        files: {
          '<%= distPath %>/ng-biscuit.js': [srcPath + '/javascript/app/ng-biscuit/*.js',
              srcPath + '/javascript/app/templates.js',
            '!src/javascript/app/**/tests/*.js']
        }
      }
    },
    uglify: {
      build: {
        files: {
           'dist/ng-biscuit.min.js': [ distPath +'/ng-biscuit.js']
        }
      }
    },
    clean:{
      libs:  ['src/javascript/libs/**/*'],
      bower: ['bower_components'],
      target: ['dist/**']
    }
  });

  grunt.registerTask('default', ['start']);
  grunt.registerTask('start', ['express', 'watch', 'express-keepalive',]);
  grunt.registerTask('install', ['clean:libs', 'copy:dev', 'clean:bower']);
  grunt.registerTask('build', ['ngAnnotate', 'uglify']);
  grunt.registerTask('icons', ['clean:icons', 'grunticon']);
};