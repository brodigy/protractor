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
				options: {
					port: 8080
				}
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
				keepAlive: false
			},
			localRun: {
				configFile: "./test/protractor.conf.js"
			},
			browserStack: {
				configFile: "./test/protractor.browserstack.conf.js"
			}
		},
		localstack: {
			options: {
				key: 'F55Fo1Np5QvmpANB1XuS',
				hosts: [{
					name: 'localhost',
					port: '8080',
					sslFlag: 0
				}]
			}
		}
	});

	require('matchdep').filterAll(['grunt-*', '!grunt-cli']).forEach(grunt.loadNpmTasks);

	grunt.registerTask('default', ['copy:dev', 'open:devserver', 'connect:webserver']);
	grunt.registerTask('install', ['shell:protractor_install', 'shell:grunt_protractor_install']);


	//tests
	grunt.registerTask('test:e2e', ['install', 'connect:testserver', 'protractor:localRun']);
	grunt.registerTask('test:e2e:browser_stack', ['localstack', 'install', 'connect:testserver', 'protractor:browserStack', 'localstack:stop']);



};