import { Component, OnInit, ViewChild} from '@angular/core';
import { Question } from 'src/app/services/question';
import { QuestionsService } from 'src/app/services/questions.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { CreateQuestionDialogComponent } from 'src/app/components/create question dialog/create-question-dialog.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  //Used by the mat-table element
  displayedColumns: string[] = ['id', 'name', 'email', 'delete'];
  @ViewChild(MatSort) sort: MatSort;
  tableDataSource: MatTableDataSource<Question> = new MatTableDataSource<Question>([]);
  destroy$: Subject<boolean> = new Subject<boolean>();

  //Used for search
  filterText: string;
  filterId: boolean = true;
  filterName: boolean = true;
  filterEmail: boolean = true;

  constructor(private questionsSvc: QuestionsService, private createQuestionDialog: MatDialog) {
    questionsSvc.questions$.pipe(takeUntil(this.destroy$)).subscribe(q => {
      this.tableDataSource.data = q; 
    });
  }
  
  ngOnInit() {
    this.tableDataSource.sort = this.sort;
    this.tableDataSource.filterPredicate = (data, filter: string) =>{
      let idMatches = data.id.toString() === filter;
      let nameMatches = data.name.toLocaleLowerCase().includes(filter);
      let emailMatches = data.email.toLocaleLowerCase().includes(filter);
      return this.filterId && idMatches || this.filterName && nameMatches || this.filterEmail && emailMatches;
    };
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  openCreateQuestionDialog(): void {
    const dialogRef = this.createQuestionDialog.open(CreateQuestionDialogComponent, {
      width: '40%'
    });
  }

  getQuestionId(index: number, item: Question): number {
    return item.id;
  }

  deleteQuestion(question: Question){
    this.questionsSvc.remove(question);
    this.tableDataSource.sort = this.sort;
  }

  applyFilter() {
    this.tableDataSource.filter = this.filterText.trim().toLowerCase();
  }
}