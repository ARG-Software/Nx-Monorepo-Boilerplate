import * as Icons from '@/components/Icons/Icons';

export const Data = {
  navibar: [
    {
      name: 'users',
      path: '/users',
    },
    {
      name: 'about',
      path: '/about',
    },
  ],
  LeftNavigationIcon: [
    {
      icon: <Icons.Strategy fill='#FF00B2' />,
    },
    {
      icon: <Icons.Star fill='#FF00B2' />,
    },
    {
      icon: <Icons.OrderHistory fill='#FF00B2' />,
    },
    {
      icon: <Icons.PluginAPi fill='#00FF17' />,
    },
    {
      icon: <Icons.Overviews fill='#FF00B2' />,
    },
  ],
  usersPage: {
    columnData: [
      {
        type: 'name',
      },
      {
        type: 'email',
      },
      {
        type: 'created at',
      },
    ],

  },
};
