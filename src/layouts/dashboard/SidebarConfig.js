// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/app/dashboard',
    icon: getIcon('eva:pie-chart-2-fill')
  },
  {
    title: 'teams',
    path: '/app/teams',
    icon: getIcon('eva:people-fill'),
    children: [
      { title: 'teams', path: '/app/teams', icon: getIcon('eva:people-fill') },
      { title: 'viewteam', path: '/app/teams/view', icon: getIcon('eva:people-fill') },
      { title: 'editteam', path: '/app/teams/edit', icon: getIcon('eva:people-fill') },
      { title: 'Addteam', path: '/app/teams/add', icon: getIcon('eva:people-fill') }
    ]
  },
  {
    title: 'apps',
    path: '/app/apps',
    icon: getIcon('eva:people-fill'),
    children: [
      { title: 'apps', path: '/app/apps', icon: getIcon('eva:people-fill') },
      { title: 'viewapp', path: '/app/apps/view', icon: getIcon('eva:people-fill') },
      { title: 'editapp', path: '/app/apps/edit', icon: getIcon('eva:people-fill') },
      { title: 'addapp', path: '/app/apps/add', icon: getIcon('eva:people-fill') }
    ]
  },
  {
    title: 'user',
    path: '/app/user',
    icon: getIcon('eva:people-fill')
  },
  {
    title: 'product',
    path: '/app/products',
    icon: getIcon('eva:shopping-bag-fill')
  },
  {
    title: 'blog',
    path: '/app/blog',
    icon: getIcon('eva:file-text-fill')
  },
  {
    title: 'login',
    path: '/login',
    icon: getIcon('eva:lock-fill')
  },
  {
    title: 'register',
    path: '/register',
    icon: getIcon('eva:person-add-fill')
  },
  {
    title: 'Not found',
    path: '/404',
    icon: getIcon('eva:alert-triangle-fill')
  }
];

export default sidebarConfig;
