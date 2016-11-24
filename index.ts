import * as path from 'path'
import * as fs from 'fs'
import * as promiseIt from '@johnpaulvaughan/promise-it-exists'

let byline = require('byline')

/**
 * return the users local iTunes music library ID, extracted from the users local 'Itunes Music Library.xml' file. 
 *
 * @param  String
 * @return Promise<string>
 */

export function retrieveID(librarypath: string) {
	return new Promise((resolve, reject) => {

		promiseIt.exists(librarypath).then(() => {
			let stream = fs.createReadStream(librarypath) //get the xml stream if we have an xml file
			stream = byline.createStream(stream)
			let libraryID
			stream.on('readable', () => {
				let line
				while (null !== (line = stream.read())) {
					if (line.indexOf("<key>Library Persistent ID</key>") > -1) {
						let iDString = String(line).match("<key>Library Persistent ID</key><string>(.*)</string>")
						libraryID = iDString[1]
						if (libraryID) break
					}
				}
			})

			stream.on('end', () => {
				if (libraryID) resolve(libraryID)
				reject(new Error('Unable to find the iTunes library ID. Check the XML is valid'))
			})
		}).catch((err) => {
			reject(new Error('XML file does not exist'))
		})
	})
}