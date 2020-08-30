import {ref, watch, reactive, onMounted} from 'vue';

function ad() {
  const count = ref(0);
  onMounted(() => {
    console.log('1233');
  })
  const str = reactive({
    title: 'string'
  })

  const setCount = function () {
    count.value++;
  }
  watch(() => count.value, (nv) => {
    console.log(nv);
    str.title = nv.toString();
  });
  return {
    count,
    setCount,
    str
  }
}

export default ad;
