import * as expect from 'expect';
import * as remark from 'remark';
import plugin = require('./index');

function process(string) {
    return remark()
        .use(plugin, {})
        .processSync(string)
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
    expect(JSON.stringify(result.trim())).toEqual(JSON.stringify(`${content}\n\n![](http://www.plantuml.com/plantuml/uml/qt3K1000)`));
});

it('single string b', () => {
    const content = '<!-- ```plantuml\n(B)\n``` -->';
    const result: string = process(content);
    expect(JSON.stringify(result.trim())).toEqual(JSON.stringify(`${content}\n\n![](http://www.plantuml.com/plantuml/uml/qt3I1000)`));
});

it('should replace existing next image');
