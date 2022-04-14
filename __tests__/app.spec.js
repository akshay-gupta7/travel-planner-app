const { TestScheduler } = require("jest");

import { checkisempty } from "../src/client/js/app";

describe("Testing the isempty functionality from App JS", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the  function", () => {
           // Testing if Hi is a valid input as an URL
           expect(checkisempty("Paris")).toBe(0);
})});