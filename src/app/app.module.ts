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
    cashflowChartComponent
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

    Ng2GoogleChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
