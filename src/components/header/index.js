/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import styles from './index.less';


class Header extends React.Component {
  render() {
    return (
      <div className={styles.nav}>
        <div className={styles.left}>
          <div><a href="/"><img src="img/logo.png" alt="耀眼" className={styles.logo}/></a></div>
        </div>
      </div>
    );
  }
}

export default Header;
