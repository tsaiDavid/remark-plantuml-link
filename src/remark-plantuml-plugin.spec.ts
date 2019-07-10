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

    xit("smoke", () => {
        expect(plugin).toBeTruthy();
    });

    xit("process should work", () => {
        const result = process(`# h1`);
        expect(result).toBeTruthy();
    });

    it("single string a", () => {
        const content = "<!-- ```plantuml\n./demo.puml\n``` -->";
        const result: string = process(content);
        expect(JSON.stringify(result.trim())).toEqual(
            JSON.stringify(
                `${content}\n\n![](http://www.plantuml.com/plantuml/png/qt3K1000)`
            )
        );
    });

    xit("single string b", () => {
        const content = "<!-- ```plantuml\n(B)\n``` -->";
        const result: string = process(content);
        expect(JSON.stringify(result.trim())).toEqual(
            JSON.stringify(
                `${content}\n\n![](http://www.plantuml.com/plantuml/png/qt3I1000)`
            )
        );
    });

    xit("multiline string", () => {
        const content = "<!-- ```plantuml\n(A)\n(B)\n``` -->";
        const result: string = process(content);
        expect(JSON.stringify(result.trim())).toEqual(
            JSON.stringify(
                `${content}\n\n![](http://www.plantuml.com/plantuml/png/qt3KvD9mqWG0)`
            )
        );
    });

    xit("should replace existing next image", () => {
        const content = `<!-- ${T}plantuml\n(A)\n${T} -->\n![alt](http://example.com/image)`;
        const result: string = process(content);
        expect(JSON.stringify(result.trim())).toEqual(
            JSON.stringify(
                `<!-- ${T}plantuml\n(A)\n${T} -->\n\n![](http://www.plantuml.com/plantuml/png/qt3K1000)`
            )
        );
    });

    it("options server", () => {
        const content = `<!-- ${T}plantuml\n(A)\n${T} -->`;
        const result: string = process(content, {
            imageUrl: "http://blinding.com/cattishness"
        });
        expect(JSON.stringify(result.trim())).toEqual(
            JSON.stringify(
                `${content}\n\n![](http://blinding.com/cattishness/qt3K1000)`
            )
        );
    });

    it("not a plantuml code", () => {
        const content = `<!-- ${T}ts\n(A)\n${T} -->`;
        const result: string = process(content);
        expect(JSON.stringify(result.trim())).toEqual(JSON.stringify(content));
    });
});
