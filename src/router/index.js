import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/login/index.vue'
import Layout from '@/layout/index.vue'

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    redirect: '/project',
    children: [
      // 科研项目
      {
        path: 'project',
        children: [
          {
            path: '',
            component: () => import('@/views/project/index.vue')
          }
        ]
      },

      {
        path: 'researcher',
        children: [
          {
            path: '',
            component: () => import('@/views/researcher/index.vue')
          }
        ]
      },

      // 期刊论文
      {
        path: 'paper',
        children: [
          {
            path: '',
            component: () => import('@/views/paper/index.vue')
          },
        ]
      },

      {
        path: 'book',
        children: [
          {
            path: '',
            component: () => import('@/views/book/index.vue')
          }
        ]
      },
      {
        path: 'award',
        children: [
          {
            path: '',
            component: () => import('@/views/award/index.vue')
          },
        ]
      },

      // 数据字典
      {
        path: 'dictionary',
        children: [
          {
            path: '',
            component: () => import('@/views/dictionary/index.vue')
          },
          {
            path: 'edit',
            component: () => import('@/views/dictionary/edit.vue')
          },
          {
            path: 'edit/:id',
            component: () => import('@/views/dictionary/edit.vue')
          }
        ]
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
