import {
  ref,
  computed,
  watch,
  onMounted,
  createApp,
  compile,
  createComponent
} from '../../packages/vue/dist/vue.esm-browser'

// yarn dev --formats browser

const template = `<div>
  <div>
    {{ count }}
    <br/>
    <span>{{ count }}</span>
  </div>
  <span>plusOne is {{ plusOne }}</span>
  <button @click="increment">count++</button>
</div>`

const templateComp = `<span>{{count}}</span>`
const component = {
  name: 'a-comp',
  template,
  setup() {
    return {
      count: 8888
    }
  }
}

const App = {
  template,
  setup(propsProxy, setupContext) {
    // Vue 调用 setup 的时候,会把当前上下文 context 传进来
    console.log(propsProxy, setupContext)
    debugger
    // reactive state
    const count = ref(0)
    // const count = { value: 0 }
    // computed state
    const plusOne = computed(() => count.value + 1)
    // method
    const increment = () => {
      count.value++
    }
    // watch
    watch(
      () => count.value * 2,
      val => {
        console.log(`count * 2 is ${val}`)
      }
    )
    // lifecycle
    onMounted(() => {
      console.log(`mounted`)
    })
    // expose bindings on render context
    return {
      count,
      plusOne,
      increment
    }
  }
}

const vm = createApp()
vm.mount(App, '#app')

// const component = Vue.setup()
// component.increment()
// console.log(component.count)

// const template = document.body.innerHTML;
// compile(template)
// console.log(compile(template))
