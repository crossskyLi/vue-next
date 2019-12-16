// This package is the "full-build" that includes both the runtime
// and the compiler, and supports on-the-fly compilation of the template option.
import { compile, CompilerOptions, CompilerError } from '@vue/compiler-dom'
import { registerRuntimeCompiler, RenderFunction, warn } from '@vue/runtime-dom'
import * as runtimeDom from '@vue/runtime-dom'
import { isString, NOOP, generateCodeFrame } from '@vue/shared'

const compileCache: Record<string, RenderFunction> = Object.create(null)

function compileToFunction(
  template: string | HTMLElement,
  options?: CompilerOptions
): RenderFunction {
  if (!isString(template)) {
    if (template.nodeType) {
      template = template.innerHTML
    } else {
      __DEV__ && warn(`invalid template option: `, template)
      return NOOP
    }
  }

  const key = template
  const cached = compileCache[key]
  if (cached) {
    return cached
  }

  if (template[0] === '#') {
    const el = document.querySelector(template)
    if (__DEV__ && !el) {
      warn(`Template element not found or is empty: ${template}`)
    }
    template = el ? el.innerHTML : ``
  }
  // 进来先编译 原来的template 变成ast => node
  // 这里调用的是 compile-dom 的compile
  // compile-dom 对compile-core 做了一次二次封装，注入了一些用户参数和默认参数
  const { code } = compile(template, {
    hoistStatic: true,
    cacheHandlers: true,
    onError(err: CompilerError) {
      if (__DEV__) {
        const message = `Template compilation error: ${err.message}`
        const codeFrame =
          err.loc &&
          generateCodeFrame(
            template as string,
            err.loc.start.offset,
            err.loc.end.offset
          )
        warn(codeFrame ? `${message}\n${codeFrame}` : message)
      }
    },
    ...options
  })

  /* runtimeDom 这里指向前面生成 的Vue 实例 */
  const render = new Function('Vue', code)(runtimeDom) as RenderFunction
  return (compileCache[key] = render)
}
// 这里被 import 就会调用
registerRuntimeCompiler(compileToFunction)
// 这里的export compile 估计是为了vue-loader 以及其他的一些库直接掉compile 做一个桥接
export { compileToFunction as compile }
export * from '@vue/runtime-dom'

if (__BROWSER__ && __DEV__) {
  console[console.info ? 'info' : 'log'](
    `You are running a development build of Vue.\n` +
      `Make sure to use the production build (*.prod.js) when deploying for production.`
  )
}
