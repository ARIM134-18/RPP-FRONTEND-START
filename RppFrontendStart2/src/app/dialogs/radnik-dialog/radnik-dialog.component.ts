import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Obrazovanje } from 'src/app/model/obrazovanje';
import { ObrazovanjeService } from 'src/app/services/obrazovanje.service';
import { Sektor } from 'src/app/model/sektor';
import { Radnik } from 'src/app/model/radnik';
import { RadnikService } from 'src/app/services/radnik.service';
import { SektorService } from 'src/app/services/sektor.service';

@Component({
  selector: 'app-radnik-dialog',
  templateUrl: './radnik-dialog.component.html',
  styleUrls: ['./radnik-dialog.component.css']
})
export class RadnikDialogComponent implements OnInit {

  public flag: number;
  obrazovanja: Obrazovanje[];
  sektori: Sektor[];
  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<RadnikDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Radnik,
    public radnikService: RadnikService,
    public obrazovanjeService: ObrazovanjeService,
    public sektorService: SektorService) { }

  ngOnInit() {
    this.obrazovanjeService.getAllObrazovanje().subscribe(obrazovanja =>
      this.obrazovanja = obrazovanja);
    this.sektorService.getAllSektor().subscribe(sektori =>
        this.sektori = sektori);
  }

  compareTo(a, b) {
    return a.id = b.id;
  }

  onChange(obrazovanje:Obrazovanje,sektor:Sektor) {
    this.data.obrazovanje = obrazovanje;
    this.data.sektor = sektor;
  }

  public add(): void {
    this.data.id = -1;
    this.radnikService.addRadnik(this.data);
    this.snackBar.open("Uspešno dodat radnik: " + this.data.ime+" "+this.data.prezime, "U redu", {
      duration: 2500,
    });
  }

  public update(): void {
    this.radnikService.updateRadnik(this.data);
    this.snackBar.open("Uspešno modifikovan radnik: " + this.data.id, "U redu", {
      duration: 2000,
    });
  }

  public delete(): void {
    this.radnikService.deleteRadnik(this.data.id);
    this.snackBar.open("Uspešno obrisan radnik: " + this.data.id, "U redu", {
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
