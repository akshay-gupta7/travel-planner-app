const { TestScheduler } = require("jest");

import {getkeyvaluesfromenv, listening} from "../src/server/server"

describe("Testing the isempty functionality from App JS", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the  function", () => {
           // Testing if Hi is a valid input as an URL
           expect(getkeyvaluesfromenv()).toBe(true);
})});