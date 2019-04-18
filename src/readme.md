# TodoMVC App Template - with minor adjustments

The TodoMVC app implemented with React (using hooks) and XState version 4.

Updated to include a status state to determine if the form is valid or invalid. Also maintains a parallel state to track dirty/clean state in the machine to determine if we should show the user the error message. An invalid field that hasn't been touched should not submit (invlaid state controls this), but we should only display the error message if the form is invalid _and_ it is "dirty" (field has been modified or started with a non-empty value)

> Template used for creating [TodoMVC](http://todomvc.com) apps

![](https://github.com/tastejs/todomvc-app-css/raw/master/screenshot.png)

## Getting started

- Read the [Application Specification](https://github.com/tastejs/todomvc/blob/master/app-spec.md) before touching the template.

- Delete this file and rename `app-readme.md` to `readme.md` and fill it out.

- Clone this repo and install the dependencies with [npm](https://npmjs.com) by running: `npm install`.

## License

<a rel="license" href="http://creativecommons.org/licenses/by/4.0/deed.en_US"><img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by/4.0/80x15.png" /></a><br />This <span xmlns:dct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/InteractiveResource" rel="dct:type">work</span> by <a xmlns:cc="http://creativecommons.org/ns#" href="http://sindresorhus.com" property="cc:attributionName" rel="cc:attributionURL">TasteJS</a> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/deed.en_US">Creative Commons Attribution 4.0 International License</a>.
