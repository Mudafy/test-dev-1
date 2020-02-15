import { Component, OnInit, ViewChild } from '@angular/core';
import { Question } from 'src/app/models/question';
import { QuestionsService } from 'src/app/services/questions.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';
import { QuestionDeleteDialogComponent } from 'src/app/components/questions/question-delete-dialog/question-delete-dialog.component';
import { QuestionNewEditDialogComponent } from 'src/app/components/questions/question-new-edit-dialog/question-new-edit-dialog.component';
import { BrokersService } from 'src/app/services/brokers.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['name', 'phone', 'email', 'broker', 'actions'];
  dataSource: MatTableDataSource<any>;
  globalFilter = '';
  filteredValues = {
    name: '', phone: '', broker: '', email: ''
  };
  nameFilter = new FormControl();
  phoneFilter = new FormControl();
  brokerFilter = new FormControl();
  emailFilter = new FormControl();
  constructor(
    private questionsSvc: QuestionsService, 
    private brokersSvc: BrokersService, 
    public dialog: MatDialog
    ) {
    questionsSvc.questions$.subscribe(questions => {
      // let questionDataSource = questions.map(q => {
      //   brokerName: brokersSvc.getById(q.id).subscribe()
      // });
      this.dataSource = new MatTableDataSource(questions);
      this.refreshTable();
    });
  }

  ngOnInit() {
    this.refreshTable();        
    this.subscribeFilter(this.nameFilter, 'name');
    this.subscribeFilter(this.phoneFilter, 'phone');
    this.subscribeFilter(this.emailFilter, 'email');
    this.subscribeFilter(this.brokerFilter, 'broker');
  }

  subscribeFilter(formControl: FormControl, valueName: string) {
    formControl.valueChanges.subscribe((value) => {
      this.filteredValues[valueName] = value;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
  }

  refreshTable() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.customFilterPredicate();
    this.dataSource.filter = JSON.stringify(this.filteredValues);
  }

  getQuestionId(index: number, item: Question): number {
    return item.id;
  }

  addQuestion(){
    this.dialog.open(QuestionNewEditDialogComponent, {
      disableClose: true,
      autoFocus: true,
      width: "50%"
    });
  }

  deleteQuestion(item: Question): void {
    this.dialog.open(QuestionDeleteDialogComponent, {
      data: item
    });
  }

  customFilterPredicate() {
    const myFilterPredicate = (data: Question, filter: string): boolean => {
      let searchString = JSON.parse(filter);
      return data.name.toString().trim().toLowerCase().indexOf(searchString.name.toLowerCase()) !== -1
        && data.phone.toString().trim().toLowerCase().indexOf(searchString.phone.toLowerCase()) !== -1
        && data.broker.toString().trim().toLowerCase().indexOf(searchString.broker) !== -1
        && data.email.toString().trim().toLowerCase().indexOf(searchString.email.toLowerCase()) !== -1;
    }
    return myFilterPredicate;
  }
}
