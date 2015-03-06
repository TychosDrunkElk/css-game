'use strict';

function configureGrunt(grunt) {
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks("grunt-concurrent");
	grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks("grunt-hogan");
    grunt.loadNpmTasks("grunt-contrib-compass");


	grunt.initConfig({

		browserify: {
			build: {
				src: [
					'./app/javascripts/**/*.js'
				],
				dest: './public/javascripts/application.js',
				options: {
					alias: [
						'./node_modules/brisket/lib/brisket.js:brisket',
						'./app/javascripts/client/ClientApp.js:app/ClientApp'
					],
					ignore: [
						'./app/javascripts/server/**/*.js',
						'./node_modules/brisket/lib/server/**/*.js'
					],
					shim: {
						'jquery-mockjax': {
							path: 'node_modules/brisket/node_modules/jquery-mockjax/jquery.mockjax.js',
							exports: null,
							depends: {
								jquery: 'jQuery'
							}
						}
					}
				}
			}

		},

		clean: {
			js: [
				'public/javascripts',
			],
			css: [
				'public/stylesheets'
			]
		},

		exec: {
			nodemon: {
				cmd: 'node_modules/.bin/nodemon server.js'
			}
		},

        concurrent: {
            server: {
                tasks: [
                    "exec:nodemon",
                    "watch"
                ],
                options: {
                    logConcurrentOutput: true
                }
            }
        },


        hogan: {
            compile: {
                src: [
                    "app/templates/**/*.html",
                ],
                dest: "app/build/templates.js",
                options: {
                    binderName: "nodejs",
                    nameFunc: stripPathAndExtension,
                    exposeTemplates: true
                }
            }
        },

        compass: {
            build: {
                "config": "config/compass.rb",
        		"bundleExec": true,
        		"environment": "development",
                "outputStyle": "expanded"
            }
        },

		watch: {
			options: {
				interrupt: true,
				debounceDelay: 250
			},
			js: {
				files: [
					'app/javascripts/**/*.js',
					'server.js',
					'Gruntfile.js',
				],
				tasks: [
					'build',
				]
			},
            css: {
                files: [
                    'app/stylesheets/**/*.scss', 
                    'app/templates/**/*.scss'
                ],
                tasks: [
                    'clean:css',
                    'compass:build'
                ]
            },
            html: {
                files: [
                    "app/templates/**/*.html"
                ],
                tasks: [
                    'hogan'
                ]
            }
		}

	});


	grunt.registerTask('build', [
		"clean:css",
        "compass:build",
		'clean:js',
		'hogan',
		'browserify:build'
	]);

	grunt.registerTask('server', [
		'build',
		'concurrent:server',
	]);

	grunt.registerTask('default', ['server']);

}

function stripPathAndExtension(file) {
    return file.replace("app/templates/", "").split(".")[0];
}

module.exports = configureGrunt;
