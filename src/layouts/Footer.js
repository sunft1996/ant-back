/*
 * @Descripttion: 
 * @Author: sunft
 * @Date: 2019-12-18 16:59:46
 * @LastEditTime: 2020-05-25 13:48:42
 */
import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={
        [
          // {
          //   key: 'Pro 首页',
          //   title: 'Pro 首页',
          //   href: 'https://pro.ant.design',
          //   blankTarget: true,
          // },
          {
            key: 'github',
            title: '前往github',
            href: 'https://github.com/sunft1996/ant-back/',
            blankTarget: true,
          },
          // {
          //   key: 'Ant Design',
          //   title: 'Ant Design',
          //   href: 'https://ant.design',
          //   blankTarget: true,
          // },
        ]
      }
      // copyright={
      //   <Fragment>
      //     Copyright <Icon type="copyright" /> sunft1996
      //   </Fragment>
      // }
    />
  </Footer>
);
export default FooterView;
