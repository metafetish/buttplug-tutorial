'use strict';

// Set wikifier to output <p> tags.
Config.cleanupWikifierOutput = true;

// The _paq variable needs to live in the window scope, because piwik just
// expects a global _paq. Therefore, run setup on window to make sure the global
// is produced there, then update page visits on passageend (after we've made
// sure everything loaded.)
(function () {
  var _paq = _paq || [];
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="https://apps.nonpolynomial.com/p/";
    _paq.push(['setTrackerUrl', u+'js/']);
    _paq.push(['setSiteId', '10']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.type='text/javascript';
    g.async=true;
    g.defer=true;
    g.src=u+'js/';
    s.parentNode.insertBefore(g,s);
  })();
}).call(window);

$(document).on(":passageend", (ev) => {
  _paq.push(['trackPageView', passage()]);
});

