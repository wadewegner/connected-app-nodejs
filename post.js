var http = require('http');
var libxml = require("libxmljs");

var body = 
    '<soapenv:Envelope xmlns:xsd="http://www.w3.org/2001/XMLSchema"' +
    '    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
    '    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" ' +
    '    xmlns:cmd="http://soap.sforce.com/2006/04/metadata" ' +
    '    xmlns:apex="http://soap.sforce.com/2006/08/apex">' +
    '	<soapenv:Header>' +
    '		<cmd:SessionHeader>' +
    '			<cmd:sessionId>00DF00000008H5t!ARgAQONqPATVL3emKy5EaUdqjg.Fwd_RFBoik.SlwoP7XZVCq7Heqlj1sYfI9AAPJZPXOIJoCAaoK9NQaHxlmBZpv6hnx95M</cmd:sessionId>' +
    '		</cmd:SessionHeader>' +
    '	</soapenv:Header>' +
    '	<soapenv:Body>' +
    '		<create xmlns="http://soap.sforce.com/2006/04/metadata">' +
    '			<metadata xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="ConnectedApp">' +
    '			    <contactEmail>wade.wegner@gmail.com</contactEmail>' +
    '			    <version>29.0</version>' +
    '			    <description>my connected app</description>' +
    '			    <label>myconnectedapp</label>' +
    '			    <oauthConfig>' +
    '			        <callbackUrl>sfdx://success</callbackUrl>' +
    '			        <consumerSecret>3256A12TT</consumerSecret>' +
    '			        <scopes>Api</scopes>' +
    '			        <scopes>Web</scopes>' +
    '			        <scopes>Full</scopes>' +
    '			        <scopes>RefreshToken</scopes>' +
    '			    </oauthConfig>' +
    '			</metadata>' +
    '		</create>' +
    '	</soapenv:Body>' +
    '</soapenv:Envelope>';

var xmlDoc = libxml.parseXmlString(body, { noblanks: true });
console.log(xmlDoc.toString());
var xml = xmlDoc.toString();

// console.log(body);

var postRequest = {
    host: 'na42.salesforce.com',
    path: '/services/Soap/m/29.0/00DF00000008H5t',
    port: 443,
    method: 'POST',
    headers: {
        'Content-Type': 'text/xml',
        'SOAPAction': 'create'
    }
};

var req = http.request( postRequest, function( res )    {

   console.log( res.statusCode );
   var buffer = "";
   res.on( "data", function( data ) { buffer = buffer + data; } );
   res.on( "end", function( data ) { console.log( buffer ); } );

});

req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});

req.write( xml );
req.end();