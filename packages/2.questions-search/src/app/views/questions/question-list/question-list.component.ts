import { Component, OnInit, ViewChild } from '@angular/core';
import { Question } from 'src/app/services/question';
import { QuestionsService } from 'src/app/services/questions.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['name', 'phone', 'email', 'broker', 'actions'];
  dataSource: MatTableDataSource<Question>;
  globalFilter = '';
  filteredValues = {
    name: '', phone: '', broker: '',email: ''
  };
  nameFilter = new FormControl();
  phoneFilter = new FormControl();
  brokerFilter = new FormControl();
  emailFilter = new FormControl();
  constructor(private questionsSvc: QuestionsService) {
    questionsSvc.questions$.subscribe(q => {
      this.dataSource = new MatTableDataSource(q);
      this.refreshTable();
    });
  }

  ngOnInit() {
    this.refreshTable();

    this.nameFilter.valueChanges.subscribe((nameFilterValue) => {
      this.filteredValues['name'] = nameFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.phoneFilter.valueChanges.subscribe((phoneFilterValue) => {
      this.filteredValues['phone'] = phoneFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.emailFilter.valueChanges.subscribe((emailFilterValue) => {
      this.filteredValues['email'] = emailFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.brokerFilter.valueChanges.subscribe((brokerFilterValue) => {
      this.filteredValues['broker'] = brokerFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });


  }

  refreshTable(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.customFilterPredicate();
    this.dataSource.filter = JSON.stringify(this.filteredValues);
  }

  getQuestionId(index: number, item: Question): number {
    return item.id;
  }

  deleteQuestion(item: Question) {
    return this.questionsSvc.remove(item);
  }

  customFilterPredicate() {
    const myFilterPredicate = (data: Question, filter: string): boolean => {
      let searchString = JSON.parse(filter);
      return data.name.toString().trim().toLowerCase().indexOf(searchString.name) !== -1 
         && data.phone.toString().trim().toLowerCase().indexOf(searchString.phone) !== -1
         && data.broker.toString().trim().toLowerCase().indexOf(searchString.broker) !== -1
         && data.email.toString().trim().toLowerCase().indexOf(searchString.email) !== -1;
    }
    return myFilterPredicate;
  }
}
