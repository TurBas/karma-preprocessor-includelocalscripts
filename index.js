var process = require('./parse');

var includeLocalScripts = function (loggerFactory, config, injector) {
    var logger = loggerFactory.create('preprocessor:includelocalscripts');
    config = typeof config === 'object' ? config : {};

    var running = false;
    return function (content, file, done) {
        var list = injector.get('fileList');
        if (!running) {
            running = true;
            process(config, content, file, list, logger)
                .then(afterProcess, afterProcess);
        } else {
            done(content);
        }

        function afterProcess(){            
            running = false;
            done(content);
        }
    };
};

includeLocalScripts.$inject = [ 'logger', 'config', 'injector' ];

module.exports = {
    'preprocessor:includelocalscripts': [ 'factory', includeLocalScripts ]
};
