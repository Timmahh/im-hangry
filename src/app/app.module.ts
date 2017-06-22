import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { RecommendationsService } from './recommendations.service';
import { FuckThisComponent } from './fuck-this/fuck-this.component';
import { QuestionComponent } from './question/question.component';
import { SuggestionsComponent } from './suggestions/suggestions.component';

@NgModule({
  declarations: [
    AppComponent,
    FuckThisComponent,
    QuestionComponent,
    SuggestionsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [RecommendationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
