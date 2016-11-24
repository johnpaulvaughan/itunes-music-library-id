# iTunes Music Library Path
This module loops through iTunes Music Library XML and returns the library ID. 

## Motivation
Using the library ID you can do things like sync the local iTunes library with persistent storage, using the library id as the unique id.<br>
note: By default, iTunes no longer creates this file automatically at startup. The user has to turn on this feature from iTunes -> Preferences.

##Installation
```bash
$ npm install @johnpaulvaughan/itunes-music-library-id --save
```

##Code Example
This module returns a promise of the ID. <br>
It rejects if the path cannot be found.

**To return a Promise:**
```javascript
let retrieveID = require('itunes-music-library-id').retrieveID;
let validXMLpath = 'C:\Users\JohnPaulVaughan\Music\iTunes\iTunes Music Library.xml'
let invalidPath = 'c:\some other file.txt'

return retrieveID(validXMLpath)
 .then((result) => console.log(result))
 .catch((err) => console.log(err))
// -> E64GD46A5D1D3AF


return retrieveID(invalidPath)
 .then((result) => console.log(result))
 .catch((err) => console.log(err))
// -> ERROR: 'Unable to find the iTunes library ID. Check the XML is valid'

```
