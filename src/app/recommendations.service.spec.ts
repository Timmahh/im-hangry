import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { RecommendationsService } from './recommendations.service';

describe('RecommendationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecommendationsService],
      imports: [HttpModule]
    });
  });

  it('should be created', inject([RecommendationsService], (service: RecommendationsService) => {
    expect(service).toBeTruthy();
  }));
});
