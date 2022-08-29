import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Preduzece } from '../model/preduzece';
import { Sektor } from '../model/sektor';
import { SektorService } from '../services/sektor.service';

@Component({
  selector: 'app-sektor',
  templateUrl: './sektor.component.html',
  styleUrls: ['./sektor.component.css']
})

export class SektorComponent implements OnInit {

  displayedColumns = ['id', 'naziv', 'oznaka','preduzece', 'actions'];
  dataSource: MatTableDataSource<Sektor> | undefined;

  @Input()
  selektovanoPreduzece: Preduzece = new Preduzece;

  @ViewChild(MatPaginator)
  paginator: MatPaginator = new MatPaginator(5,2,5);
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

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
