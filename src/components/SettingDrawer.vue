<template>
	<div>
		<a-drawer placement="right" :closable="false" :visible="visible" :after-visible-change="afterVisibleChange" @close="onClose">
			<template v-slot:handle>
				<div class="handle" @click="visible = !visible">
					<a-icon :type="visible ? 'close' : 'setting'"></a-icon>
				</div>
			</template>
			<div>
				<template>
					<div>
						<h2>整体风格定制</h2>
						<a-radio-group v-model="value" :value="$route.query.navTheme || 'dark'" @change="e => handleSettingChange('navTheme', e.target.value)">
							<a-radio value="dark">黑色</a-radio>
							<a-radio value="light">白色</a-radio>
						</a-radio-group>
					</div>
				</template>
			</div>
		</a-drawer>
	</div>
</template>
<script>
export default {
	data() {
		return {
			visible: false,
			value: 'dark',
		};
	},
	methods: {
		afterVisibleChange(val) {
			console.log('visible', val);
		},
		showDrawer() {
			this.visible = true;
		},
		onClose() {
			this.visible = false;
		},
		handleSettingChange(type, value) {
			this.$router.push({ query: { ...this.$route.query, [type]: value } });
		},
	},
};
</script>
<style scoped>
.handle {
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 50%;
	left: -48px;
	width: 48px;
	height: 48px;
	background: #1890ff;
	color: white;
	font-size: 20px;
}
</style>
