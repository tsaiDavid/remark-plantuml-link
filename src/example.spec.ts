import * as expect from "expect";
const capcon = require("capture-console");
let output = "";

describe("example", () => {
    before(() => {
        capcon.startCapture(process.stdout, function(stdout) {
            output += stdout;
        });
    });

    after(() => {
        capcon.stopCapture(process.stdout);
        expect(output).toContain(
            "![](http://www.plantuml.com/plantuml/png/SoWkIImgAStDuT9mrEHoICrB0R81)"
        );
    });

    it("example", () => {
        require("./example");
    });
});
