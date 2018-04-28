exports.continueInit = function (wv, controls) {

    console.info('Main process is initialised and seems to works');

    var AppConfig = require('./../config.js');
    var config = AppConfig.store;

    if (config.userPreferences.windowDraggable && typeof document.body !== 'undefined') {
        document.body.classList.add('draggable');
        setTimeout(function () {
            document.body.style.width = '100%';
            document.body.style.height = '100%';
        }, 100);
    }

    if (config.userPreferences.PIPModeByDefault) {
        document.body.classList.add("PIP-mode");
    }

    if (typeof wv !== 'undefined' && typeof wv.loadURL === 'function') {
        var globalShortcuts = require('./globalShortcuts.js');
        var uiControls = require('./ui-controls.js');
        var urlHandler = require('./urlHandler.js');

        var options = { userAgent : config.defaults.userAgent };

        /* This all is not the best approach for handling loading state,
        *   but it is enough for now
        * */
        var ts = Date.now();
        var splashScreen = document.querySelector('.splash-screen');
        var hideSplashScreen = function () {
            splashScreen.classList.add('hide');
            setTimeout(function () {
                splashScreen.style.display = 'none';
            }, 2000);
        };

        wv.addEventListener('dom-ready', function () {
            var diff = Date.now() - ts;
            if (diff > 1250) {
                hideSplashScreen();
            } else {
                hideSplashScreen();
            }
        });

        wv.loadURL('https://www.youtube.com/', options);

        urlHandler.init(wv);
        globalShortcuts.init(wv);
        uiControls.init(wv, controls);

        // document.querySelector('webview').openDevTools()
    } else {
        alert('Something went wrong, cannot create webview...');
    }
};
