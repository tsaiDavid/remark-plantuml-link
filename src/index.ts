import * as plantuml from './plantuml';
const visit = require('unist-util-visit');

export = function remarkPlantumlPlugin() {
    return function remarkPlantumlTransform(root) {
        visit(root, 'html', function remarkPlantumlPluginVisitNode(node: any, index: number, parent: any) {
            if (node.value) {
                const imageNode = plantuml.getImageNode(node.value);
                if (imageNode !== undefined) {
                    const next =  parent.children[index + 1];
                    if (next && next.type === 'paragraph' && next.children && next.children[0] && next.children[0].type === 'image') {
                        next.children[0] = imageNode;
                    } else {
                       (<any[]>parent.children).splice(index + 1, 0, { type: 'paragraph', children: [imageNode] });
                    }
                }
            }
        });
    };
};
