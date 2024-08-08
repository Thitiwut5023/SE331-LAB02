import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '@/views/EventListView.vue'
import AboutView from '@/views/AboutView.vue'
import EventDetailView from '@/views/event/DetailView.vue'
import EventRegisterView from '@/views/event/RegisterView.vue'
import EventEditView from '@/views/event/EditView.vue'
import StudentListView from '@/views/StudentListView.vue'
import EventLayoutView from '@/views/event/LayoutView.vue'
import NotFoundView from '@/views//NotFoundView.vue'
import NetworkErrorView from '@/views/NetworkErrorView.vue'
import nProgress from 'nprogress'
import EventService from '@/services/EventService'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list-view',
      component: EventListView,
      props: (route) => ({
        page: parseInt(route.query.page?.toString() || '1'),
        size: parseInt(route.query.size?.toString() || '2')
      })
    },
    {
      path: '/event/:id',
      name: 'event-layout-view',
      component: EventLayoutView,
      props: true,
      beforeEnter: (to) => {
        //put API call here
        const id = parseInt(to.params.id as string)
        return EventService.getEvent(id)
        .then ((response) => {
          //need to setup the data for the event
        }).catch((error) => {
          if (error.response && error.response.status === 404) {
            return {
              name: '404-resource-view',
              params: { resoure: 'event' }
            }
          } else {
            return { name: 'network-error-view' }
          }
        })
      },
      children: [
        {
          path: '',
          name: 'event-detail-view',
          component: EventDetailView,
          props: true
        },
        {
          path: 'register',
          name: 'event-register-view',
          component: EventRegisterView,
          props: true
        },
        {
          path: 'edit',
          name: 'event-edit-view',
          component: EventEditView,
          props: true
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/404/:resource',
      name: '404-resource',
      component: NotFoundView ,
      props: true
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    },
    {
      path: '/network-error',
      name: 'network-error-view',
      component: NetworkErrorView ,
      props: true
    },
    {
      path: '/student',
      name: 'student',
      component: StudentListView
    }
  ]
})
router.beforeEach(() => {
  nProgress .start()
})

router.afterEach(() => {
  nProgress.done()
})

export default router
