/* @flow */

import { inBrowser } from 'core/util/index'

// check whether current browser encodes a char inside attribute values
let div
function getShouldDecode (href: boolean): boolean {
  div = div || document.createElement('div')
  div.innerHTML = href ? `<a href="\n"/>` : `<div a="\n"/>`
  return div.innerHTML.indexOf('&#10;') > 0
}

// #3663: IE encodes newlines inside attribute values while other browsers don't
// https://github.com/vuejs/vue/issues/3663  修复style变量样式在ie下不生效的问题
export const shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false
// #6828: chrome encodes content in a[href] chrome下href和src属性会添加一些unciode字符
// https://github.com/vuejs/vue/issues/6828
export const shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false
