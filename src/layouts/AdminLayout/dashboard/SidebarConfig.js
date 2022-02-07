import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import cubeFill from '@iconify/icons-eva/cube-fill';
import mapFill from '@iconify/icons-eva/map-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/admin/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'users',
    path: '/admin/dashboard/user',
    icon: getIcon(peopleFill)
  },
  {
    title: 'server rooms',
    path: '/admin/dashboard/room',
    icon: getIcon(cubeFill)
  },
  {
    title: 'template maps',
    path: '/admin/dashboard/maps',
    icon: getIcon(mapFill)
  },
  {
    title: 'product',
    path: '/admin/dashboard/products',
    icon: getIcon(shoppingBagFill)
  },
  {
    title: 'blog',
    path: '/admin/dashboard/blog',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'login',
    path: '/admin/login',
    icon: getIcon(lockFill)
  },
  {
    title: 'register',
    path: '/admin/register',
    icon: getIcon(personAddFill)
  },
  {
    title: 'Not found',
    path: '/admin/404',
    icon: getIcon(alertTriangleFill)
  }
];

export default sidebarConfig;
