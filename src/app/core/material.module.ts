import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule, MatChipsModule, MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatListModule,
  MatPaginatorModule, MatProgressSpinnerModule, MatSidenavModule,
  MatSortModule,
  MatTableModule, MatToolbarModule
} from '@angular/material';
import {NgModule} from '@angular/core';
import {LayoutModule} from '@angular/cdk/layout';

@NgModule({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatChipsModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatChipsModule
  ],
})
export class MaterialModules { }
