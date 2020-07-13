import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { DashboardService } from './../../dashboard.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiService } from '@core/api/api.service';
import { Timestamp } from 'rxjs';
import { SpinnerService } from '@app/shared/services/spinner.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { NotificationService } from '@app/shared/services/notification.service';
import { MatAccordion } from '@angular/material/expansion';

export interface Organization {
  id: number;
  name: string;
  event_type: string;
  info: string;
  completed: boolean;
  begin_date: Date;
  end_date: Date;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed',
        style({ height: '0px', minHeight: '0', display: 'none' })
      ),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  /**************************************************************************/

  @ViewChild('paginatorTop', { static: false }) paginatorTop: MatPaginator;
  @ViewChild('paginatorBottom', { static: false })
  paginatorBottom: MatPaginator;
  @ViewChild('mainTableSort', { static: false }) mainTableSort: MatSort;
  @ViewChild(MatAccordion) accordion: MatAccordion;

  selection = new SelectionModel<any>(true, []);
  expandedElement: any;
  objectKeys = Object.keys;
  selectedColumn = 'all';
  defaultFilterPredicate: any;

  draws: any;
  games: any;

  filterColumns = [
    {
      name: 'all',
      header: 'All',
    },
    {
      name: 'id',
      header: 'ID',
    },
    {
      name: 'name',
      header: 'Name',
    },
    {
      name: 'event_type',
      header: 'Event Type',
    },
    {
      name: 'completed',
      header: 'Status',
    },
    {
      name: 'begin_date',
      header: 'Start Date',
    },
    {
      name: 'end_date',
      header: 'End Date',
    },
  ];

  menuItems = [
    {
      category: 'myCategory',
      label: 'Export to CSV',
      option: 'exportCSV',
      icon: 'get_app',
      tooltip: '',
    },
    {
      category: 'myCategory',
      label: 'Some Batch Function',
      option: 'someBatchFunction',
      icon: 'done_all',
      tooltip: '',
    },
    {
      category: 'myCategory',
      label: 'Delete Events',
      option: 'deleteEvents',
      icon: 'delete_forever',
      tooltip: '',
    },
    {
      category: 'myCategory',
      label: 'Refresh Data',
      option: 'refreshData',
      icon: 'refresh',
      tooltip: '',
    },
  ];

  /**************************************************************************/

  columns = [
    {
      name: 'arrow',
      header: '',
    },
    {
      name: 'checkbox',
      header: '',
    },
    {
      name: 'id',
      header: 'ID',
    },
    {
      name: 'name',
      header: 'Name',
    },
    {
      name: 'event_type',
      header: 'Event Type',
    },
    {
      name: 'completed',
      header: 'Status',
    },
    {
      name: 'begin_date',
      header: 'Start Date',
    },
    {
      name: 'end_date',
      header: 'End Date',
    },
  ];

  columnsTable = {
    arrow: '',
    id: 'ID',
    name: 'Name',
    event_type: 'Event Type',
    info: 'Info',
    completed: 'Status',
    begin_date: 'Start Date',
    end_date: 'End Date',
  };
  displayedColumns: string[] = this.columns.map((e) => e.name);
  dataSource = new MatTableDataSource<Organization>([]);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dashboardService: DashboardService,
    private apiService: ApiService,
    private spinnerService: SpinnerService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.spinnerService.on();

    // Get all events
    this.apiService.getEvents().subscribe((rows: any) => {
      if (rows === null || rows === undefined) {
        this.notificationService.showError('Could not fetch curling events', 'ERROR');
        this.spinnerService.off();
        return;
      }
      // console.log('Fetching curling events:');
      // console.log(rows);

      const newData = this.dataSource.data;
      for (let row of rows) {
        newData.push(row);
        // console.log(row);
      }
      this.dataSource.data = newData;
      this.spinnerService.off();
    });

    this.dataSource.paginator = this.paginator;
    this.defaultFilterPredicate = this.dataSource.filterPredicate;
  }

  /**************************************************************************/

  syncPaginatorTop(event: PageEvent) {
    this.paginatorTop.pageIndex = event.pageIndex;
    this.paginatorTop.pageSize = event.pageSize;
    this.paginatorTop.page.emit(event);
  }

  // Whether the number of selected elements matches the total number of rows
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  // Selects all rows if they are not all selected; otherwise clear selection
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  // The label for the checkbox on the passed row
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
      }`;
  }

  onClickTabs(event: MatTabChangeEvent, sample: any) {
    console.log('event => ', event);
    console.log('index => ', event.index);
    console.log('tab => ', event.tab);
    console.log('sample => ', sample);

    // Draws tab
    if (event.index === 2) {
      this.spinnerService.on();
      // Get all draws + games
      this.apiService.getDraws(sample.id).subscribe(rows => {
        this.draws = rows;
        console.log(this.draws);
        this.apiService.getGames(sample.id).subscribe((rows: any[]) => {
          // Convert integer to alpha
          this.games = rows;
          console.log(this.games);
          this.spinnerService.off();
        });
      });
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    console.log('filtered dataSource:', this.dataSource);
  }

  updFilterPredicate() {
    console.log(`selectedColumn: |${this.selectedColumn}|`);

    this.applyFilter(this.dataSource.filter);

    if (this.selectedColumn === 'all') {
      this.dataSource.filterPredicate = this.defaultFilterPredicate;
    } else {
      // Define how a filter value should be applied on your data when a filter value is given
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        console.log('data:', data);
        return data[this.selectedColumn]
          .toLowerCase()
          .includes(filter.trim().toLowerCase());
      };
    }

    console.log('this.dataSource:', this.dataSource);
  }

  exportCSV() {
    this.notificationService.showSuccess('Exported CSV', '');
  }

  someBatchFunction() {
    this.notificationService.showWarning('Some batch function...', '');
  }

  deleteEvents() {
    this.notificationService.showError('Event deleted!', '');
  }

  refreshData() {
    this.spinnerService.on();
    setTimeout(() => {
      this.notificationService.showInfo('Refreshed data', '');
      this.spinnerService.off();
    }, 2000);
  }

  filterGames(draw_id) {
    if (!this.games) {
      return [];
    }
    return this.games.filter(e => e.draw_id === draw_id);
  }
}
