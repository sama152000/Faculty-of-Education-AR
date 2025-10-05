/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProgramsPageService } from './programs-page.service';

describe('Service: ProgramsPage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProgramsPageService]
    });
  });

  it('should ...', inject([ProgramsPageService], (service: ProgramsPageService) => {
    expect(service).toBeTruthy();
  }));
});
