// This package is the "full-build" that includes both the runtime
// and the compiler, and supports on-the-fly compilation of the template option.
import { compile, CompilerOptions } from '@vue/compiler-dom'
import { registerRuntimeCompiler, RenderFunction } from '@vue/runtime-dom'
import * as runtimeDom from '@vue/runtime-dom'

function compileToFunction(
  template: string,
  options?: CompilerOptions
): RenderFunction {
  // 进来先编译 原来的template 变成ast => node
  // 这里调用的是 compile-dom 的compile
  // compile-dom 对compile-core 做了一次二次封装，注入了一些用户参数和默认参数
  const { code } = compile(template, {
    hoistStatic: true,
    ...options
  })

  return new Function('Vue', code)(runtimeDom) as RenderFunction
}

registerRuntimeCompiler(compileToFunction)

export { compileToFunction as compile }
export * from '@vue/runtime-dom'

if (__BROWSER__ && __DEV__) {
  console[console.info ? 'info' : 'log'](
    `You are running a development build of Vue.\n` +
      `Make sure to use the production build (*.prod.js) when deploying for production.`
  )
}
