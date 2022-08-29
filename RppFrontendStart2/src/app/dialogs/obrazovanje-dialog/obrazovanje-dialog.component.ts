import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Obrazovanje } from 'src/app/model/obrazovanje';
import { ObrazovanjeService } from 'src/app/services/obrazovanje.service';

@Component({
  selector: 'app-obrazovanje-dialog',
  templateUrl: './obrazovanje-dialog.component.html',
  styleUrls: ['./obrazovanje-dialog.component.css']
})
export class ObrazovanjeDialogComponent implements OnInit {

  public flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<ObrazovanjeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Obrazovanje,
              public obrazovanjeService: ObrazovanjeService) { }

  ngOnInit() {
  }

  public add(): void {
    this.data.id = -1;
    this.obrazovanjeService.addObrazovanje(this.data);
    this.snackBar.open("Uspešno dodato obrazovanje: " + this.data.id, "U redu", {
      duration: 2500,
    });
  }

  public update(): void {
    this.obrazovanjeService.updateObrazovanje(this.data);
    this.snackBar.open("Uspešno modifikovano obrazovanje: " + this.data.id, "U redu", {
      duration: 2000,
    });
  }

  public delete(): void {
    this.obrazovanjeService.deleteObrazovanje(this.data.id);
    this.snackBar.open("Uspešno obrisano obrazovanje: " + this.data.id, "U redu", {
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
