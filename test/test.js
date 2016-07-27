var assert = require('assert');

describe('includelocalscripts', function () {
    var path  = require('path');
    var parse = require('../parse');

    var html = '<html>' +
                   '<head>' +
                        '<script src="http://firstUrl.com"></script>' +
                        '<script src="//secondUrl.com"></script>' +
                        '<script src="./test/first.js"></script>' +
                        '<script src="test/second.js"></script>' +
                   '</head>' +
               '</html>';

    var baseDir = __dirname;
    var urls = [ path.join(baseDir + '/first.js'), path.join(baseDir + '/second.js') ];
    var config = { filePrefix: 'dist/' };
    var file = { originalPath: ''};
    var list = { reload: function(files) { return files; }};


    var logger = {
	    debug: function() {}
    };

    it('includes only the local script files from the html', function (done) {

        var result = parse(config, html, file, list, logger);
        assert.equal(result.length, urls.length);
        for (var i = 0; i < result.length; i++) {
            var r = result[i];
            var u = urls[i];
            assert.equal(r.pattern, u);
        }
        done();
    });

    it('logs the skipped script files', function(done) {
        var debugMessages = [];
        logger.debug = function(msg) { debugMessages.push(msg) };

        parse(config, html, file, list, logger);
        assert.equal(debugMessages.length, 2);
        assert.equal(debugMessages[0], 'skipping script: http://firstUrl.com');
        assert.equal(debugMessages[1], 'skipping script: //secondUrl.com');

        done();
    });
});
