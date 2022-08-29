import { Component, OnInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Obrazovanje } from '../model/obrazovanje';
import { ObrazovanjeDialogComponent } from '../dialogs/obrazovanje-dialog/obrazovanje-dialog.component';
import { ObrazovanjeService } from '../services/obrazovanje.service';

@Component({
  selector: 'app-obrazovanje', //preko ovoga mozemo da je ugnjezdimo u neku drugu komponentu (u okviru HTML-a komponente u koju zelimo da je ugnjezdimo)
  templateUrl: './obrazovanje.component.html',
  styleUrls: ['./obrazovanje.component.css']
})
export class ObrazovanjeComponent implements OnInit {

  displayedColumns = ['id', 'naziv', 'opis', 'stepenStrucneSpreme', 'actions'];
  dataSource: MatTableDataSource<Obrazovanje>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public httpClient: HttpClient, public dialog: MatDialog, public obrazovanjeService: ObrazovanjeService) {
  }
  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.obrazovanjeService.getAllObrazovanje().subscribe(data=>{
      this.dataSource =new MatTableDataSource(data);
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          case 'id': return data[property];
          default: return data[property].toLocaleLowerCase();
        }
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });  }

  public openDialog(flag: number, id: number, naziv: string, opis: string, stepenStrucneSpreme: string) {
    const dialogRef = this.dialog.open(ObrazovanjeDialogComponent,
      {
        data: { id, naziv, opis, stepenStrucneSpreme }
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

