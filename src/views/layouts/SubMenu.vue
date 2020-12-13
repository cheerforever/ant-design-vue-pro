<template>
	<a-sub-menu :key="menuInfo.path" v-bind="$props" v-on="$listeners">
		<span slot="title">
			<a-icon v-if="menuInfo.meta.icon" :type="menuInfo.meta.icon" />
			<span>{{ menuInfo.meta.title }}</span>
		</span>
		<template v-for="item in menuInfo.children">
			<a-menu-item v-if="!item.children" :key="item.path" @click="routerPath(item.path)">
				<a-icon v-if="item.meta.icon" :type="item.meta.icon" />
				<span>{{ item.meta.title }}</span>
			</a-menu-item>
			<sub-menu v-else :key="item.path" :menu-info="item" />
		</template>
	</a-sub-menu>
</template>
<script>
import { Menu, Icon } from 'ant-design-vue';
export default {
	name: 'SubMenu',
	// must add isSubMenu: true
	isSubMenu: true, // $props.isSubMenu
	props: {
		...Menu.SubMenu.props, //
		// Cannot overlap with properties within Menu.SubMenu.props
		menuInfo: {
			type: Object,
			default: () => {},
		},
		selectedKeys: {
			type: Array,
			default: () => [],
		},
	},
	components: {
		// 'a-menu': Menu,
		'a-sub-menu': Menu.SubMenu,
		'a-menu-item': Menu.Item,
		'a-icon': Icon,
	},
	methods: {
		// 点击子菜单标题
		changeMenu(menu) {
			// console.log('展开menu===',menu)
			// console.log('selectedKeys===',this.selectedKeys)
			this.$emit('titleClick', menu);
		},
		tick(id) {
			console.log('$listeners===', this.$listeners);
			console.log('$attrs===', this.$attrs);
			console.log('$props===', this.$props);

			// console.log('最后一层id===',id)
			this.$emit('itemTick', id);
		},
		routerPath(path) {
			this.$router.push({ path: path, query: this.$route.query });
		},
	},
};
</script>
