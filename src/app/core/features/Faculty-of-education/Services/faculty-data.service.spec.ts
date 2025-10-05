/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FacultyDataService } from './faculty-data.service';

describe('Service: FacultyData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FacultyDataService]
    });
  });

  it('should ...', inject([FacultyDataService], (service: FacultyDataService) => {
    expect(service).toBeTruthy();
  }));
});
