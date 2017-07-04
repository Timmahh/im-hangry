import { TestBed, async } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RecommendationsService } from './recommendations.service';
import { QuestionComponent } from './question/question.component';
import { SettingsComponent } from './settings/settings.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        QuestionComponent,
        SettingsComponent,
        RecommendationsComponent
      ],
      providers: [RecommendationsService],
      imports: [HttpModule, FormsModule]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
