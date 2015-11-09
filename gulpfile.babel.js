// generated on 2015-08-15 using generator-gulp-webapp 1.0.3
import gulp from 'gulp';
import server from 'gulp-develop-server';

gulp.task('default',() => {
    server.listen({
    env : {
        DEBUG : 'test'
    },
    path : './app.js',
    });
    gulp.watch('./server/**/**/**/*.js').on('change', function(err){
        server.restart();
    });
});
