// angular
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule }   from '@angular/forms';
import { NgModule } from '@angular/core';

// material
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';

// other ligs
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

// app
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InversionComponent } from './inversion/inversion.component';
import { ThousandsDirective } from './directives/thousands.directive';
import { PercentageValueAccessor } from './misc/percentage-value-accessor';
import { AbsPipe } from './misc/abs.pipe';
import { IntegerValueAccessor } from './misc/integer-value-accessor';
import { MenuComponent } from './menu/menu.component';
import { PrintInversionComponent } from './print/print-inversion/print-inversion.component';
import { ValueBoxComponent } from './print/value-box/value-box.component';
import { cashflowChartComponent } from './cashflow-chart/cashflow-chart.component';
import { ImageFormComponent } from './image-form/image-form.component';
import { ScreenAppComponent } from './screen-app/screen-app.component';
import { PrintAppComponent } from './print/print-app/print-app.component';
import { ImageListComponent } from './image-list/image-list.component';
import { SaveDialogComponent } from './save-dialog/save-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    InversionComponent,
    ThousandsDirective,
    PercentageValueAccessor,
    IntegerValueAccessor,
    AbsPipe,
    MenuComponent,
    PrintInversionComponent,
    ValueBoxComponent,
    cashflowChartComponent,
    ImageFormComponent,
    ScreenAppComponent,
    PrintAppComponent,
    ImageListComponent,
    SaveDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    
    // material
    MatButtonModule,
    MatDividerModule,
    MatExpansionModule,
    MatInputModule,
    MatCardModule,
    MatRadioModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,

    Ng2GoogleChartsModule
  ],
  entryComponents: [SaveDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
