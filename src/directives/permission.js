/**
 * 按钮粒度的权限控制
 */
import { hasPermission } from '../utils/permission'
import Vue from 'vue'
Vue.directive('permission', {
        inserted: function (el, binding) {
         if (!hasPermission(binding.value)) el.parentNode.removeChild(el)
        }
     })

