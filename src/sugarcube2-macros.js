/*
	External script loading module.
	Taken from https://twinery.org/forum/discussion/6628/sugarcube-2-9-0-including-external-javascript-libraries
*/
(() => {
	'use strict';
	window.requestScriptLoad = function (options) {
		if (options == null || typeof options !== 'object' || !options.src) {
			return;
		}

		var
		opts   = Object.assign({ parent : document.head }, options),
		script = document.createElement('script');

		function onLoadOnce(evt) {
			opts.onload.call(evt.target, evt);
			script.removeEventListener('load', onLoadOnce);
		}

		script.id   = opts.id;
		script.src  = opts.src;
		script.type = 'text/javascript';

		if (typeof opts.onload === 'function') {
			script.addEventListener('load', onLoadOnce, false);
		}

		opts.parent.appendChild(script);
	};

  let buttplugLoadingPromise = new Promise((resolve, reject) => {
	  requestScriptLoad({
		  id     : 'lib-moment-js',
		  src    : 'https://cdn.jsdelivr.net/npm/buttplug@0.4.0/dist/web/buttplug.min.js',
		  onload : function (evt) {
		    resolve();
		  }
	  });
  });

  Macro.add("buttplugloaded", {
		tags: null,
	  handler() {
		  buttplugLoadingPromise.then(() => Wikifier.wikifyEval(this.payload[0].contents.trim()));
	  }
  });
})();
