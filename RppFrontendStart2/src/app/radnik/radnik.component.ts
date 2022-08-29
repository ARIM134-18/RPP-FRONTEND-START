import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Radnik } from '../model/radnik';
import { RadnikService } from '../services/radnik.service';
import { RadnikDialogComponent } from '../dialogs/radnik-dialog/radnik-dialog.component';
import { Obrazovanje } from '../model/obrazovanje';


@Component({
  selector: 'app-radnik',
  templateUrl: './radnik.component.html',
  styleUrls: ['./radnik.component.css']
})
export class RadnikComponent implements OnInit {

  displayedColumns = ['id', 'ime', 'prezime', 'brojLk', 'obrazovanje', 'sektor', 'actions'];
  dataSource: MatTableDataSource<Radnik>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    public radnikService: RadnikService) {
  }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.radnikService.getAllRadnik().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

      this.dataSource.filterPredicate = (data, filter: string) => {
        const accumulator = (currentTerm, key) => {
          return key === 'sektor' ? currentTerm + data.sektor.naziv : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

      this.dataSource.sortingDataAccessor = (data, property) => {
        console.log(property);
        switch (property) {
          case 'id': return data[property];
          case 'brojLk': return data[property];
          case 'sektor': return data.sektor.naziv.toLocaleLowerCase();
          case 'obrazovanje': return data.obrazovanje.naziv.toLocaleLowerCase();
          default: return data[property].toLocaleLowerCase();
        }
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public openDialog(flag: number, id: number, ime: string, prezime: string, brojLk: number, obrazovanje: Obrazovanje, sektor: Sektor) {
    const dialogRef = this.dialog.open(RadnikDialogComponent,
      {
        data: { id, ime, prezime, brojLk, obrazovanje, sektor }
      });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      // tslint:disable-next-line: triple-equals
      if (result == 1) {
        this.loadData();
      }
    });
  }

applyFilter(filterValue: string){
  filterValue = filterValue.trim();
  filterValue = filterValue.toLocaleLowerCase();
  this.dataSource.filter = filterValue;
}

}

