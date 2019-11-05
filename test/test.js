var assert = require("assert"); 
let chai = require("chai"); 
let chaiHttp = require("chai-http"); 
let server=require("../start"); 
let should = chai.should(); 
var expect = require('chai').expect; 
chai.use(chaiHttp); 
 
    it ("Expect API to respond", (done)=>{ 
        chai.request(server) 
            .post("/hotel/getOffers") 
            .end((err, result)=>{ 
                expect(result).to.have.status(200) 
                console.log("Ok ") 
                done() 
            }) 
    }).timeout(5000); 
 
    it ("Expect API to search in a specific hotel city", (done)=>{ 

        chai.request(server) 
            .post("/hotel/getOffers").send({"filters":{"destination":"Amman"}}) 
            .end((err, result)=>{ 
            	var myobject = JSON.parse(result.text) 
				for(var attributename in myobject){ 
					var thisHotel = myobject[attributename]['Hotel'] 
				    for( var item in thisHotel){ 
				    	expect(thisHotel[item]['hotelInfo']['hotelCity']).to.equal('Amman') 
				    } 
				} 
                console.log("Done city search testing ") 
                done() 
            }) 
    }).timeout(10000); 
  
  it ("Expect API to search by region ids", (done)=>{ 
 
        chai.request(server) 
            .post("/hotel/getOffers").send({"filters":{"destination":"178279,178286"}}) 
            .end((err, result)=>{ 
                var myobject = JSON.parse(result.text) 
                console.log(myobject) 
                for(var attributename in myobject){ 
                    var thisHotel = myobject[attributename]['Hotel'] 
                    for( var item in thisHotel){ 
                        expect(['178279','178286']).to.contain(thisHotel[item]['destination']['regionID']) 
                    } 
                } 
                console.log("Done region ids search testing ") 
                done() 
            }) 
    }).timeout(10000); 
  
    it ("Should provide rating between 1 and 5", (done)=>{ 
        chai.request(server) 
            .post("/hotel/getOffers").send({"filters":{"minStarRating":'7'}}) 
            .end((err, result)=>{ 
                expect(result).to.have.status(422) 
                console.log('Returned 422 error code') 

            done() 
            }) 
    }).timeout(5000); 
 
 
    it ("Expect error if GuestRating is not a number", (done)=>{ 
        chai.request(server) 
            .post("/hotel/getOffers").send({"filters":{"maxGuestRating":'ghg4'}}) 
            .end((err, result)=>{ 
                expect(result).to.have.status(422) 
                console.log("GuestRating is not a number not allowed ") 
                done() 
            }) 
    }).timeout(5000); 
 
    it ("Expect minTotalRate not to be greater than maxTotalRate", (done)=>{ 
        chai.request(server) 
            .post("/hotel/getOffers").send({"filters":{"maxTotalRate":'2',"minTotalRate":'3'}}) 
            .end((err, result)=>{ 
                expect(result).to.have.status(422) 
                console.log("maxTotalRate has to be  greater than minTotalRate") 
                done() 
            }) 
    }).timeout(5000); 
 
    it ("Expect to have error if length of stay is not a number", (done)=>{ 
        chai.request(server) 
            .post("/hotel/getOffers").send({"filters":{"lengthOfStay":'jj'}}) 
            .end((err, result)=>{ 
                expect(result).to.have.status(422) 
                console.log("lengthOfStay is not a number not allowed ") 
                done() 
            }) 
    }).timeout(5000); 
 
    it ("Expect trip date to not accept an invalid date format", (done)=>{ 
        chai.request(server) 
            .post("/hotel/getOffers").send({"filters":{"maxTripStartDate":'2019.1219'}}) 
            .end((err, result)=>{ 
                expect(result).to.have.status(422) 
                console.log("date is not a valid format not allowed ") 
                done() 
            }) 
    }).timeout(5000); 
    
    it ("Expect minStarRating not to be greater than maxStarRating", (done)=>{ 
        chai.request(server) 
            .post("/hotel/getOffers").send({"filters":{"minStarRating":'5',"maxStarRating":'3'}}) 
            .end((err, result)=>{ 
                expect(result).to.have.status(422) 
                console.log("maxStarRating has to be  greater than minStarRating") 
                done() 
            }) 
    }).timeout(5000); 
    
    it ("Expect acceptig multiple parameters", (done)=>{ 
        chai.request(server) 
            .post("/hotel/getOffers").send({"filters":{"minStarRating":'3',"maxStarRating":'5','lengthOfStay':10,"destination":"Amman"}}) 
            .end((err, result)=>{ 
                expect(result).to.have.status(200) 
                console.log("maxStarRating has to be  greater than minStarRating") 
                done() 
            }) 
    }).timeout(5000); 
 
    it ("Expect preventing searching for special charachters only in destination field", (done)=>{ 
        chai.request(server) 
            .post("/hotel/getOffers").send({"filters":{"destination":"-*/(*&^%$#@!-="}}) 
            .end((err, result)=>{ 
                expect(result).to.have.status(422) 
                console.log("destination field should have a valid destination") 
                done() 
            }) 
    }).timeout(5000);