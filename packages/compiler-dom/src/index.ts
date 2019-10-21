import { baseCompile, CompilerOptions, CodegenResult } from '@vue/compiler-core'
import { parserOptionsMinimal } from './parserOptionsMinimal'
import { parserOptionsStandard } from './parserOptionsStandard'
import { transformStyle } from './transforms/transformStyle'
import { transformVHtml } from './transforms/vHtml'

export function compile(
  template: string,
  options: CompilerOptions = {}
): CodegenResult {
  return baseCompile(template, {
    ...options,
    ...(__BROWSER__ ? parserOptionsMinimal : parserOptionsStandard), // 判断是不是浏览器，注入不容的parser options
    nodeTransforms: [transformStyle, ...(options.nodeTransforms || [])], // 允许用户添加自己的nodeTransforms 节点编译
    directiveTransforms: {
      html: transformVHtml,
      ...(options.directiveTransforms || {}) // 允许用户添加自己的 directiveTransforms 指令编译
    }
  })
}

export * from '@vue/compiler-core'
