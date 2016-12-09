var gulp = require('gulp'),
  exec = require('child_process').exec;

gulp.task('build', ['compile'], function () {
  return gulp.src('./src/**/*.json')
    .pipe(gulp.dest('./dist'));
});

gulp.task('compile', function (done) {
  exec('tsc', function (err, stdOut, stdErr) {
    console.log(stdOut);
    if (err) {
      done(err);
    } else {
      done();
    }
  });
});

gulp.task('watch', function (done) {
  gulp.watch(['./src/**/*'], ['build'])
})