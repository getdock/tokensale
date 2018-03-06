import React from 'react';

import commonStyles from 'Components.module.less';

import styles from './StaticStats.module.less';

export default function({ isClosed }) {
  return (
    <dl className={styles.root}>
      <div>
        <dt>Total Cap</dt>
        <dd>$20m</dd>
      </div>
      <div>
        <dt>Private Presale</dt>
        <dd>$12m</dd>
      </div>
      <div>
        <dt>
          Public Sale&nbsp;
          <i className={commonStyles.textDanger}>{isClosed ? 'Closed' : 'Live'}</i>
        </dt>
        <dd>$8m</dd>
      </div>
      <div>
        <dt>Total Supply</dt>
        <dd>1b DOCK</dd>
      </div>
    </dl>
  );
}
