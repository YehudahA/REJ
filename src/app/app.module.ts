// angular
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule }   from '@angular/forms';
import { NgModule } from '@angular/core';

// material
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';

// other ligs
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

// app
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InversionComponent } from './inversion/inversion.component';
import { ThousandsDirective } from './directives/thousands.directive';
import { PercentageValueAccessor } from './misc/percentage-value-accessor';
import { AbsPipe } from './misc/abs.pipe';
import { FileReaderComponent } from './file-reader/file-reader.component';
import { IntegerValueAccessor } from './misc/integer-value-accessor';

@NgModule({
  declarations: [
    AppComponent,
    InversionComponent,
    ThousandsDirective,
    PercentageValueAccessor,
    IntegerValueAccessor,
    AbsPipe,
    FileReaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    Ng2GoogleChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
