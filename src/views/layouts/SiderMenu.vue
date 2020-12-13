<template>
	<div style="width: 200px">
		<a-menu :selectedKeys="selectedKeys" :openKeys.sync="openKeys" mode="inline" :theme="theme">
			<template v-for="item in menuData">
				<a-menu-item v-if="!item.children" :key="item.path" @click="routerPush(item.path)">
					<a-icon v-if="item.meta.icon" type="pie-chart" />
					<span>{{ item.meta.title }}</span>
				</a-menu-item>
				<sub-menu v-else :key="item.path" :menu-info="item" />
			</template>
		</a-menu>
	</div>
</template>

<script>
import SubMenu from './SubMenu';

export default {
	components: {
		SubMenu,
	},
	props: {
		theme: {
			type: String,
			default: 'dark',
		},
	},
	watch: {
		'$route.path': function(val) {
			this.selectedKeys = this.selectedKeysMap[val];
			this.openKeys = this.collapsed ? [] : this.openKeysMap[val];
		},
	},
	data() {
		this.selectedKeysMap = {};
		this.openKeysMap = {};
		const menuData = this.getMenuData(this.$router.options.routes);
		return {
			collapsed: false,
			menuData,
			selectedKeys: this.selectedKeysMap[this.$route.path],
			openKeys: this.openKeysMap[this.$route.path],
		};
	},
	methods: {
		toggleCollapsed() {
			this.collapsed = !this.collapsed;
		},
		getMenuData(routes = [], parentKeys = [], selectedKeys) {
			const MENU = [];
			routes.forEach(item => {
				if (item.name && !item.hideInMenu) {
					this.openKeysMap[item.path] = parentKeys;
					this.selectedKeysMap[item.path] = [selectedKeys || item.path];
					const NEW_ITEM = { ...item };
					delete NEW_ITEM.children;
					if (item.children && !item.hideChildrenInMenu) {
						NEW_ITEM.children = this.getMenuData(item.children, [...parentKeys, item.path]);
					} else {
						this.getMenuData(item.children, selectedKeys ? parentKeys : [...parentKeys, item.path], selectedKeys || item.path);
					}
					MENU.push(NEW_ITEM);
				} else if (!item.hideInMenu && !item.hideChildrenInMenu && item.children) {
					MENU.push(...this.getMenuData(item.children));
				}
			});
			return MENU;
		},
		routerPath(path) {
			this.$router.push({ path: path, query: this.$route.query });
		},
	},
};
</script>
