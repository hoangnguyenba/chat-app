import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CORE_DIRECTIVES, NgClass, DatePipe} from '@angular/common';
import {NgTableSortingDirective} from './ng-table-sorting.directive';

@Component({
  selector: 'ng-table',
  template: `
    <table class="table table-bordered table-hover">
      <thead>
      <tr role="row">
        <th *ngFor="let column of columns" [ngTableSorting]="config" [column]="column" (sortChanged)="onChangeTable($event)">
          {{column.title}}
          <i *ngIf="config && column.sort" class="pull-right fa"
            [ngClass]="{'fa-chevron-down': column.sort === 'desc', 'fa-chevron-up': column.sort === 'asc'}"></i>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor="let row of rows" (click)="onSelectRow(row)">
        <td *ngFor="let column of columns" [innerHTML]="getData(row, column.name, column.pipe)"></td>
      </tr>
      </tbody>
    </table>
`,
  directives: [NgTableSortingDirective, NgClass, CORE_DIRECTIVES]
})
export class NgTableComponent {
  // Table values
  @Input() public rows:Array<any> = [];
  @Input() public config:any = {};

  // Outputs (Events)
  @Output() public tableChanged:EventEmitter<any> = new EventEmitter();
  @Output() public selectedRow:EventEmitter<any> = new EventEmitter();

  @Input()
  public set columns(values:Array<any>) {
    values.forEach((value:any) => {
      let column = this._columns.find((col:any) => col.name === value.name);
      if (column) {
        Object.assign(column, value);
      }
      if (!column) {
        this._columns.push(value);
      }
    });
  }

  public get columns():Array<any> {
    return this._columns;
  }

  public get configColumns():any {
    let sortColumns:Array<any> = [];

    this.columns.forEach((column:any) => {
      if (column.sort) {
        sortColumns.push(column);
      }
    });

    return {columns: sortColumns};
  }

  private _columns:Array<any> = [];

  public onChangeTable(column:any):void {
    this._columns.forEach((col:any) => {
      if (col.name !== column.name && col.sort !== false) {
        col.sort = '';
      }
    });
    this.tableChanged.emit({sorting: this.configColumns});
  }

  public getData(row:any, propertyName:string, pipe: string):string {
    var temp = propertyName.split('.').reduce((prev:any, curr:string) => prev[curr], row);

    if (pipe === 'DatePipe') {
      var datePipe = new DatePipe();
      temp = datePipe.transform(temp, 'y-M-d H:m:s');
    } else if (pipe === 'Status') {
      if (temp === 1) {
        temp = 'Online';
      } else {
        temp = 'Offline';
      }
    } else if(pipe === 'name') {
        if(row.hasOwnProperty('unread_message') && row.unread_message !== 0) {
          temp = temp + '<small class="label pull-right bg-red">' + row.unread_message + '</small>';
        }
    }
    return temp;
  }

  public onSelectRow(row:any):void {
    this.selectedRow.emit(row);
  }
}
