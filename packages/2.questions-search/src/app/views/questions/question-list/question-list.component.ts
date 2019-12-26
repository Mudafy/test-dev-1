import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Question } from 'src/app/services/question';
import { QuestionStub } from 'src/app/services/question-stub';
import { QuestionsService } from 'src/app/services/questions.service';
import { MatIcon, MatButton } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/components/modal/modal.component';



@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})

export class QuestionListComponent implements OnInit {

  questions: Array<Question>;

  constructor(private questionsSvc: QuestionsService, public modal: MatDialog) {

  }

  displayedColumns: string[] = ['name', 'phone', 'email', 'actions'];
  dataSource = new MatTableDataSource();


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;


  ngOnInit() {
    this.questionsSvc.questions$.subscribe(q => {
      this.questions = q;
      this.dataSource = new MatTableDataSource(this.questions);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openModal(action, obj) {
    obj.action = action;
    const modalRef = this.modal.open(ModalComponent, {
      data: obj,
      width: '600px',
      direction: "ltr"
    });

    //Analizamos que evento se quiso realizar, y segun eso realizamos la accion debida
    modalRef.afterClosed().subscribe(result => {

      if (result.event == 'Crear') {

        const questionStub: QuestionStub = {
          name: result.data.name,
          phone: result.data.phone,
          email: result.data.email,
          message: result.data.message
        };

        this.questionsSvc.add(questionStub, result.data.broker);

      } else if (result.event == 'Editar') {

        const questionStub: QuestionStub = {
          name: result.data.name,
          phone: result.data.phone,
          email: result.data.email,
          message: result.data.message
        };

        //Verificar porque se esta quedando colgado dentro del subscribe
        this.questionsSvc.getById(result.data.id).subscribe(data => {
          this.questionsSvc.edit(data, questionStub);
        },
          error => { })

      } else if (result.event == 'Borrar') {
        this.questionsSvc.remove(result.data);
      }

    });
  }

  filterQuestion(valueName: string, valuePhone: string, valueEmail: string) {
    this.questionsSvc.filterByQuestion(valueName, valuePhone, valueEmail);

  }

  cleanFilters() {
    this.questionsSvc.filterByQuestion("", "", "");
  }

  getQuestionId(index: number, item: Question): number {
    return item.id;
  }

}
