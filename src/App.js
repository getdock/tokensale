import React, { Component } from 'react';
import moment from 'moment';

import {
  GOAL_ETH,
  START_DATE
} from 'data/constants';

import logo from './logo.png';
import warning from './warning.svg';
import styles from './App.module.less';
import commonStyles from 'Components.module.less';

import CheckStatus from './CheckStatus/CheckStatus';
import SaleInfo from './SaleInfo/SaleInfo';
import Countdown from 'Countdown/Countdown';

const LIFECYCLE_STATES = {
  UNSTARTED: 'unstarted',
  STARTED: 'started',
  CLOSED: 'closed',
};

function getLifecycleState() {
  const now = moment();

  if (now.isBefore(START_DATE)) {
    return LIFECYCLE_STATES.UNSTARTED;
  } else {
    return LIFECYCLE_STATES.STARTED;
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lifecycleState: getLifecycleState(),
      now: moment(),
    };

    const walletDataRaw = localStorage.getItem('dock-tokensale-wallet-data');
    if (walletDataRaw) {
      const walletData = JSON.parse(walletDataRaw);
      this.state = {
        ...this.state,
        ...walletData,
      };
    }

    this.handleSuccess = this.handleSuccess.bind(this);
  }

  componentDidMount() {
    this.clockIntervalID = setInterval(
      () => this.updateClock(),
      1000
    );

    this.updateStats();
    this.statsUpdateIntervalID = setInterval(
      () => this.updateStats(),
      30000
    );
  }

  handleSuccess(data) {
    localStorage.setItem('dock-tokensale-wallet-data', JSON.stringify(data));
    this.setState(data);
  }

  async updateStats() {
    const response = await fetch('/api/v1/eth');
    if (response.ok) {
      const { amount, updated_at, last_amount } = await response.json();
      const stats = { amount, updatedAt: updated_at, lastAmount: last_amount };

      if (amount >= GOAL_ETH) {
        clearInterval(this.statsUpdateIntervalID);
        this.setState({
          lifecycleState: LIFECYCLE_STATES.CLOSED,
          stats,
        });
      } else {
        this.setState({ stats });
      }
    }
  }

  updateClock() {
    const { lifecycleState } = this.state;

    if (lifecycleState === LIFECYCLE_STATES.CLOSED) {
      clearInterval(this.clockIntervalID);
      return;
    }

    this.setState({
      lifecycleState: getLifecycleState(),
      now: moment(),
    });
  }

  render() {
    const { address, maxContribution, lifecycleState, stats, now } = this.state;

    const appView = (() => {
      switch (lifecycleState) {
        case LIFECYCLE_STATES.UNSTARTED:
          const timeTillStart = moment.duration(START_DATE.diff(now));
          return (
            <div className={styles.countdown}>
              Time until token sale starts
              <Countdown value={timeTillStart} />
            </div>
          );
        case LIFECYCLE_STATES.CLOSED:
          return <SaleInfo isClosed={true} />;
        default:
          return address ?
          <SaleInfo address={address} maxContribution={maxContribution} stats={stats} now={now} /> :
          <CheckStatus onSuccess={this.handleSuccess} now={now} />;
      }
    })();

    return (
      <div className={styles.app}>
        <header className={styles.header}>
          <div>
            <div className={styles.warning}>
              <img src={warning} className={styles.warningLogo} alt="warning" />
              <div>
                The ONLY official URL for the DOCK Token is <strong>dock.io</strong>. Be careful of similar looking URLs.
                <br className="no-mobile" /> For those participating in the token
                sale, the ONLY URL is <strong>tokensale.dock.io</strong>
              </div>
            </div>
          </div>
          <img src={logo} className={styles.logo} alt="logo" />
          { lifecycleState === LIFECYCLE_STATES.STARTED &&
            <p className={commonStyles.sectionSubtitle}>
              Participate in the DOCK Token Sale
            </p>
          }
        </header>

        {appView}
      </div>
    );
  }
}

export default App;
