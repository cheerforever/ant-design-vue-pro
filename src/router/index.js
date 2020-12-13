// import { render } from "less";
/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import Notfound from '../views/404.vue'

Vue.use(VueRouter)

const routes = [{
		path: '/user',
		hideInMenu: true,
		component: () =>
			import(
				/* webpackChunkName: "layout" */
				'../views/layouts/UserLayout.vue'
			),
		children: [{
				path: '/user',
				redirect: '/user/login'
			},
			{
				path: '/user/login',
				name: 'login',
				component: () =>
					import(
						/* webpackChunkName: "user" */
						'../views/User/Login.vue'
					)
			},
			{
				path: '/user/register',
				name: 'register',
				component: () =>
					import(
						/* webpackChunkName: "user" */
						'../views/User/Register.vue'
					)
			}
		]
	},
	{
		path: '/',
		component: () =>
			import(
				/* webpackChunkName: "layout" */
				'../views/layouts/BasicLayout.vue'
			),
		children: [
			//dashbord
			{
				path: '/',
				redirect: '/dashbord/analysis'
			},
			{
				path: '/dashbord',
				name: 'dashbord',
				meta: {icon: "dashboard", title: "仪表盘"},
				component: {
					render: h => h("router-view")
				},
				children: [{
					path: '/dashbord/analysis',
					meta: {title: "分析页面"},
					name: 'analysis',
					component: () =>
						import(
							/* webpackChunkName: "dashbord" */
							'../views/Dashbord/Analysis.vue'
						)
				}]
			},
			//form
			{
				path: '/form',
				name: 'form',
				meta: {icon: "form", title: "表单"},
				component: {
					render: h => h('router-view')
				},
				children: [{
						path: '/form/basic-form',
						name: 'basicform',
						meta: {title: "基础表单"},
						component: () =>
							import(
								/* webpackChunkName: "form" */
								'../views/Forms/BasicForm.vue'
							)
					},
					{
						path: '/form/step-form',
						name: 'stepform',
						meta: {title: "分布表单"},
						hideChildrenInMenu: true,
						component: () =>
							import(
								/* webpackChunkName: "form" */
								'../views/Forms/StepForm'
							),
						children: [{
								path: '/form/step-form-info',
								name: 'info',
								component: () =>
									import(
										/* webpackChunkName: "form" */
										'../views/Forms/StepForm/StepFormInfo.vue'
									)
							},
							{
								path: '/form/step-form-confirm',
								name: 'confirm',
								component: () =>
									import(
										/* webpackChunkName: "form" */
										'../views/Forms/StepForm/StepFormConfirm.vue'
									)
							},
							{
								path: '/form/step-form-result',
								name: 'result',
								component: () =>
									import(
										/* webpackChunkName: "form" */
										'../views/Forms/StepForm/StepFormResult.vue'
									)
							}
						]
					}
				]
			}
		]
	},
	{
		path: '*',
		name: '404',
		hideInMenu: true,
		component: Notfound
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

// to 将要跳转的路由
// from 当前路由
// next 必须调用next之后 实现跳转
router.beforeEach((to, from, next) => {
	if(to.path !== from.path){
		Nprogress.start();
	}
	next();
})

router.afterEach(() => {
	Nprogress.done();
})

export default router