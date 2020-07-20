import { Environment, Network, RecordSource, Store } from 'relay-runtime';

import fetchGraphql from './fetch';
import { relayTransactionLogger } from './relayUtils';

const __DEV__ = process.env.NODE_ENV === 'development';

export default new Environment({
  network: Network.create(fetchGraphql),
  store: new Store(new RecordSource()),
  log: __DEV__ ? relayTransactionLogger : null,
});
