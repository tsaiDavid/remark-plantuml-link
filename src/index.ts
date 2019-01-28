import * as plantuml from './plantuml';
const visit = require('unist-util-visit');

export default function remarkPlantumlPlugin(options = {}) {
    return function remarkPlantumlTransform(root, vfile) {
        visit(root, 'html', function remarkPlantumlPluginVisitNode(node, index, parent) {
            if (node.value) {
                const imageNode = plantuml.getImageNode(node.value);
                if (imageNode) {
                    const next =  parent.children[index + 1];
                    if (next && next.type === 'paragraph' && next.children && next.children[0] && next.children[0].type === 'image') {
                        next.children[0] = imageNode;
                    } else {
                       (parent.children as any[]).splice(index + 1, 0, { type: 'paragraph', children: [imageNode] });
                    }
                }
            }
        });
    };
};
