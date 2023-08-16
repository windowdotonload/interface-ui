import type { CSSProperties, ComputedRef } from 'vue'
import { computed, getCurrentInstance } from 'vue'
import type { AlertProps } from '../../alert/src/alert'

/** class 类名集合类型 */
export type ClassList = (string | Record<string, unknown>)[]

/**
 * UseAlertReturn 返回值类型接口
 *
 * @param { Object } classList 类名列表
 * @param { Object } styleList 样式列表
 */
export interface UseAlertReturn {
  classList: ComputedRef<ClassList>
  styleList: ComputedRef<CSSProperties>
}

/**
 * 返回Alert组件的类名列表
 * @param prop
 * @returns
 */
export const UseAlert = (prop: AlertProps): UseAlertReturn => {
  /** 类名列表 */
  const classList = computed((): ClassList => {
    return [
      'fn-alert',
      `fn-alert-${prop.state}`,
    ]
  })

  /** 样式列表 */
  const styleList = computed((): CSSProperties => {
    const style: CSSProperties = {}
    const slots = getCurrentInstance()!.slots

    if (prop.closable || slots.close || slots.textArea)
      style['--bar-width'] = 'calc(100% - 20px)'
    else
      style['--bar-width'] = '100%'
    debugger
    if (prop.duration)
      style['--bar-duration'] = prop.duration ? `${prop.duration}s` : '2s'
    return style
  })

  return {
    styleList,
    classList,
  }
}
