
module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			options: {
				sourcemap: 'none'
			},
			dist: {
				files: {
					'docs/assets/css/material-bootstrap.css' : 'src/material.scss'
				}
			}
		},
		concat: {
			docs: {
				files: {
					'docs/assets/css/material-bootstrap.min.css' : 'dist/material-bootstrap.min.css',
					'docs/assets/js/material-bootstrap.min.js' : 'dist/material-bootstrap.min.js'
				}
			}
		},
		cssmin: {
			options: {
				report: 'gzip'
			},
			dist: {
				src: 'dist/material-bootstrap.css',
				dest: 'dist/material-bootstrap.min.css'
			}
		},
		uglify: {
			options: {
				mangle: true
			},
			dist: {
				files: {
					'dist/material-bootstrap.min.js': [
						'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/affix.js',
						'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/alert.js',
						'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/button.js',
						'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/carousel.js',
						'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/collapse.js',
						'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/dropdown.js',
						'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/modal.js',
						'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tooltip.js',
						'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/popover.js',
						'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/scrollspy.js',
						'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tab.js',
						'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/transition.js',
						'src/javascripts/sidebar.js',
						'src/javascripts/smooth-scrolling.js'
					]
				}
			}
		},

		copy: {
			docs: {
				files: [
					{
						expand: true,
						flatten: true,
						src: ['src/fonts/material/*'],
						dest: 'docs/assets/fonts/material',
						filter: 'isFile'
					},
					{
						expand: true,
						flatten: true,
						src: ['bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*'],
						dest: 'docs/assets/fonts/bootstrap',
						filter: 'isFile'
					}
				]
			},
			dist: {
				files: [
					{
						expand: true,
						flatten: true,
						src: ['src/fonts/material/*'],
						dest: 'dist/fonts/material',
						filter: 'isFile'
					},
					{
						expand: true,
						flatten: true,
						src: ['bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*'],
						dest: 'dist/fonts/bootstrap',
						filter: 'isFile'
					}
				]
			}
		},


		watch: {
			dist: {
				files: ['**/*.scss', '**/*.js'],
				tasks: ['sass:dist', 'cssmin:dist', 'uglify:dist', 'concat:docs', 'copy:docs', 'copy:dist']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.registerTask('default', ['watch:dist']);

}
