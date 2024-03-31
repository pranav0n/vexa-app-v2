// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
  CLIENT_AUTH: '/users/auth',
};

// ----------------------------------------------------------------------

export const paths = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/error/403',
  page404: '/error/404',
  page500: '/error/500',
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  components: '/components',
  docs: 'https://docs.minimals.cc',
  changelog: 'https://docs.minimals.cc/changelog',
  zoneUI: 'https://mui.com/store/items/zone-landing-page/',
  freeUI: 'https://mui.com/store/items/minimal-dashboard-free/',
  figma:
    'https://www.figma.com/file/hjxMnGUJCjY7pX8lQbS7kn/%5BPreview%5D-Minimal-Web.v5.4.0?type=design&node-id=0-1&mode=design&t=2fxnS70DuiTLGzND-0',
  product: {
    root: `/product`,
    checkout: `/product/checkout`,
    details: (id: string) => `/product/${id}`,
  },
  // post: {
  //   root: `/post`,
  //   details: (title: string) => `/post/${paramCase(title)}`,
  //   demo: {
  //     details: `/post/${paramCase(MOCK_TITLE)}`,
  //   },
  // },

  // AUTH
  auth: {
    supabase: {
      login: `${ROOTS.AUTH}/supabase/login`,
      verify: `${ROOTS.AUTH}/supabase/verify`,
      register: `${ROOTS.AUTH}/supabase/register`,
      newPassword: `${ROOTS.AUTH}/supabase/new-password`,
      forgotPassword: `${ROOTS.AUTH}/supabase/forgot-password`,
      guideProfile: `${ROOTS.AUTH}/supabase/guide-profile`,
      callback: `${ROOTS.AUTH}/supabase/callback`,
    },
  },

  //CLIENT AUTH
  users_auth: {
    supabase: {
      login: `${ROOTS.CLIENT_AUTH}/supabase/login`,
      verify: `${ROOTS.CLIENT_AUTH}/supabase/verify`,
      register: `${ROOTS.CLIENT_AUTH}/supabase/register`,
      newPassword: `${ROOTS.CLIENT_AUTH}/supabase/new-password`,
      forgotPassword: `${ROOTS.CLIENT_AUTH}/supabase/forgot-password`,
      callback: `${ROOTS.CLIENT_AUTH}/supabase/callback`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    one: `${ROOTS.DASHBOARD}/one`,
    two: `${ROOTS.DASHBOARD}/two`,
    three: `${ROOTS.DASHBOARD}/three`,
    user: {
      root: `${ROOTS.DASHBOARD}/user`,
      new: `${ROOTS.DASHBOARD}/user/new`,
      list: `${ROOTS.DASHBOARD}/user/list`,
      cards: `${ROOTS.DASHBOARD}/user/cards`,
      profile: `${ROOTS.DASHBOARD}/user/profile`,
      account: `${ROOTS.DASHBOARD}/user/account`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/user/${id}/edit`,
    },
    group: {
      root: `${ROOTS.DASHBOARD}/group`,
      five: `${ROOTS.DASHBOARD}/group/five`,
      six: `${ROOTS.DASHBOARD}/group/six`,
    },
  },
};
