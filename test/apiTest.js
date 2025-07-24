import { expect } from "chai";
import { getFact } from '../js/api.js'


describe ("getFact", () => {
    it("should return an object with a fact text", async () => {
        
        const result = await getFact();

        expect(result).to.be.an("object");

        expect(result).to.have.property("text");

        expect(result.text).to.be.a("string");

    });
});
   
