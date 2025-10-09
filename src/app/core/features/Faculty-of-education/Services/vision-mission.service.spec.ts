/* tslint:disable:no-unused-variable */

import { TestBed,waitForAsync, inject } from '@angular/core/testing';
import { VisionMissionService } from './vision-mission.service';

describe('Service: VisionMission', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VisionMissionService]
    });
  });

  it('should ...', inject([VisionMissionService], (service: VisionMissionService) => {
    expect(service).toBeTruthy();
  }));
});
