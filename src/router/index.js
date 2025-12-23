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
          },
          {
            path: 'edit',
            component: () => import('@/views/project/edit.vue')
          },
          {
            path: 'edit/:id',
            component: () => import('@/views/project/edit.vue')
          }
        ]
      },

      // 科研人员
      {
        path: 'researcher',
        children: [
          {
            path: '',
            component: () => import('@/views/researcher/index.vue')
          },
          {
            path: 'edit',
            component: () => import('@/views/researcher/edit.vue')
          },
          {
            path: 'edit/:id',
            component: () => import('@/views/researcher/edit.vue')
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
          {
            path: 'edit',
            component: () => import('@/views/paper/edit.vue')
          },
          {
            path: 'edit/:id',
            component: () => import('@/views/paper/edit.vue')
          }
        ]
      },

      // 著作
      {
        path: 'book',
        children: [
          {
            path: '',
            component: () => import('@/views/book/index.vue')
          },
          {
            path: 'edit',
            component: () => import('@/views/book/edit.vue')
          },
          {
            path: 'edit/:id',
            component: () => import('@/views/book/edit.vue')
          }
        ]
      },

      // 获奖
      {
        path: 'award',
        children: [
          {
            path: '',
            component: () => import('@/views/award/index.vue')
          },
          {
            path: 'edit',
            component: () => import('@/views/award/edit.vue')
          },
          {
            path: 'edit/:id',
            component: () => import('@/views/award/edit.vue')
          }
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
