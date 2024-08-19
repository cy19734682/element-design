<template>
	<div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-on="$listeners" />
	<svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners">
		<use :xlink:href="iconName" />
	</svg>
</template>

<script>
	export default {
		name: 'EmIcons',
		props: {
			iconClass: {
				type: String,
				required: true
			},
			className: {
				type: String,
				default: ''
			}
		},
		computed: {
			isExternal() {
				return /^(https?:|mailto:|tel:)/.test(this.iconClass)
			},
			iconName() {
				return `#em-icon-${this.iconClass}`
			},
			svgClass() {
				if (this.className) {
					return 'em-icon ' + this.className
				} else {
					return 'em-icon'
				}
			},
			styleExternalIcon() {
				return {
					mask: `url(${this.iconClass}) no-repeat 50% 50%`,
					'-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
				}
			}
		}
	}
</script>
