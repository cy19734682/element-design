<template>
	<div class="em-map">
		<div class="searchInput">
			<el-input
				v-model="keyword"
				:placeholder="placeholder || t('em.button.search')"
				:disabled="disabled"
			/>
		</div>
		<baidu-map
			class="map"
			:center="valueT"
			:zoom="zoom"
			@ready="readyHandler"
			scroll-wheel-zoom
			@click="clickEvent"
			:ak="ak"
			@zoomend="syncCenterAndZoom"
		>
			<!-- 地图控件位置 -->
			<bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT" />
			<!-- 定位当前位置 -->
			<bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" show-address-bar auto-location />
			<!-- 地图容器 -->
			<bm-view :style="{ width: width, height: height }"></bm-view>
			<bm-local-search :keyword="keyword" auto-viewport @infohtmlset="infohtmlset" />
		</baidu-map>
	</div>
</template>

<script>
	import _ from 'lodash'
	import Locale from '../../mixins/locale'
	import { BaiduMap, BmNavigation, BmView, BmGeolocation, BmLocalSearch } from 'vue-baidu-map'

	export default {
		name: 'EmBaiduMap',
		components: {
			BaiduMap,
			BmNavigation,
			BmView,
			BmGeolocation,
			BmLocalSearch
		},
		model: {
			prop: 'value',
			event: 'on-val-change'
		},
		mixins: [Locale],
		props: {
			value: {
				type: Object,
				default() {
					return {}
				}
			},
			width: {
				type: String,
				default: '100%'
			},
			height: {
				type: String,
				default: '300px'
			},
			disabled: {
				type: Boolean,
				default: false
			},
			placeholder: {
				type: String,
				default: ''
			},
			ak: {
				type: String,
				default: (window.global && window.global.bdAk) || 'ak' + Math.floor(Math.random() * 1000000000)
			}
		},
		data() {
			return {
				Map: null,
				defaultCenter: {
					lng: 106.554865,
					lat: 29.567981
				},
				keyword: '',
				zoom: 12
			}
		},
		computed: {
			valueT: {
				get() {
					if (
						!_.isEmpty(this.value) &&
						(this.value.lng || this.value.lng === 0) &&
						(this.value.lat || this.value.lat === 0)
					) {
						return _.cloneDeep(this.value)
					}
					if (this.Map) {
						this.zoom = 12
						this.Map.clearOverlays() //清除标记点
					}
					return _.cloneDeep(this.defaultCenter)
				},
				set(val) {
					this.$emit('on-val-change', _.cloneDeep(val))
				}
			}
		},
		watch: {
			value(val) {
				if (this.Map && !_.isEmpty(val) && (val.lng || val.lng === 0) && (val.lat || val.lat === 0)) {
					this.Map.clearOverlays() //清除标记点
					const myMarker = new BMap.Marker(new BMap.Point(val.lng, val.lat))
					this.Map.addOverlay(myMarker) //添加标记点
					this.zoom = 15
				}
			}
		},
		beforeDestroy() {
			if (!this.Map) {
				return
			}
			this.Map = null
		},
		methods: {
			/**
			 * 地图加载完成
			 * @param BMap
			 * @param map
			 */
			readyHandler({ BMap, map }) {
				if (
					!_.isEmpty(this.value) &&
					(this.value.lng || this.value.lng === 0) &&
					(this.value.lat || this.value.lat === 0)
				) {
					//默认值不为空才定位
					const myMarker = new BMap.Marker(new BMap.Point(this.valueT.lng, this.valueT.lat))
					map.addOverlay(myMarker)
				}
				this.Map = map
			},
			syncCenterAndZoom(e) {
				this.zoom = e.target.getZoom()
			},
			/**
			 * 地图点击事件
			 * @param e
			 */
			clickEvent(e) {
				if (this.disabled) {
					//如果禁用，则直接返回
					return
				}
				//用所定位的经纬度查找所在地省市街道等信息
				const point = new BMap.Point(e.point.lng, e.point.lat)
				const gc = new BMap.Geocoder()
				gc.getLocation(point, (rs) => {
					const locMap = {
						lng: e.point.lng,
						lat: e.point.lat,
						name: rs.address
					}
					this.zoom = 15
					this.$emit('on-val-change', locMap)
				})
			},
			infohtmlset(e) {
				const locMap = {
					name: e.address,
					lng: e.point.lng,
					lat: e.point.lat
				}
				this.$emit('on-val-change', locMap)
				this.keyword = ''
			}
		}
	}
</script>
