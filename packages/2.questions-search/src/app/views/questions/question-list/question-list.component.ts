import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Question } from 'src/app/services/question';
import { QuestionStub } from 'src/app/services/question-stub';
import { QuestionsService } from 'src/app/services/questions.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})

export class QuestionListComponent implements OnInit {

  questions: Array<Question>;
  questionsSource: Array<Question>;
  nameInput: string = "";
  phoneInput: string = "";
  emailInput: string = "";


  constructor(private questionsSvc: QuestionsService, public modal: MatDialog, private router: Router) {

  }

  displayedColumns: string[] = ['name', 'phone', 'email', 'actions'];
  dataSource = new MatTableDataSource();
  questionToEdit: Question;


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

    // this.questionsSource = this.questions; //Lo usamos para mostrar la tabla nuevamente cuando limpiamos los filtros
  }

  openModal(action, obj) {
    obj.action = action;
    const modalRef = this.modal.open(ModalComponent, {
      data: obj,
      width: '600px',
      minWidth: '300px',
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
        this.questionsSvc.add(questionStub, result.idBroker);
        this.questionsSource = [...this.questions];

      } else if (result.event == 'Editar') {

        const questionStub: QuestionStub = {
          name: result.data.name,
          phone: result.data.phone,
          email: result.data.email,
          message: result.data.message
        };


        this.questionsSvc.getById(result.data.id).subscribe(data => {
          this.questionToEdit = data;
        },
          error => { })

        this.questionsSvc.edit(this.questionToEdit, questionStub);
        this.questionsSource = [...this.questions];

      } else if (result.event == 'Borrar') {
        this.questionsSvc.remove(result.data);
        this.questionsSource = [...this.questions];
      }

    });
  }

  filterQuestion(valueName: string, valuePhone: string, valueEmail: string) {
    this.questionsSource = [...this.questions];
    this.questionsSvc.filterByQuestion(valueName, valuePhone, valueEmail);
  }

  cleanFilters() {
    this.nameInput = "";
    this.phoneInput = "";
    this.emailInput = "";

    this.questionsSvc.cleanFilters(this.questionsSource);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onDetailsQuestion(question: Question) {
    this.questionsSvc.questionDetails = question;
    this.router.navigate(['/questions', question.id]);
  }

  getQuestionId(index: number, item: Question): number {
    return item.id;
  }


  //Alternativa para el funcionamiento de los filtros
  // applyFilter(filterValue: string) {
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

}
