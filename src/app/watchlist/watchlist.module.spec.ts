import { WatchlistModule } from './watchlist.module';

describe('WatchlistModule', () => {
  let watchlistModule: WatchlistModule;

  beforeEach(() => {
    watchlistModule = new WatchlistModule();
  });

  it('should create an instance', () => {
    expect(watchlistModule).toBeTruthy();
  });
});
