/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NewsEventService } from './news-event.service';

describe('Service: NewsEvent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewsEventService]
    });
  });

  it('should ...', inject([NewsEventService], (service: NewsEventService) => {
    expect(service).toBeTruthy();
  }));
});
