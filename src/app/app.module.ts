import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { RecommendationsService } from './recommendations.service';
import { QuestionComponent } from './question/question.component';
import { SettingsComponent } from './settings/settings.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    SettingsComponent,
    RecommendationsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [RecommendationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
