// 1、了解 AST
// const esprima = require('esprima')
// const estraverse = require('estraverse')
// const escodegen = require('escodegen');
// const code = `const fn = (a, b) => a + b`

// module.exports = async () => {
//     // 生成 AST
//     const ast = esprima.parseScript(code)
//     console.log('ast:', ast);
//     // 转换 AST，只会遍历 type 属性
//     // traverse 方法中有进入和离开两个钩子函数
//     estraverse.traverse(ast, {
//         enter(node) {
//             if (node.type === 'Identifier') {
//                 node.name = 'hello';
//             }
//         console.log('enter -> node.type', node.type)
//         },
//         leave(node) {
//         console.log('leave -> node.type', node.type)
//         },
//     })
//     // 生成新的代码
//     const result = escodegen.generate(ast)
//     console.log(result)

// };


// 2、手写 babel 插件，将箭头函数转换为 function 形式。
// const babel = require('@babel/core')
// const t = require('@babel/types') // 判断节点类型，生成对应的表达式
// const code = `const fn = (a, b) => { return a + b; }`
// module.exports = () => {
//     const arrowFnPlugin = {
//         // 访问者模式
//         visitor: {
//             // 当访问到某个路径的时候进行匹配
//             ArrowFunctionExpression(path) {
//                 // 拿到节点然后替换节点
//                 const node = path.node
//                 console.log("ArrowFunctionExpression -> node", node)
//                 // 拿到函数的参数
//                 const params = node.params
//                 let body = node.body
//                 // 判断是不是 blockStatement，不是的话让他变成 blockStatement
//                 if (!t.isBlockStatement(body)) {
//                     body = t.blockStatement([body])
//                 }
//                 const functionExpression = t.functionExpression(null, params, body)
//                 // 替换原来的函数
//                 path.replaceWith(functionExpression)
//             },
//         },
//     }

//     const r = babel.transform(code, {
//         plugins: [arrowFnPlugin],
//     })

//     console.log(r.code)

// };



// 3、按需打包
const babel = require('@babel/core')
const t = require('@babel/types') // 判断节点类型，生成对应的表达式
const code = `import { Button, Icon } from 'vant'`
module.exports = () => {

    const importPlugin = (opt) => {
        const {
            libraryDir
        } = opt;
        return {
            // 访问者模式
            visitor: {
                // 当访问到某个路径的时候进行匹配
                ImportDeclaration(path) {
                    // 拿到节点然后替换节点
                    const node = path.node
                    const specifiers = node.specifiers;
                    if (!(specifiers.length === 1 && t.isImportDefaultSpecifier(specifiers[0]))) {
                        const result = specifiers.map(specifier => {
                            const local = specifier.local;
                            let source;
                            if (t.isImportDefaultSpecifier(specifier)) {
                                source = t.stringLiteral(node.source.value)
                            } else {
                                source = t.stringLiteral(
                                    `${node.source.value}/${libraryDir}/${specifier.local.name}`
                                )
                            }
                            // const source = t.stringLiteral(`${node.source.value}/${libraryDir}/${specifier.local.name}`);
                            return t.importDeclaration([t.importDefaultSpecifier(local)], source)
                        });
                        path.replaceWithMultiple(result)
                    }
                }
            }
        }
    };

    const r = babel.transform(code, {
        plugins: [importPlugin({
            libraryDir: 'lib'
        })],
    })

    console.log(r.code)

};