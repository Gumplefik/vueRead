/* @flow */

import { parse } from './parser/index'
import { optimize } from './optimizer'
import { generate } from './codegen/index'
import { createCompilerCreator } from './create-compiler'

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
// 这一段complier是真的恶心，一堆东西，不用太关注所有的实现，只关心输出就可以了
// cide.reder的值举例：见同目录文件renderExample.txt
// ast就是描述了attrs, attrsList, children,之类的东西，对一个元素的对象描述
// 顺便加了一些static之类的标识
export const createCompiler = createCompilerCreator(function baseCompile (
  template: string,
  options: CompilerOptions
): CompiledResult {
  // template转ast， 标注静态节点
  const ast = parse(template.trim(), options)
  if (options.optimize !== false) {
    optimize(ast, options)
  }
  const code = generate(ast, options)
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
})
