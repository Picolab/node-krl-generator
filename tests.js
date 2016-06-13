var λ = require('contra');
var fs = require('fs');
var path = require('path');
var test = require('tape');
var parser = require('krl-parser');
var generator = require('./');

var files_dir = path.resolve(__dirname, './test-files');

test('compiler', function(t){
  fs.readdir(files_dir, function(err, files){
    if(err) return t.end(err);
    λ.each(files, function(file, next){
      fs.readFile(path.resolve(files_dir, file), 'utf-8', function(err, src){
        if(err) return next(err);

        var out = generator(parser(src));

        t.equals(out, src);

        next();
      });
    }, t.end);
  });
});
