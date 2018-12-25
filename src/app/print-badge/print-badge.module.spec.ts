import { PrintBadgeModule } from './print-badge.module';

describe('PrintBadgeModule', () => {
  let printBadgeModule: PrintBadgeModule;

  beforeEach(() => {
    printBadgeModule = new PrintBadgeModule();
  });

  it('should create an instance', () => {
    expect(printBadgeModule).toBeTruthy();
  });
});
