// var toString = require('mdast-util-to-string');
import * as visit from 'unist-util-visit';
import * as plantuml from './plantuml';

export = function remarkPlantumlPlugin(options = {}) {
    return function remarkPlantumlTransform(root, vfile) {
        visit(root, 'html', function remarkPlantumlPluginVisitNode(node, index, parent) {
            // debugger;
            if (node.value) {
                const imageNode = plantuml.getImageNode(node.value);
                if (imageNode) {
                    (parent.children as any[]).splice(index + 1, 0, { type: 'paragraph', children: [imageNode] });
                }
            }
        });
    };
};
