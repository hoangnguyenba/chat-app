import { Component, OnInit } from '@angular/core';
import { ContentHeaderService } from '../shared/index';

import { FORM_DIRECTIVES } from '@angular/forms';
import { CORE_DIRECTIVES } from '@angular/common';
import { PAGINATION_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import { NG_TABLE_DIRECTIVES } from '../../shared/ng2-table/index';

import { Observable } from 'rxjs/Observable';

import { TextService } from '../../shared/index';
import { HistoryService } from './history.service';
import { Thread, User, ChatUtilService } from '../../shared/index';

import { ListMessageComponent } from '../+chat/+chat-window/index';

@Component({
    moduleId: module.id,
    selector: 'history',
    templateUrl: 'history.component.html',
    directives: [NG_TABLE_DIRECTIVES, PAGINATION_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, ListMessageComponent],
    providers: [HistoryService]
})
export class HistoryComponent implements OnInit {

  public rows:Array<any> = [];
  public columns:Array<any> = [
    {title: 'Name', name: 'name'},
    {title: 'Time', name: 'last_message_time'},
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

  private data:Array<any>;

  private messages: Observable<any>;

  private isSelectedRow = false;

  constructor(
        private contentHeaderService: ContentHeaderService,
        private textService: TextService,
        private historyService: HistoryService,
        private chatUtilService: ChatUtilService
    ) {
    }

  ngOnInit() {
      this.contentHeaderService.title = this.textService.get('history');
      this.historyService.getRecentUsers().subscribe(data => {
        this.data = data.Items;
        this.length = this.data.length;
        this.onChangeTable(this.config);
      });
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
    this.isSelectedRow = true;
    this.historyService.getHistoryThread(row.id).subscribe(data => {
      this.messages = data.Items.map((m: any) => {
        return this.chatUtilService.convertMessageFromServer(
          m,
          new Thread({id: row.id}),
          new User({id: row.id}));
      });
    });

  }
}
