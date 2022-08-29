import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Sektor } from 'src/app/model/sektor';
import { Preduzece } from 'src/app/model/preduzece';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SektorService } from 'src/app/services/sektor.service';

@Component({
  selector: 'app-sektor',
  templateUrl: './sektor-dialog.component.html',
  styleUrls: ['./sektor-dialog.component.css']
})
export class SektorDialogComponent implements OnInit {

  displayedColumns = ['id', 'naziv', 'oznaka','preduzece', 'actions'];
  dataSource: MatTableDataSource<Sektor>;

  @Input() selektovanoPreduzece: Preduzece;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public sektorService: SektorService,
              public dialog: MatDialog) { }

  ngOnInit() {

  }

  ngOnChanges() {
    if (this.selektovanoPreduzece.id) {
      this.loadData();//
    }
  }

  public loadData() {
    this.sektorService.getSektorZaPreduzece(this.selektovanoPreduzece.id)
  .subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      //pretraga po nazivu ugnježdenog objekta
      this.dataSource.filterPredicate = (data, filter: string) => {
        const accumulator = (currentTerm, key) => {
          return key === 'preduzece' ? currentTerm + data.preduzece.naziv : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

        //sortiranje po nazivu ugnježdenog objekta
        this.dataSource.sortingDataAccessor = (data, property) => {
        switch(property) {
          case 'id': return data[property];

          default: return data.naziv.toLocaleLowerCase();
        }
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

  public openDialog(flag: number, id: number, naziv: string, oznaka: string,preduzece:Preduzece) {
    const dialogRef = this.dialog.open(SektorDialogComponent, {
      data: {
        i: id, id: id, naziv: naziv, oznaka: oznaka,preduzece:preduzece
      }
    });
    dialogRef.componentInstance.flag = flag;
    if (flag == 1)
      dialogRef.componentInstance.data.preduzece = this.selektovanoPreduzece;

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1)
        this.loadData();
    });
  }

  applyFilter(filterValue: string){
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }



}
