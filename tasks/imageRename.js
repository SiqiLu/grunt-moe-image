'use strict';
var stream = require('stream');
var path = require('path');
var sizeOf = require('image-size');
var fs = require('fs');
var md5 = require('MD5');

function imageRename() {
  var fileStream = new stream.Transform({
    objectMode: true
  });

  function parsePath(filePath) {
    var extname = path.extname(filePath);
    return {
      dirname: path.dirname(filePath),
      basename: path.basename(filePath, extname),
      extname: extname
    };
  }

  fileStream._transform = function(file, unused, callback) {

    var parsedPath = parsePath(file.relative);
    var dimensions = sizeOf(file.path);
    var fileName = parsedPath.basename + '@' + dimensions.width + 'x' + dimensions.height;

    fs.readFile(file.path, function(err, buf) {
      if (err) {
        callback(err);
        return;
      }

      var fileMD5 = md5(buf);
      fileName = fileName + '-' + fileMD5.substr(0, 6) + parsedPath.extname;
      file.path = path.join(file.base, fileName);

      callback(null, file);

    });
  };

  return fileStream;
}

module.exports = imageRename;
