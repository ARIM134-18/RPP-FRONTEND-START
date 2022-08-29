import { Component, OnInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PreduzeceDialogComponent } from '../dialogs/preduzece-dialog/preduzece-dialog.component';
import { Preduzece } from '../model/preduzece';
import { PreduzeceService } from '../services/preduzece.service';

@Component({
  selector: 'app-preduzece',
  templateUrl: './preduzece.component.html',
  styleUrls: ['./preduzece.component.css']
})
export class PreduzeceComponent implements OnInit {

  displayedColumns = ['id', 'naziv', 'opis', 'pib', 'sediste', 'actions'];
  dataSource: MatTableDataSource<Preduzece>;

  selektovanoPreduzece: Preduzece;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public httpClient: HttpClient, public dialog: MatDialog, public obrazovanjeService: PreduzeceService) {
  }
  ngOnInit() {
    this.loadData();
  }

  public loadData() {

    this.obrazovanjeService.getAllPreduzece().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);


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

  public openDialog(flag: number, id: number, naziv: string, opis: string, pib: number, sediste: string) {
    const dialogRef = this.dialog.open(PreduzeceDialogComponent,
      {
        data: { id, naziv, opis, pib, sediste }
      });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
// tslint:disable-next-line: triple-equals
      if (result == 1) {
        this.loadData();
      }
    });
  }

  selectRow(row){
    this.selektovanoPreduzece = row;
  }

  applyFilter(filterValue: string){
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }
}

