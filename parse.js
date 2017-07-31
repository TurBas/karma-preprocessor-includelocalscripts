var cheerio = require('cheerio'),
    fs = require('fs'),
    _ = require('lodash');

module.exports = function (config, content, file, list, logger) {
    var html = cheerio.load(content),
        paths = [],
        files = config.files || [],
        exclude = config.exclude || [];

    html('script').each(function (index, obj) {
        var src = (config.basePath && config.basePath.length > 0) ? config.basePath + '/' + obj.attribs.src : obj.attribs.src;

        if (src) {
            if (!src.match(/^http/) && !src.match(/^\/\//)) {
                paths.push(fs.realpathSync(src));
            } else {
                logger.debug('skipping script: ' + src);
            }
        }
    });

    addPathsToFileList(paths);
    return list.reload(files, exclude);

    function addPathsToFileList(paths) {
        if (paths.length) {
            paths = paths.reverse();
            var index = _.findIndex(files, { pattern: file.originalPath });
            files.splice(index, 1);
            _.each(paths, function (path) {
                files.splice(index, 0, {
                    pattern: path,
                    served: true,
                    included: true,
                    watched: true,
                    nocache: false
                });
            });
        }
    }
};
