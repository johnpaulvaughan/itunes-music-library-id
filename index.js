"use strict";
var fs = require('fs');
var promiseIt = require('@johnpaulvaughan/promise-it-exists');
var byline = require('byline');
/**
 * return the users local iTunes music library ID, extracted from the users local 'Itunes Music Library.xml' file.
 *
 * @param  String
 * @return Promise<string>
 */
function retrieveID(librarypath) {
    return new Promise(function (resolve, reject) {
        promiseIt.exists(librarypath).then(function () {
            var stream = fs.createReadStream(librarypath); //get the xml stream if we have an xml file
            stream = byline.createStream(stream);
            var libraryID;
            stream.on('readable', function () {
                var line;
                while (null !== (line = stream.read())) {
                    if (line.indexOf("<key>Library Persistent ID</key>") > -1) {
                        var iDString = String(line).match("<key>Library Persistent ID</key><string>(.*)</string>");
                        libraryID = iDString[1];
                        if (libraryID)
                            break;
                    }
                }
            });
            stream.on('end', function () {
                if (libraryID)
                    resolve(libraryID);
                reject(new Error('Unable to find the iTunes library ID. Check the XML is valid'));
            });
        }).catch(function (err) {
            reject(new Error('XML file does not exist'));
        });
    });
}
exports.retrieveID = retrieveID;
//# sourceMappingURL=index.js.map