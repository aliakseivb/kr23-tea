import {Component} from '@angular/core';
import {QuestionsType} from "../../../../../types/questions.type";

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent {
  questionItems: QuestionsType[] = [
    {
      questionTitle: 'Собираете ли вы подарочные боксы?',
      answerText: 'Да, у нас есть такая услуга. Мы можем собрать подарочный бокс на любой вкус, объем и стоимость!'
    },
    {
      questionTitle: 'Сколько у Вас разновидностей чая?',
      answerText: 'Мы постоянно расширяем свой ассортимент.'
    },
    {
      questionTitle: 'В какой срок осуществляется доставка?',
      answerText: 'Зависит от расстояния... Но мы стараемся ;)'
    },
    {
      questionTitle: 'У Вас обновляется ассортимент?',
      answerText: 'Конечно. Мы изучаем спрос и постоянно совершенствуемся в этом направлении, чтобы удовлетворить вкус и интерес каждого клиента.'
    },
    {
      questionTitle: 'Какого объема у Вас упаковка для чая?',
      answerText: 'Каждый клиент может заказать себе свой вес чая и подобрать подходящую ему упаковку (цвет, размер, материал).'
    },
  ]

  questionElements: HTMLCollection | null;

  constructor() {
    this.questionElements = document.getElementsByClassName('btn__ques');
  }

  showItem(elem: MouseEvent): void {
    if (!(elem.target as HTMLElement).classList.contains('show')) {
      this.removeShowClass();
      (elem.target as HTMLElement).classList.add('show');
      (elem.target as HTMLElement).nextElementSibling?.classList.add('show');
    } else {
      this.removeShowClass();
    }
  }

  removeShowClass(): void {
    Array.from(this.questionElements as HTMLCollection).forEach(elem => {
      elem.classList.remove('show');
      elem.nextElementSibling?.classList.remove('show');
    });
  }
}
