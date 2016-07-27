# Karma-preprocessor-includelocalscripts: read local Javascript referred to by your project's html

Instead of duplicating all your app's Javascript references in your Karma config, just refer to your HTML file.

This preprocessor does not support reading external Javascript files via HTTP.
If wanted look at this preprocessor: https://github.com/gyllstromk/karma-preprocessor-pullscripts

This preprocessor lets you load your project's HTML files, from which the files denoted by the `src` field in the `<script>` files.
The main reason for using this preprocessor is to keep your testsuite in sync with your application.

Pro:

Your project's html files are used, meaning you are guaranteed that there is consistency between test and live resources

# Installation

    $ npm install karma-preprocessor-includelocalscripts

# Configuration

First, include html files in the `files` section of your `karma.conf.js`. These will be processed in order.

```js
files: [
    './path/to/file1.html',
    './path/to/file2.html',
```

Add `includelocalscripts` to your preprocessor list:

```js
preprocessors: {
    './path/to/*.html': 'includelocalscripts',
},
```


## Note on order

All scripts are processed in order of appearance in the HTML files. For example if `jquery` is included before `angular`, then the jquery script will be downloaded and included before the angular script. If you have multiple html files with different scripts included, you might need to ensure the load order (order in `files` array) is consistent.

# License

BSD
