'use strict';
import * as gulp from 'gulp';
import {runSequence, task} from './tools/utils';

// --------------
// Clean (override).
gulp.task('clean', done => task('clean', 'all')(done));
gulp.task('clean.dist', done => task('clean', 'dist')(done));
gulp.task('clean.test', done => task('clean', 'test')(done));
gulp.task('clean.tmp', done => task('clean', 'tmp')(done));
gulp.task('clean.heroku', done => task('clean', 'heroku')(done));
gulp.task('clean.docs', done => task('clean', 'docs')(done));
gulp.task('clean.heroku.docs', done => task('clean', 'heroku.docs')(done));

// Bump (override)
gulp.task('bump', () => task('bump', 'patch')());
gulp.task('bump.patch', () => task('bump', 'patch')());
gulp.task('bump.minor', () => task('bump', 'minor')());
gulp.task('bump.major', () => task('bump', 'major')());

// Bump Heroku (override)
gulp.task('bump.heroku', () => task('bump', 'heroku.patch')());
gulp.task('bump.heroku.patch', () => task('bump', 'heroku.patch')());
gulp.task('bump.heroku.minor', () => task('bump', 'heroku.minor')());
gulp.task('bump.heroku.major', () => task('bump', 'heroku.major')());

// Check versions
gulp.task('check.versions', () => task('check.versions')());

// Docs
gulp.task('build.docs', () => task('build.docs')());
gulp.task('serve.docs', () => task('serve.docs')());

// --------------
// Build dev.
gulp.task('build.dev', done =>
  runSequence(
    'clean.dist',
    'tslint',
    'build.sass.dev',
    'build.img.dev',
    'build.assets.dev',
    'build.js.dev',
    'build.index.dev',
    done));

// --------------
// Build prod.
gulp.task('build.prod', done =>
  runSequence(
    'clean.dist',
    'clean.tmp',
    'tslint',
    'build.sass.dev',
    'build.img.dev',
    'build.html_css.prod',
    'build.assets.prod',
    'build.js.prod',
    'build.bundles',
    'build.concat.prod',
    'build.index.prod',
    'build.rev.prod',
    'build.rev.replace.prod',
    'build.index.min',
    done));

// --------------
// Build prod.
gulp.task('build.heroku', done =>
  runSequence(
    'clean.heroku',
    'build.prod',
    'build.heroku.copy',
    'build.heroku.update',
    done));

gulp.task('build.heroku.docs', done =>
  runSequence(
    'clean.docs',
    'clean.heroku.docs',
    'build.docs',
    'build.heroku.docs.copy',
    done));

// --------------
// Watch.
gulp.task('build.dev.watch', done =>
  runSequence(
    'build.dev',
    'watch.dev',
    done));

gulp.task('build.test.watch', done =>
  runSequence(
    'build.test',
    'watch.test',
    done));

// --------------
// Test.
gulp.task('test', done =>
  runSequence(
    'clean.test',
    'tslint',
    'build.test',
    'karma.start',
    done));

// --------------
// Docs
gulp.task('docs', done =>
  runSequence(
    'build.docs',
    'serve.docs',
    done));

// --------------
// Serve dev
gulp.task('serve.dev', done =>
  runSequence(
    'build.dev',
    'server.start',
    'watch.serve',
    done));

// --------------
// Serve e2e
gulp.task('serve.e2e', done =>
  runSequence(
    'build.e2e',
    'server.start',
    'watch.serve',
    done));

// --------------
// Serve prod
gulp.task('serve.prod', done =>
  runSequence(
    'build.prod',
    'server.start',
    'watch.serve',
    done));

// --------------
// Test.
gulp.task('test', done =>
  runSequence(
    'build.test',
    'karma.start',
    done));
