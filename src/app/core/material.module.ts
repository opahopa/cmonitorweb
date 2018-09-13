import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule, MatChipsModule, MatDialogModule, MatDividerModule, MatFormFieldModule, MatGridListModule,
  MatIconModule, MatInputModule,
  MatListModule,
  MatPaginatorModule, MatProgressSpinnerModule, MatSidenavModule, MatSnackBarModule,
  MatSortModule,
  MatTableModule, MatTabsModule, MatToolbarModule
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
    MatChipsModule,
    MatDialogModule,
    MatTabsModule,
    MatGridListModule,
    MatSnackBarModule,
    MatDividerModule
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
    MatChipsModule,
    MatDialogModule,
    MatTabsModule,
    MatGridListModule,
    MatSnackBarModule,
    MatDividerModule
  ],
})
export class MaterialModules { }
