module.exports = function (grunt) {

	grunt.initConfig({
		shell: {
			options: {
				stdout: true
			},
			protractor_install: {
				command: 'node ./node_modules/protractor/bin/webdriver-manager update'
			},
			grunt_protractor_install: {
				command: 'node ./node_modules/grunt-protractor-runner/node_modules/protractor/bin/webdriver-manager update'
			},
			npm_install: {
				command: 'npm install'
			}
		},
		connect: {
			options: {
				base: 'app/',
				hostname: 'localhost'
			},
			webserver: {
				options: {
					port: 8888,
					keepalive: true
				}
			},
			testserver: {
				port: 9999
			}

		},
		copy: {
			dev: {
				files: [
					{expand: true, src: ['bower_components/**'], dest: 'app/'}
				]
			}
		},
		open: {
			devserver: {
				path: 'http://localhost:8888',
				app: 'chrome'
			}
		},
		protractor: {
			options: {
				keepAlive: false,
				configFile: "./test/protractor.conf.js"
			},
			singlerun: {}
		}
	});

	require('matchdep').filterAll(['grunt-*', '!grunt-cli']).forEach(grunt.loadNpmTasks);

	grunt.registerTask('default', ['copy:dev', 'open:devserver', 'connect:webserver']);

	grunt.registerTask('protractor', ['install', 'connect:testserver', 'protractor:singlerun']);
	grunt.registerTask('install', ['shell:protractor_install', 'shell:grunt_protractor_install']);


};