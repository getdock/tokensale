import React from 'react';

import commonStyles from 'Components.module.less';

import styles from './Questions.module.less';

export default function() {
  return (
    <section className={styles.root}>
      <div className={commonStyles.content}>
        <h1>Questions</h1>
        <ol>
          <li>
            <h4>When does the token sale end?</h4>
            <p>
              You will have until 11am UTC to contribute a
              maximum of 1 ETH. After 11am UTC, if we haven’t met our funding
              goal, the max contribution cap will be lifted and we will be
              accepting additional contributions until our funding goal is
              reached.
            </p>
          </li>
          <li>
            <h4>How much can I contribute?</h4>
            <p>
              You can send a maximum of 1 ETH Until 11am UTC. After 11am UTC if
              we haven’t met our funding goal we will lift our max cap and you
              can send unlimited funds until we reach our goal.
            </p>
          </li>
          <li>
            <h4>Is there a minimum contribution?</h4>
            <p>Yes, 0.01 ETH.</p>
          </li>
          <li>
            <h4>Can I use a different ETH address than what I entered on the whitelist?</h4>
            <p>
              No. You can only send funds from the approved address you
              submitted during the whitelist process (This can be found in the
              confirmation email that was sent to your email).
            </p>
          </li>
          <li>
            <h4>Do I need to contribute the amount of ETH that I entered on the whitelist?</h4>
            <p>
              No. Until 11am UTC you can send any amount between 0.01 ETH - 1
              ETH. After 11am UTC you can send an unlimited amount until we’ve
              reached our funding goal.
            </p>
          </li>
          <li>
            <h4>What happens if I send more ETH than the maximum amount?</h4>
            <p>
              If you send more than 1 ETH before 11am UTC, any excess funds will be returned to your wallet.
            </p>
          </li>
          <li>
            <h4>Can I send money from an exchange wallet like Coinbase?</h4>
            <p>
              No, do not send money from an exchange wallet. If for any reason
              we need to return funds back to your wallet, funds that were
              originally sent from an exchange wallet will be lost and you will
              not be able to receive the tokens you purchase.
            </p>
          </li>
          <li>
            <h4>When will i receive my tokens?</h4>
            <p>
              Immediately after the token sale ends. Tokens will not be transferable for up to 30 days.
            </p>
          </li>
          <li>
            <h4>How do i know that my contribution was successfully accepted?</h4>
            <p>
              After we receive your contribution a confirmation email of the
              transaction will be sent to the email address provided when you
              joined the whitelist. You can also confirm if the the transaction
              went through from your wallet.
            </p>
          </li>
          <li>
            <h4>What happens if i send funds from a non-whitelisted address?</h4>
            <p>
              Funds from non-approved addresses will be returned to the address they were sent from.
            </p>
          </li>
          <li>
            <h4>Will there be a gas war?</h4>
            <p>
              No. Participants can take their time to send funds during the
              first 4 hours because of individual caps. After the 4 hour window
              it will be first come first serve.
            </p>
          </li>
          <li>
            <h4>How can I trust I am sending to the official dock address?</h4>
            <p>
              Always triple check that you are on the official dock.io URL (The
              official token sale page is tokensale.dock.io).
             </p>
          </li>
        </ol>
      </div>
    </section>
  );
}
