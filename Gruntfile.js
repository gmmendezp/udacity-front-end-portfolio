module.exports = function (grunt) {

  grunt.initConfig({
    responsive_images: {
      server: {
        options: {
          engine: 'im',
          sizes: [{
            name: 'small',
            width: 600,
            quality: 20
            }, {
            name: 'medium',
            width: 1200,
            quality: 25
            }, {
            name: 'large',
            width: 1500,
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
      server: {
        src: ['img'],
      }
    },

    /* Generate the images directory if it is missing */
    mkdir: {
      server: {
        options: {
          create: ['img']
        },
      },
    },

    /* Copy the 'fixed' images that don't go through processing into the img directory */
    copy: {
      server: {
        files: [{
          expand: true,
          cwd: 'img_src',
          src: 'fixed/*.{gif,jpg,png,svg}',
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
      server: {
        files: [
          'css/*.css',
          'js/*.js',
          '*.html',
          'Gruntfile.js',
          'img/*'
        ]
      },
      images: {
        files: [
          'img_src/*.{gif,jpg,png}',
          'img_src/fixed/*.{gif,jpg,png,svg}',
        ],
        tasks: ['images']
      }
    },

    /* CSS Lint */
    csslint: {
      server: ['css/*.css']
    },

    /* JSHint */
    jshint: {
      server: ['Gruntfile.js', 'js/*.js']
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
        src: ['*.html']
      }
    }
  });

  /* Create the `serve` task */
  grunt.registerTask('serve',[
    'clean',
    'mkdir',
    'copy',
    'responsive_images',
    'connect',
    'watch'
  ]);

  grunt.registerTask('validate', [
    'validation',
    'csslint',
    'jshint'
  ]);

  grunt.registerTask('images', [
    'clean',
    'mkdir',
    'copy',
    'responsive_images'
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
