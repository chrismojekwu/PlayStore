const supertest = require('supertest');
const app = require('../app');
const { expect } = require('chai');
const appList = require('../playstore')

describe("GET /apps", () => {
   it("should return array of objects", () => {
       return supertest(app)
       .get('/apps')
       .expect(200)
       .then(res => {
           expect(res.body).to.be.an('array');
       })
    })

   it("should properly sort array by rating", () => {
       
       const sorted = appList.sort((a,b) => {
           return a-b
       });
       
       return supertest(app)
       .get('/apps')
       .query({sort:"rating"})
       .expect(200)
       .then(res => {
           expect(res.body).to.deep.equal(sorted);
       })
    })

   it("should properly sort by app name", () => {

        const sortedByApp = appList.sort((a,b) => {
            return a.App < b.App? -1 : a.App > b.App ? 1 : 0;
        });

        return supertest(app)
       .get('/apps')
       .query({sort:"app"})
       .expect(200)
       .then(res => {
           expect(res.body).to.deep.equal(sortedByApp);
       })
    })

   it("should properly filter by genre", () => {
       return supertest(app)
       .get('/apps')
       .query({genre: "Action"})
       .expect(200)
       .then(res => {
           expect(res.body[0]).to.include({"Genres":"Action"})
       })
   }) 

});