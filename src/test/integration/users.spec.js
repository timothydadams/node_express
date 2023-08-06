import { expect } from "../testHelpers.js";
import supertest from "supertest";
import { Users } from "../../models/users.model.js";
import { app } from "../../index.js";

const testUser = {
    "firstName":"Tom",
    "lastName":"Clancy",
};

let createdUser;

describe("Users", () => {

    before(async function () {
      await Users.sync({force:true});
    });

    describe("POST /api/users", function () {
        let response;
      
        before(async function () {
          response = await supertest(app).post("/api/users").send(testUser);
          createdUser = response.body;
        });
      
        it("is expected to respond with status 200", async function () {
          expect(response.status).to.equal(200);
        });
    
        it("is expected to return a user object", async function () {
          expect(response.body).to.be.an("object");
        });
      
        it("is expected that the response body contains an id property", async function() {
          expect(response.body).to.have.a.property("id");
        });
      
    });

    describe("GET /api/users", function() {
        let response;
      
        before(async function() {
          response = await supertest(app).get(`/api/users`);
        });
      
        it("is expected to respond with status 200", async function() {
          expect(response.status).to.equal(200);
        });
    
        it("is expected to return users", async () => {
          expect(response.body).to.have.property("users");
        });
      
        it("is expected that the users property contains an array", async function () {
          expect(response.body.users).to.be.an("array");
        });
      
    });

    describe("GET /api/users/:id (existing user id)", function() {
        let response;
      
        before(async () => {
          response = await supertest(app).get(`/api/users/${createdUser['id']}`);
        });
      
        it("is expected to respond with status 200", async function () {
            expect(response.status).to.equal(200);
        });
      
        it("is expected to return a user object", async function() {
            expect(response.body).to.be.an("object");
        });
        
        it("is expected that the response body contains an id property", async function() {
            expect(response.body).to.have.a.property("id");
        });
      
    });

    describe("GET /api/users/:id (non-existing user id)", function() {
        let response;
      
        before(async () => {
          response = await supertest(app).get(`/api/users/aaaabbbbbb`);
        });
      
        it("is expected to respond with status 200", async function () {
            expect(response.status).to.equal(200);
        });
      
        it("is expected to return an object", async function() {
            expect(response.body).to.be.an("object");
        });
        
        it("is expected that the response body contains an error property", async function() {
            expect(response.body).to.have.a.property("error");
        });

        it("is expected that the error object contains a message property", async function() {
            expect(response.body.error).to.have.a.property("message");
        });
      
    });

    describe("PUT /api/users/:id", function() {
        let response;
      
        before(async () => {
          response = await supertest(app).put(`/api/users/${createdUser['id']}`).send({"firstName":"Jerry"});
        });
      
        it("is expected to respond with status 200", async function () {
            expect(response.status).to.equal(200);
        });
      
        it("is expected to return a user object", async function() {
            expect(response.body).to.be.an("object");
        });
        
        it("is expected that the response body contains an id property", async function() {
            expect(response.body).to.have.a.property("id");
        });

        it('is expected that user firstName is different', async function () {
            expect(response.body.firstName).to.not.equal(testUser["firstName"]);
        });

        it('is expected that user firstName is now "Jerry"', async function() {
            expect(response.body.firstName).to.equal("Jerry");
        });

        it('is expected that user lastName is unchanged', async function() {
            expect(response.body.lastName).to.equal(testUser["lastName"]);
        });
      
    });

});

