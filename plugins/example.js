'use strict';

// Set module title
module.exports.title = 'ExamplePlugin';

// Initialize the module
module.exports.init = (app, done) => {
    // Register a new hook for MAIL FROM command. Plugin logs from address
    app.addHook('smtp:mail_from', (address, session, next) => {
        let mailFrom = ((address && address.address) || address || '').toString();
        app.logger.info('Example', 'New message from %s', mailFrom);
        return next();
    });

    // all set up regarding this plugin
    done();
};
