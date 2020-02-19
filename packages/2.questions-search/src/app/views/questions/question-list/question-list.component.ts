import { Component, OnInit, ViewChild } from '@angular/core';
import { Question } from 'src/app/models/question';
import { QuestionsService } from 'src/app/services/questions.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';
import { QuestionDeleteDialogComponent } from 'src/app/components/questions/question-delete-dialog/question-delete-dialog.component';
import { QuestionNewEditDialogComponent } from 'src/app/components/questions/question-new-edit-dialog/question-new-edit-dialog.component';
import { BrokersService } from 'src/app/services/brokers.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['name', 'phone', 'email', 'brokerName', 'actions'];
  dataSource: MatTableDataSource<any>;
  globalFilter = '';
  filteredValues = {
    name: '', phone: '', brokerName: '', email: ''
  };
  nameFilter = new FormControl();
  phoneFilter = new FormControl();
  brokerFilter = new FormControl();
  emailFilter = new FormControl();
  constructor(
    public questionsSvc: QuestionsService,
    public brokersSvc: BrokersService,
    public dialog: MatDialog
  ) {
  }



  ngOnInit() {

    this.brokersSvc.get().subscribe(brokers => {
      this.questionsSvc.get().subscribe(questions => {
        const questionDataSource = new Array<any>();
        questions.forEach(question => {
          const broker = brokers.find(b => b.id === question.broker);
          questionDataSource.push(
            {
              brokerName: broker ? broker.name : '',
              ...question
            });
          this.dataSource = new MatTableDataSource(questionDataSource);
          this.refreshTable();
        });
      });
    });

    this.subscribeFilter(this.nameFilter, 'name');
    this.subscribeFilter(this.phoneFilter, 'phone');
    this.subscribeFilter(this.emailFilter, 'email');
    this.subscribeFilter(this.brokerFilter, 'brokerName');
  }

  subscribeFilter(formControl: FormControl, valueName: string) {
    formControl.valueChanges.subscribe((value) => {
      this.filteredValues[valueName] = value;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
  }

  refreshTable() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (value, sortHeaderId) => value[sortHeaderId].toLocaleLowerCase();
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.customFilterPredicate();
    this.dataSource.filter = JSON.stringify(this.filteredValues);
  }

  getQuestionId(index: number, item: Question): string {
    return item.id;
  }

  addQuestion() {
    this.dialog.open(QuestionNewEditDialogComponent, {
      disableClose: true,
      autoFocus: true,
      minWidth: '50%'
    });
  }

  editQuestion(item: Question) {
    this.dialog.open(QuestionNewEditDialogComponent, {
      disableClose: true,
      autoFocus: true,
      minWidth: '50%',
      data: item
    });
  }


  deleteQuestion(item: Question): void {
    this.dialog.open(QuestionDeleteDialogComponent, {
      data: item
    });
  }

  customFilterPredicate() {
    const myFilterPredicate = (data: any, filter: string): boolean => {
      const searchString = JSON.parse(filter);
      return data.name.toString().trim().toLowerCase().indexOf(searchString.name.toLowerCase()) !== -1
        && data.phone.toString().trim().toLowerCase().indexOf(searchString.phone.toLowerCase()) !== -1
        && data.brokerName.toString().trim().toLowerCase().indexOf(searchString.brokerName.toLowerCase()) !== -1
        && data.email.toString().trim().toLowerCase().indexOf(searchString.email.toLowerCase()) !== -1;
    };
    return myFilterPredicate;
  }
}
