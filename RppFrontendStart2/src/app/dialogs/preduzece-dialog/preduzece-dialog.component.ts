import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Preduzece } from 'src/app/model/preduzece';
import { PreduzeceService } from 'src/app/services/preduzece.service';

@Component({
  selector: 'app-preduzece-dialog',
  templateUrl: './preduzece-dialog.component.html',
  styleUrls: ['./preduzece-dialog.component.css']
})
export class PreduzeceDialogComponent implements OnInit {

  public flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<PreduzeceDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Preduzece,
              public preduzeceService: PreduzeceService) { }

  ngOnInit() {
  }

  public add(): void {
    this.data.id = -1;
    this.preduzeceService.addPreduzece(this.data);
    this.snackBar.open("Uspešno dodato preduzeće: " + this.data.id, "U redu", {
      duration: 2500,
    });
  }

  public update(): void {
    this.preduzeceService.updatePreduzece(this.data);
    this.snackBar.open("Uspešno modifikovano preduzeće: " + this.data.id, "U redu", {
      duration: 2000,
    });
  }

  public delete(): void {
    this.preduzeceService.deletePreduzece(this.data.id);
    this.snackBar.open("Uspešno obrisano preduzeće: " + this.data.id, "U redu", {
      duration: 2000,
    });
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open("Odustali ste", "U redu", {
      duration: 1000,
    });
  }

}
