import moment from 'moment';

export const GOAL_ETH = 9123;

export const START_DATE = moment.utc('2018-02-21 07');

export const PHASE_1_END_DURATION = moment.duration('04:00');
export const PHASE_1_END_DATE = START_DATE.clone().add(PHASE_1_END_DURATION);
