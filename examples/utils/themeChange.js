import { Loading } from 'element-ui'
import { themes } from './constant'
const version = require('element-ui/package.json').version // element-ui version from node_modules
let chalk = ''
let LoadingEl = null

function updateStyle(style, oldCluster, newCluster) {
	let newStyle = style
	oldCluster.forEach((color, index) => {
		newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
	})
	return newStyle
}

function getCSSString(url) {
	return new Promise((resolve) => {
		const xhr = new XMLHttpRequest()
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4 && xhr.status === 200) {
				chalk = xhr.responseText.replace(/@font-face{[^}]+}/, '')
				resolve()
			}
		}
		xhr.open('GET', url)
		xhr.send()
	})
}

/**
 * 切换主题
 * @param v
 * @returns {Promise<void>}
 */
export const switchTheme = async (v) => {
	LoadingEl && LoadingEl.close()
	const oldVal = chalk ? v : themes[0].val
	if (typeof v !== 'string') return
	LoadingEl = Loading.service({
		lock: true,
		text: 'Loading',
		spinner: 'el-icon-loading',
		backgroundColor: 'hsla(0, 0%, 100%, .6)'
	})
	const themeCluster = v.split(',')
	const originalCluster = oldVal.split(',')
	const getHandler = (id) => {
		return () => {
			const originalCluster = themes[0].val.split(',')
			const newStyle = updateStyle(chalk, originalCluster, themeCluster)
			let styleTag = document.getElementById(id)
			if (!styleTag) {
				styleTag = document.createElement('style')
				styleTag.setAttribute('id', id)
				document.head.appendChild(styleTag)
			}
			styleTag.innerText = newStyle
		}
	}
	if (!chalk) {
		const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`
		await getCSSString(url, 'chalk')
	}
	const chalkHandler = getHandler('chalk-style')
	chalkHandler()
	const styles = [].slice.call(document.querySelectorAll('style')).filter((style) => {
		const text = style.innerText
		return new RegExp(oldVal, 'i').test(text) && !/Chalk Variables/.test(text)
	})
	styles.forEach((style) => {
		const { innerText } = style
		if (typeof innerText !== 'string') return
		style.innerText = updateStyle(innerText, originalCluster, themeCluster)
	})

	if (themeCluster?.length > 0) {
		themeCluster.forEach((color, index) => {
			const property = '--el-color-primary' + (index > 0 ? '-light-' + index : '')
			document.documentElement.style.setProperty(property, color)
		})
	}
	LoadingEl && LoadingEl.close()
}

/**
 * 切换暗黑模式
 * @param e
 * @param that
 * @param key
 * @returns {Promise<void>}
 */
export const switchDark = async (e, that, key) => {
	const x = e.clientX
	const y = e.clientY
	const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
	// 兼容性处理
	if (!document.startViewTransition) {
		that[key] = !that[key]
		return
	}
	const transition = document.startViewTransition(() => {
		that[key] = !that[key]
	})
	transition.ready.then(() => {
		const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]
		document.documentElement.animate(
			{
				clipPath: that[key] ? [...clipPath].reverse() : clipPath
			},
			{
				duration: 400,
				easing: 'ease-in',
				pseudoElement: that[key] ? '::view-transition-old(root)' : '::view-transition-new(root)'
			}
		)
	})
}
