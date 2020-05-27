// store to plugins/authplugin.js

'use strict';

const username = 'user';
const password = 'secret';

module.exports.title = 'Example Authentication';
module.exports.init = (app, done) => {
    // Listen for AUTH command
    app.addHook('smtp:auth', (auth, session, next) => {
        if (!app.config.interfaces.includes(session.interface)) {
            // not an interface we care about
            next();
        }

        // validate auth.username and auth.password
        if (auth.username !== username || auth.password !== password) {
            // authentication failed
            let err = new Error('Authentication failed');
            err.responseCode = 535;
            return next(err);
        }

        // consider the authentication as succeeded as we did not get an error
        next();
    });

    done();
};
