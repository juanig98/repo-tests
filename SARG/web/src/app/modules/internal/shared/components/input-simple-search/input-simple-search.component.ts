import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { SharedService } from 'app/modules/internal/services/shared.service';
import { debounceTime, fromEvent, Observable } from 'rxjs';

@Component({
  selector: 'input-simple-search',
  templateUrl: './input-simple-search.component.html',
  styleUrls: ['./input-simple-search.component.scss']
})
export class InputSimpleSearchComponent implements AfterViewInit {
  search: string = "";
  lastSearch: string = "";
  source = new Observable<KeyboardEvent>();
  @ViewChild("InputSearch") inputSearch!: ElementRef;

  @Input() minLength: number = 5;
  @Output() onSearch = new EventEmitter<string>()
  constructor(
    private sharedService: SharedService
  ) { }

  ngAfterViewInit(): void {
    this.source = fromEvent(this.inputSearch.nativeElement, 'keyup');
    this.source
      .pipe(debounceTime(1500))
      .subscribe(() => {
        if (this.search == this.lastSearch) return;
        if (!this.search.length) { this.onSearch.emit(""); return; }
        if (this.search.length < this.minLength) {
          this.sharedService.setToast({ severity: 'info', summary: 'Debes ingresar más caracteres', life: 2000 })
          return;
        }
      });
    this.source
      .pipe(debounceTime(200))
      .subscribe(() => {

        if (this.search == this.lastSearch) return;

        if (!this.search.length) { this.onSearch.emit(""); return; }
        // if (!this.search.length && this.search != this.lastSearch) return;

        this.lastSearch = this.search;
        this.onSearch.emit(this.search)
      });
  }
}
