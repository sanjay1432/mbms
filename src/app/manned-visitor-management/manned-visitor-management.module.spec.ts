import { MannedVisitorManagementModule } from './manned-visitor-management.module';

describe('MannedVisitorManagementModule', () => {
  let mannedVisitorManagementModule: MannedVisitorManagementModule;

  beforeEach(() => {
    mannedVisitorManagementModule = new MannedVisitorManagementModule();
  });

  it('should create an instance', () => {
    expect(mannedVisitorManagementModule).toBeTruthy();
  });
});
