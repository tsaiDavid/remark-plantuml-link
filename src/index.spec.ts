/* eslint-disable tslint/config */
import * as expect from 'expect';
import * as remark from 'remark';
import plugin = require('./index');

const T = '```';

function process(s: string) {
    return remark()
        .use(plugin)
        .processSync(s)
        .toString();
}

it('smoke', () => {
    expect(plugin).toBeTruthy();
});

it('process should work', () => {
    const result = process(`# h1`);
    expect(result).toBeTruthy();
});

it('single string a', () => {
    const content = '<!-- ```plantuml\n(A)\n``` -->';
    const result: string = process(content);
    expect(JSON.stringify(result.trim())).toEqual(JSON.stringify(`${content}\n\n![](http://www.plantuml.com/plantuml/uml/png/qt3K1000)`));
});

it('single string b', () => {
    const content = '<!-- ```plantuml\n(B)\n``` -->';
    const result: string = process(content);
    expect(JSON.stringify(result.trim())).toEqual(JSON.stringify(`${content}\n\n![](http://www.plantuml.com/plantuml/uml/png/qt3I1000)`));
});

it('multiline string', () => {
    const content = '<!-- ```plantuml\n(A)\n(B)\n``` -->';
    const result: string = process(content);
    expect(JSON.stringify(result.trim())).toEqual(JSON.stringify(`${content}\n\n![](http://www.plantuml.com/plantuml/uml/png/qt3KvD9mqWG0)`));
});

it('should replace existing next image', () => {
    const content = `<!-- ${T}plantuml\n(A)\n${T} -->\n![alt](http://example.com/image)`;
    const result: string = process(content);
    expect(JSON.stringify(result.trim())).toEqual(JSON.stringify(`<!-- ${T}plantuml\n(A)\n${T} -->\n\n![](http://www.plantuml.com/plantuml/uml/png/qt3K1000)`));
});

it.only('options server');
