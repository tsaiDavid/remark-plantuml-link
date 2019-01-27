const plantumlEncoder = require('plantuml-encoder');

export function getImageNode(html: string) {
    const matches = html.match(/<![-]{2,}\s+\u0060{3}([^\n]+)\s+([^]+)\s+\u0060{3}\s+[-]{2,}>/);
    if (matches && matches[1] === 'plantuml') {
        const body = matches[2];
        const encoded = plantumlEncoder.encode(body);
        return {
            type: 'image',
            url: `http://www.plantuml.com/plantuml/uml/png/${encoded}`,
            alt: null,
            title: null,
        };
    }
}
