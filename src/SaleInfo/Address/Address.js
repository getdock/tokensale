import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import moment from 'moment';

import { PHASE_1_END_DATE } from 'data/constants';

import Countdown from 'Countdown/Countdown';

import styles from './Address.module.less';
import commonStyles from 'Components.module.less';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { isQRShown: false };
  }

  toggleQRCode() {
    this.setState({ isQRShown: !this.state.isQRShown });
  }

  render() {
    const { isQRShown } = this.state;
    const { address, maxContribution, now } = this.props;

    const isPhase1 = now.isBefore(PHASE_1_END_DATE);
    const timeTillPhase1End = moment.duration(PHASE_1_END_DATE.diff(now));

    return (
      <div>
        <section className={styles.root}>
          <div className={commonStyles.content}>
            <div className={styles.form}>
              <label>Send ETH to This Address</label>
              <input
                type="text"
                readOnly
                value={address}
              />
              {isQRShown ?
                <div className={styles.QRFrame}>
                  <QRCode value={address} size={250} level='H' />
                </div> :
                null
              }
              <div className={styles.formBottom}>
                { isPhase1 &&
                  <span className={styles.maxContribution}>
                    Max contribution: {maxContribution} ETH<br />
                    Min contribution: 0.01 ETH<br />
                    <br />
                    Recommended gas<br />
                    Gas limit : 200,000 UNITS<br />
                    Gas price: 6 GWEI<br />
                  </span>
                }
                <a
                  className={styles.toggeQR}
                  onClick={() => this.toggleQRCode()}>
                  {isQRShown ? 'Hide' : 'Show'} QR Code
                </a>
              </div>
            </div>
          </div>
        </section>
        { isPhase1 &&
          <section className={styles.countdownSection}>
            <div className={styles.countdown}>
              Time left until individual cap is lifted
              <Countdown value={timeTillPhase1End} />
            </div>
          </section>
        }
      </div>
    );
  }
};
