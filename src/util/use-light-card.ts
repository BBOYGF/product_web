import { onMounted, onUnmounted, ref } from 'vue'

interface IOptions {
  light?: {
    width?: number;
    height?: number;
    color?: string;
    blur?: number;
  }
}

export const useLightCard = (option: IOptions = {}) => {
  // 获取卡片的dom节点
  const cardRef = ref<HTMLAnchorElement | null>(null)
  let cardOverflow = ''
  // 获取光的dom节点
  const lightRef = ref<HTMLDivElement>(document.createElement('div'))
  // 设置光源样式
  const setLightStyle = () => {
    const { width = 60, height = 60, color = '#ff4132', blur = 60 } = option.light ?? {}
    const lightDom = lightRef.value
    lightDom.style.position = 'absolute'
    lightDom.style.width = `${width}px`
    lightDom.style.height = `${height}px`
    lightDom.style.background = color
    lightDom.style.filter = `blur(${blur}px)`
  }
  // 设置卡片的overflow为hidden
  const setCardOverflowHidden = () => {
    const cardDom = cardRef.value
    if (cardDom) {
      cardOverflow = cardDom.style.overflow
      cardDom.style.overflow = 'hidden'
    }
  }
  // 还原卡片的overflow
  const restoreCardOverflow = () => {
    const cardDom = cardRef.value
    if (cardDom) {
      cardDom.style.overflow = cardOverflow
    }
  }
  // 往卡片里添加光源
  const addLight = () => {
    const cardDom = cardRef.value
    if (cardDom) {
      cardDom.appendChild(lightRef.value)
    }
  }
  // 删除光源
  const removeLight = () => {
    const cardDom = cardRef.value
    if (cardDom) {
      cardDom.removeChild(lightRef.value)
    }
  }
  // 监听卡片鼠标进入
  const onMouseEnter = () => {
    addLight()
    setCardOverflowHidden()

  }
  //监听鼠标移动
  const onMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e
    const cardDom = cardRef.value
    const lightDom = lightRef.value
    if (cardDom && lightDom) {
      // 获取卡片相对坐标
      const { x, y } = cardDom.getBoundingClientRect()
      // 获取光的宽高
      const { width, height } = lightDom.getBoundingClientRect()

      lightDom.style.left = `${clientX - x - width / 2}px`
      lightDom.style.top = `${clientY - y - height / 2}px`

      //设置动而效果
      const maxXRotation = 10 // × 储菌转角度
      const maxYRotation = 10 // Y 轴旋转角度
      const rangeX = 200 / 2// ×轴旋转的范围
      const rangeY = 200 / 2 //Y 轴旋转的范围
      const rotateX = ((clientX - x - rangeY) / rangeY) * maxXRotation //根据l标在 v轴上的位置计算经x轴的家转角度
      const rotateY = -1 * ((clientY - y - rangeX) / rangeX) * maxYRotation //府承标在x箱上的位置计算绕Y箱的提转角度
      cardDom.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)` //设置 30 透视


    }
  }
  // 监听卡片鼠标移除
  const onMouseLeave = () => {
    removeLight()
    restoreCardOverflow()
  }
  onMounted(() => {
    // 设置光源
    setLightStyle()
    cardRef.value?.addEventListener('mouseenter', onMouseEnter)
    cardRef.value?.addEventListener('mousemove', onMouseMove)
    cardRef.value?.addEventListener('mouseleave', onMouseLeave)
  })

  onUnmounted(() => {
    cardRef.value?.removeEventListener('mouseenter', onMouseEnter)
    cardRef.value?.removeEventListener('mousemove', onMouseMove)
    cardRef.value?.removeEventListener('mouseleave', onMouseLeave)
  })

  return {
    cardRef
  }
}
