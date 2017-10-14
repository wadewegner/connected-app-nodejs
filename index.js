let jsforce = require('jsforce');
let conn = new jsforce.Connection({
    // you can change loginUrl to connect to sandbox or prerelease env.
    // loginUrl : 'https://test.salesforce.com'
});

let username = 'api@dotnetbuild.com';
let password = 'p4uPgFg7VaTMGzLT';
let fullName = 'my_connected_app7';

conn.login(username, password, function (err, userInfo) {
    if (err) {
        return console.error(err);
    }

    let metadata = [{
        contactEmail: 'wade.wegner@gmail.com',
        description: 'my connected app 7',
        fullName: fullName,
        label: 'ConnectedAppLabel7',
        oauthConfig: {
            callbackUrl: 'sfdx://success',
            consumerSecret: '3256A12TT',
            scopes: [
                'Basic',
                'Api',
                'Web',
                'Full',
                'RefreshToken'
            ]
        }
    }];

    conn.metadata.create('ConnectedApp', metadata, function (err, results) {
        if (err) {
            console.log(err);
            return;
        }

        conn.metadata.read('ConnectedApp', fullName, function (err, metadata) {
            if (err) {
                console.log(err);
                return;
            }

            console.log('consumer key: ' + metadata.oauthConfig.consumerKey);
        });
    });


});