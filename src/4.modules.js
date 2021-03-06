var gulp = require('gulp');

var config = require('../../../gulp-config.json');

// Do we have a specifc extensions file?
try {
    var extensions = require('../../../gulp-extensions.json');
} catch(err) {
    var extensions = config.extensions;
}

/**
 * Get the available modules from paths
 *
 * @param   string  app  'frontend' | 'backend'
 *
 * @return  array
 */
function getModules(app) {
	var results = [];

	if (extensions && extensions.hasOwnProperty('modules')
		&& extensions.modules.hasOwnProperty(app)
	) {
		var sourceArray = extensions.modules[app];

		for (index = 0; index < sourceArray.length; ++index) {
		    results.push(app + '.' + sourceArray[index]);
		}
	}

	return results;
}

/**
 * Function to ease the modules management
 *
 * @param   string  baseTask  Task to use as root. Example: 'clean:modules'
 * @param   string  app       'frontend', 'backend'
 *
 * @return  array
 */
function getModulesTasks(baseTask, app) {
	var modules = getModules(app);
	var tasks = [];

	if (modules.length > 0) {
		modules.forEach((module) => {
			gulp.task(baseTask + '.' + module, (cb) => {cb()});
			tasks.push(baseTask + '.' + module);
		});
	}

	return gulp.series(tasks);
}

gulp.task('clean:modules.frontend',
	getModulesTasks('clean:modules', 'frontend'),
	function(cb) {
		cb();
});
gulp.task('clean:modules.backend',
	getModulesTasks('clean:modules', 'backend'),
	function(cb) {
		cb();
});

// Clean
gulp.task('clean:modules',
	gulp.series('clean:modules.frontend', 'clean:modules.backend'),
	function(cb) {
		cb();
	});

gulp.task('copy:modules.frontend',
	getModulesTasks('copy:modules', 'frontend'),
	function(cb) {
		cb();
});
gulp.task('copy:modules.backend',
	getModulesTasks('copy:modules', 'backend'),
	function(cb) {
		cb();
});

// Copy
gulp.task('copy:modules',
	gulp.series('copy:modules.frontend', 'copy:modules.backend'),
	function(cb) {
		cb();
	});

gulp.task('watch:modules.frontend',
	getModulesTasks('watch:modules', 'frontend'),
	function(cb) {
		cb();
});
gulp.task('watch:modules.backend',
	getModulesTasks('watch:modules', 'backend'),
	function(cb) {
		cb();
});

// Watch
gulp.task('watch:modules',
	gulp.series('watch:modules.frontend', 'watch:modules.backend'),
	function(cb) {
		cb();
	});

exports.getModules = getModules;
exports.getModulesTasks = getModulesTasks;
