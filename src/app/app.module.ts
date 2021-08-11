import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CampaignComponent } from './campaign/campaign.component';
import { CreateFormComponent } from './create-form/create-form.component';
import { CampaignDetailComponent } from './campaign-detail/campaign-detail.component';
import { environment } from 'src/environments/environment';
import { CampaignsService } from './campaigns.service';

@NgModule({
  declarations: [
    AppComponent,
    CampaignComponent,
    CreateFormComponent,
    CampaignDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'angularfs'),
    AngularFireDatabaseModule
  ],
  providers: [CampaignsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
