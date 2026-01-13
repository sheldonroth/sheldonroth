import * as migration_20260113_163835 from './20260113_163835';
import * as migration_20260113_164638 from './20260113_164638';
import * as migration_20260113_180000 from './20260113_180000';

export const migrations = [
  {
    up: migration_20260113_163835.up,
    down: migration_20260113_163835.down,
    name: '20260113_163835',
  },
  {
    up: migration_20260113_164638.up,
    down: migration_20260113_164638.down,
    name: '20260113_164638'
  },
  {
    up: migration_20260113_180000.up,
    down: migration_20260113_180000.down,
    name: '20260113_180000'
  },
];
