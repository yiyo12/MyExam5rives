import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FormComponent } from './components/form/form.component';
import { ListPersonasComponent } from './components/list-personas/list-personas.component';
import { PersonasService } from "./services/personas.service";
import { SearchByNamePipe } from './pipes/search-by-name.pipe';
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FormComponent,
    ListPersonasComponent,
    SearchByNamePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [PersonasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
