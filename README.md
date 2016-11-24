# iTunes Music Library Path
This module retrieves the filepath to the user's local iTunes Music Library XML file. 

## Motivation
The purpose of this XML file is to make the local iTunes music library information available to external programs. In node, we can use the filepath to parse the XML and retrieve song data. This module simply returns the path, not the parsed data.<br>
note: By default, iTunes no longer creates this file automatically at startup. The user has to turn on this feature from iTunes -> Preferences.

##Installation
```bash
$ npm install @johnpaulvaughan/itunes-music-library-path --save
```

##Code Example
This module can return either a promise or a callback, whatever you need to fit with your project. <br>
It rejects (Promise) or throws an error (Callback) if the path cannot be found.

**To return a Promise:**
```javascript
let getItunesPath = require('itunes-music-library-path');

return getItunesPath().then((result) => console.log(result))
// -> C:\Users\JohnPaulVaughan\Music\iTunes\iTunes Music Library.xml
```

**To return a Callback:**
```javascript
let getItunesPath = require('itunes-music-library-path');

getItunesPath((err, res) => {
    if(err)throw err
    console.log(res)
})
// -> C:\Users\JohnPaulVaughan\Music\iTunes\iTunes Music Library.xml
```


