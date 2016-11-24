var chai = require('chai');
chai.use(require('chai-as-promised'));
chai.use(require('chai-files'));
var file = require('chai-files').file;
var expect = require('chai').expect;
var should = require('chai').should;

var getID = require('../index').retrieveID;




describe('#retrieveID', () => {
    it('should return a string', () => {
        let validXML = require('path').basename(__dirname) + "/iTunes Library.xml";
        return getID(validXML).then((result) => { 
          console.log(result)
          expect(result).to.be.a('string')
        })
    })

    it('should reject with Error:"File does not exist" if the xml is not accessible', () => {
        let nonExistentXML = require('path').basename(__dirname) + "/fake-File-Does-Not-Exist.xml.xml";
        return expect(getID(nonExistentXML)).to.be.rejectedWith('XML file does not exist')
    })

    it('should reject with Error:"unable to find ID" if it cannot find the ID', () => {
        let fakeXML = require('path').basename(__dirname) + "/not an iTunes Library.xml";
        return expect(getID(fakeXML)).to.be.rejectedWith('Unable to find the iTunes library ID. Check the XML is valid')
    })
}); 