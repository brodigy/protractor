module.exports = function (grunt) {

	grunt.initConfig({
		shell: {
			options: {
				stdout: true
			},
			protractor_install: {
				command: 'node ./node_modules/protractor/bin/webdriver-manager update'
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
					port: 8881
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
				app: 'Google Chrome'
			}
		},
		protractor: {
			options: {
				keepAlive: false
			},
			localRun: {
				configFile: "./test/protractor.conf.js"
			},
			localRunMocked: {
				configFile: "./test/protractor.mocked.conf.js"
			},
			browserStack: {
				configFile: "./test/protractor.browserstack.conf.js"
			}
			,
			parallel: {
				configFile: "./test/protractor.parallel.js"
			}
		},
		localstack: {
			options: {
				key: 'F55Fo1Np5QvmpANB1XuS',
				hosts: [{
					name: 'localhost',
					port: '8888',
					sslFlag: 0
				}]
			}
		}
	});

	require('matchdep').filterAll(['grunt-*', '!grunt-cli']).forEach(grunt.loadNpmTasks);

	grunt.registerTask('default', ['copy:dev', 'open:devserver', 'connect:webserver']);
	grunt.registerTask('install', ['shell:protractor_install', 'shell:protractor_install']);


	//tests
	grunt.registerTask('test:et', ['install', 'protractor:localRun']);
	grunt.registerTask('test:it', ['install','connect:testserver', 'protractor:localRunMocked']);
	grunt.registerTask('test:parallel', ['install', 'protractor:parallel']);
	grunt.registerTask('test:e2e:browser_stack', ['localstack', 'install', 'protractor:browserStack', 'localstack:stop']);



};