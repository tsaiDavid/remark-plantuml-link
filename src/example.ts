const remark = require("remark");
const plantumlLink = require("./index");
// const input = '<!-- ```plantuml\n(A)\n``` -->';
const input = "<!-- ```plantuml\n[./demo.puml]\n``` -->";

const output = remark()
    .use(plantumlLink)
    .processSync(input)
    .toString();
// Input:
console.log(input);
// Output:
console.log(output);
