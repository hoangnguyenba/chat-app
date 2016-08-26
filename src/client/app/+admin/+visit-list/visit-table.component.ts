import { Component, Input, ChangeDetectionStrategy, OnChanges } from '@angular/core';

import { FORM_DIRECTIVES } from '@angular/forms';
import { CORE_DIRECTIVES } from '@angular/common';

import { Router } from '@angular/router';

import { PAGINATION_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import { NG_TABLE_DIRECTIVES } from '../../shared/ng2-table/index';

import { TextService } from '../../shared/index';
import { ChatUtilService, ThreadService, SocketService, Thread } from '../../shared/index';

@Component({
    moduleId: module.id,
    selector: 'visit-table',
    templateUrl: 'visit-table.component.html',
    directives: [NG_TABLE_DIRECTIVES, PAGINATION_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VisitTableComponent implements OnChanges {

  public rows:Array<any> = [];
  public columns:Array<{[key: string]: string}> = [
    {title: 'Name', name: 'name', pipe: 'name'},
    {title: 'Status', name: 'status', pipe: 'Status'},
    {title: 'Time', name: 'last_message_time', pipe: 'DatePipe'},
    {title: 'Message', name: 'last_message'}
  ];
  public page:number = 1;
  public itemsPerPage:number = 10;
  public maxSize:number = 5;
  public numPages:number = 1;
  public length:number = 0;

  public config:any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: '', columnName: 'last_message'}
  };

  @Input() data:Array<any>;
  @Input() title:string;

  constructor(
        private textService: TextService,
        private threadsService: ThreadService,
        private chatUtilService: ChatUtilService,
        private socketService: SocketService,
        private router: Router
    ) {
    }

  ngOnChanges() {
    if(this.data !== undefined) {
        this.length = this.data.length;
        this.onChangeTable(this.config);
    }
  }

  public changePage(page:any, data:Array<any> = this.data):Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;

    var returndata = data.slice(start, end);
    return returndata;
  }

  public changeSort(data:any, config:any):any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName:string = void 0;
    let sort:string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '') {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous:any, current:any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data:any, config:any):any {
    if (!config.filtering) {
      return data;
    }
    let filteredData:Array<any> = data.filter((item:any) =>
      item[config.filtering.columnName].match(this.config.filtering.filterString));

    return filteredData;
  }

  public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }
    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }


  public onSelectRow(row: any) {
    this.chatUtilService.isSelectedChat = true;
    this.socketService.markThreadAsRead(new Thread({id: row.id, type: Thread.THREAD_TYPE_SERVE}));
    var sub1 = this.threadsService.threads.subscribe(threads => {

      var foundThread = _.find(threads, t => {return t.id === row.id;});

      if(foundThread !== null) {
          this.threadsService.setCurrentThread(foundThread);
          this.router.navigate(['/chat/' + row.id]);
      }
    });
    sub1.unsubscribe();
  }
}
