import { Directive, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPagination]',
  exportAs: 'pagination'
})
export class PaginationDirective {
  @Input() totalPages!:number;
  PageNo : number = 1;
  @Output() onChangeEventEmitter = new EventEmitter

  constructor(private renderer:Renderer2, private element:ElementRef) { }

  //Method is used to move to next page
  public onNext(){
    this.onSetPage(Math.min(this.totalPages, this.PageNo + 1))
  }

  //Method is used to move to previous page
  public onPrevious(){
    this.onSetPage(Math.max(1, this.PageNo - 1))
  }

  //Method is used to move to First page
  public onFirst(){
    this.onSetPage(1);
  }

  //Method is used to move to Last page
  public onLast(){
    this.onSetPage(this.totalPages);
  }

  //Method is used to show value
  public onSetPage(pageno:number){
    this.PageNo = pageno;
    this.renderer.setProperty(this.element.nativeElement, 'value', pageno);
    this.onChangeEventEmitter.emit(this.PageNo);
  }
}
