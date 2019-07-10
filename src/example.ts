const remark = require("remark");
const plantumlLink = require("./index");

const input = "<!-- ```plantuml\n./single_string_a.puml\n``` -->";

const output = remark()
    .use(plantumlLink)
    .processSync(input)
    .toString();
// Input:
console.log(input);
// Output:
console.log(output);
