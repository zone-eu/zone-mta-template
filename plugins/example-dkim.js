// store to plugins/authplugin.js

'use strict';

// DNS entry
// test._domainkey.example.com:v=DKIM1;p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDVb7eRJNfQrfnEr6GyZaRq1JxbxQh5+h+4D2OseH2t/vii+8OXvkpApTUEO2woJ1tbeNSGinnxfWnxZpoZaCjrhqJHrtFR6pQFcD/FnT92w5eyru+kq5yLAv+IXlZXvJXoOw9gN3NwBJ6p+EqC1/1hsOl4dedDFd/xmMlHk6wj8wIDAQAB

// Sent message should have a signature like the following:
/*
DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed; d=example.com;
 q=dns/txt; s=test; bh=VRtPFKW6BFIbUeboSJtHw3z5AVJGV/i9RPj/ISlIzAk=;
 h=subject:date:message-id;
 b=BQsM8Qso5gSYpBHOCb2MVc0cW5QRnF4upuIWfE4CcpQHIPKuxJF+u4ToFKvkhnqAqqOHMcB5z
 V3Vr4Loj7ozCtn/rfSXiyY8sOoaYqqcUBgjuKdJ0gUNySb4ADKfgfyhREf117c6OjajQRenMO9r
 +rdBEDvBOD9Bxc2KzVUhyfE=
*/

const DKIM_DOMAIN_NAME = 'example.com';
const DKIM_SELECTOR = 'test';
const DKIM_KEY = `-----BEGIN RSA PRIVATE KEY-----
MIICXwIBAAKBgQDVb7eRJNfQrfnEr6GyZaRq1JxbxQh5+h+4D2OseH2t/vii+8OX
vkpApTUEO2woJ1tbeNSGinnxfWnxZpoZaCjrhqJHrtFR6pQFcD/FnT92w5eyru+k
q5yLAv+IXlZXvJXoOw9gN3NwBJ6p+EqC1/1hsOl4dedDFd/xmMlHk6wj8wIDAQAB
AoGBALhYEVhPVgdq/Dsg5qvKlkOe9p1chIG1wweaYyBnwUUy31UF1l2NgVxsVGof
WL8lnwZWSlkZ6VDmXUaes6IWEKAoXSdg9upf4FHuF7XUT6rXUpxH9naR2F4nvGfr
IbWIYAdwtDxHR52LTceeInwQOP/7iWYnTastNkpYvW3h/oghAkEA8XLUhRoXMygv
k1YjxPqs+79cwWe9LrwRSik2GWVZC224tVehDNQqfDMw31AQEyqtjeoQltZbJiyd
pZbsMTdnxwJBAOJMtBk+MCzVyKn67VrXAA6XP1t0e0lcEga5RPmM7syOoi1dYTln
FBiffQYLyYmEbLsPm3ZpqlMn7H6IDu+0mnUCQQC9nq4SnivsLDo43uSWlTv3NhFV
fvBPXLnDYVwwU6y70f7GxDwiBBodkmJmbs1BEDpfApzmqQ/Kii2A12dFO7sPAkEA
q/FByghBTF+nFtgMbj/70BpFTnTDk+q725X7fW0CqDQbr0JLM/VJBKhxsx1TpQQU
JVFneuIwQvyLqVwxlRnxXQJBAPC9jhzJ+7/KWaIk8A77raVCFcUFvZTLtT8h2Yz2
hBm+MW0bCMJLoW1pkwftJld+ddXswz6SL2foT8jlmAxEiSY=
-----END RSA PRIVATE KEY-----`;

module.exports.title = 'Example DKIM Plugin';

module.exports.init = (app, done) => {
    app.addHook('sender:connection', (delivery, connection, next) => {
        // make sure that there is a key array present
        if (!delivery.dkim.keys) {
            delivery.dkim.keys = [];
        }

        // resolve the domain name of the sender
        const fromDomain = (delivery.from || 'localhost').split('@').pop().toLowerCase();

        // push all signature keys to the key array
        delivery.dkim.keys.push({
            domainName: DKIM_DOMAIN_NAME,
            keySelector: DKIM_SELECTOR,
            privateKey: DKIM_KEY
        });

        app.logger.info('DKIM', '%s.%s Added DKIM key for %s <%s>', delivery.id, delivery.seq, fromDomain, delivery.messageId);
        next();
    });

    done();
};
