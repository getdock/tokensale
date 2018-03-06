import React, { Component } from 'react';
import moment from 'moment';

import Countdown from 'Countdown/Countdown';

import styles from './CheckStatus.module.less';
import commonStyles from 'Components.module.less';

import { PHASE_1_END_DATE } from 'data/constants';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ walletAddress: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ submitting: true, notFound: false, error: null });
    try {
      const response = await fetch(`/api/v1/tokensale/${this.state.walletAddress}`);
      if (response.ok) {
        const { address, max_contribution } = await response.json();
        this.props.onSuccess({
          address,
          maxContribution: max_contribution
        });
      } else {
        if (response.status === 400) {
          this.setState({ notFound: true });
        } else {
          this.setState({ error: response });
        }
      }
    } catch (error) {
      this.setState({ error });
    }
    finally {
      this.setState({ submitting: false });
    }
  }

  render() {
    const { now } = this.props;

    const isPhase1 = now.isBefore(PHASE_1_END_DATE);
    const timeTillPhase1End = moment.duration(PHASE_1_END_DATE.diff(now));

    return (
      <div className={styles.content}>
        <h1>First, we need to check you’re on the whitelist</h1>
        <form onSubmit={this.handleSubmit} className={styles.form}>
          <label>Confirm Your Ethereum Wallet Address</label>
          {
            this.state.notFound ?
            <p className={commonStyles.textDanger}>We can’t find that address in our whitelist</p> :
            ''
          }
          {
            this.state.error ?
            <p className={commonStyles.textDanger}>Unknown error occured. Please try again</p> :
            ''
          }
          <input
            name="ethAddress"
            type="text"
            placeholder="0x0000000000000000000000000000000000000000"
            onChange={this.handleChange}
            required
            pattern="^(0x)?[0-9a-fA-F]{40}$"
          />
          <small className={commonStyles.textSystem}>
            <p>This can be found in the whitelist confirmation email that was recently sent to you</p>
          </small>
          <button
            className={styles.submit}
            type="submit">
            {this.state.submitting ? '...' : 'Confirm'}
          </button>
        </form>

        { isPhase1 && (
          <div className={styles.countdown}>
            Time left until individual cap is lifted
            <Countdown value={timeTillPhase1End} />
            <small className={commonStyles.textSystem}>
              <p>Max contribution: 1 ETH</p>
            </small>
          </div>
        )}

      </div>
    );
  }
}
