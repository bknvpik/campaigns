import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CampaignComponent } from './campaign/campaign.component';
import { CampaignFormComponent } from './campaign-form/campaign-form.component';
import { environment } from 'src/environments/environment';
import { CampaignsService } from './campaigns.service';

@NgModule({
  declarations: [
    AppComponent,
    CampaignComponent,
    CampaignFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebase, 'angularfs'),
    AngularFireDatabaseModule
  ],
  providers: [CampaignsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
