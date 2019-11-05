import {
  ref,
  computed,
  watch,
  onMounted,
  createApp,
  compile,
  createComponent
} from '../../packages/vue/dist/vue.esm-browser'

const template = `<div>
  <div>
    {{ count }}
    <br/>
    <span>{{ count }}</span>
  </div>
  <span>plusOne is {{ plusOne }}</span>
  <button @click="increment">count++</button>
</div>`

const myComponent = {
  template,
  setup() {
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
        debugger
        console.log(`count * 2 is ${val}`)
      }
    )
    // lifecycle
    onMounted(() => {
      debugger
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
const vm = createApp(myComponent).mount(myComponent, '#app')

// const component = Vue.setup()
// component.increment()
// console.log(component.count)

// const template = document.body.innerHTML;
// compile(template)
// console.log(compile(template))
