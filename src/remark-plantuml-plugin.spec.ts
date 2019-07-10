/* eslint-disable tslint/config */
import * as expect from "expect";
import * as remark from "remark";
import {
    Options,
    remarkPlantumlPlugin as plugin
} from "./remark-plantuml-plugin";

describe("remark plantuml plugin", () => {
    const T = "```";

    function process(markdown: string, options: Options = {}) {
        return remark()
            .use(plugin, options)
            .processSync(markdown)
            .toString();
    }

    it("smoke", () => {
        expect(plugin).toBeTruthy();
    });

    it("process should work", () => {
        const result = process(`# h1`);
        expect(result).toBeTruthy();
    });

    it("single string a - unnamed diagram", () => {
        const content = "<!-- ```plantuml\n./single_string_a.puml\n``` -->";
        const result: string = process(content);

        expect(JSON.stringify(result.trim())).toEqual(
            JSON.stringify(
                `${content}\n\n![](http://www.plantuml.com/plantuml/png/SoWkIImgAStDuT9mrEHoICrB0R81)`
            )
        );
    });

    it("single string b - named diagram", () => {
        const content = "<!-- ```plantuml\n./single_string_b.puml\n``` -->";
        const result: string = process(content);

        expect(JSON.stringify(result.trim())).toEqual(
            JSON.stringify(
                `${content}\n\n![](http://www.plantuml.com/plantuml/png/SoWkIImgAStDKGZEp4lFIGqkAGBIJbmQJffS3gbvAK0P0000)`
            )
        );
    });

    it("multiline string", () => {
        const content = "<!-- ```plantuml\n./multi_line_string.puml\n``` -->";
        const result: string = process(content);

        expect(JSON.stringify(result.trim())).toEqual(
            JSON.stringify(
                `${content}\n\n![](http://www.plantuml.com/plantuml/png/SoWkIImgAStDuT9mrEJISDBaSaZDIm7o0G00)`
            )
        );
    });

    it("should support relative file placement", () => {
        const content = "<!-- ```plantuml\n../relative_string.puml\n``` -->";
        const result: string = process(content);

        expect(JSON.stringify(result.trim())).toEqual(
            JSON.stringify(
                `${content}\n\n![](http://www.plantuml.com/plantuml/png/SoWkIImgAStDuT8eIir9BCaiIrKeBYdAp4lNv798pKi1oW00)`
            )
        );
    });

    it("should replace existing next image", () => {
        const content = `<!-- ${T}plantuml\n./single_string_a.puml\n${T} -->\n![alt](http://example.com/image)`;
        const result: string = process(content);

        expect(JSON.stringify(result.trim())).toEqual(
            JSON.stringify(
                `<!-- ${T}plantuml\n./single_string_a.puml\n${T} -->\n\n![](http://www.plantuml.com/plantuml/png/SoWkIImgAStDuT9mrEHoICrB0R81)`
            )
        );
    });

    it("options server", () => {
        const content = `<!-- ${T}plantuml\n./single_string_a.puml\n${T} -->`;
        const result: string = process(content, {
            imageUrl: "http://blinding.com/cattishness"
        });

        expect(JSON.stringify(result.trim())).toEqual(
            JSON.stringify(
                `${content}\n\n![](http://blinding.com/cattishness/SoWkIImgAStDuT9mrEHoICrB0R81)`
            )
        );
    });

    it("not a plantuml code", () => {
        const content = `<!-- ${T}ts\n(A)\n${T} -->`;
        const result: string = process(content);

        expect(JSON.stringify(result.trim())).toEqual(JSON.stringify(content));
    });
});
