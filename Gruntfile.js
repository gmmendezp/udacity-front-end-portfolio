module.exports = function (grunt) {

  grunt.initConfig({
    responsive_images: {
      dev: {
        options: {
          engine: 'im',
          sizes: [{
            name: 'small',
            width: 640,
            quality: 20
            }, {
            name: 'medium',
            width: 1200,
            quality: 25
            }, {
            name: "large",
            width: 1600,
            quality: 30
            }]
        },

        /*
        You don't need to change this part if you don't change
        the directory structure.
        */
        files: [{
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: 'img_src/',
          dest: 'img/'
        }]
      }
    },

    /* Clear out the images directory if it exists */
    clean: {
      dev: {
        src: ['img'],
      }
    },

    /* Generate the images directory if it is missing */
    mkdir: {
      dev: {
        options: {
          create: ['img']
        },
      },
    },

    /* Copy the "fixed" images that don't go through processing into the images/directory */
    copy: {
      dev: {
        files: [{
          expand: true,
          src: 'img_src/fixed/*.{gif,jpg,png}',
          dest: 'img/'
        }]
      },
    },

    /* Project server */
    connect: {
      server: {
        options: {
          port: '8000',
          livereload: true,
          hostname: 'localhost',
          middleware: function (connect, options, middleware) {
            middleware.unshift(require('connect-livereload')());
            return middleware;
          }
        }
      }
    },

    /* Live reload server */
    watch: {
      options:{
        livereload: true
      },
      all: {
        files: [
          "./css/*.css",
          "./js/*.js",
          "./*.html"
        ]
      },
      html: {
        files: ['./*.html'],
        tasks: ['validation']
      },
      css: {
        files: ['./css/*.css'],
        tasks: ['clean:csslint', 'csslint']
      },
      js: {
        files: [
          "Gruntfile.js",
          "./js/*.js"
        ],
        tasks: ['clean:jshint', 'jshint']
      }
    },

    /* CSS Lint */
    csslint: {
      all: ['./css/*.css']
    },

    /* JSHint */
    jshint: {
      all: ['Gruntfile.js', './js/*.js']
    },

    /* HTML validation */
    validation: {
      options: {
        stoponerror: false,
        generateReport: false,
        path: 'reports/validation-status.json',
        reportpath: false
      },
      files: {
        src: ["./*.html"]
      }
    }
  });

  /* Create the `serve` task */
  grunt.registerTask('serve',[
    'validation',
    'csslint',
    'jshint',
    'clean',
    'mkdir',
    'copy',
    'responsive_images',
    'connect',
    'watch'
  ]);

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-w3c-html-validation');
};
