require("dotenv").config();
exports.destroyAdImage = function(filename, callback) {
    var s3 = new aws.S3();
    var params = {
      Bucket: process.env.BUKET_NAME,
      Key: filename
    };
    s3.deleteObject(params, function(err, data) {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        callback(null);
      }
    });
  }