import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { debounceTime, map, Observable, startWith, Subscription, switchMap } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { selectSavedQueries } from 'src/app/state/books/books.selectors';
import { clearCurrentResult, loadQueryInitialData } from 'src/app/state/books/books.actions';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    CommonModule, MatToolbarModule, MatAutocompleteModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule 
  ],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {

  private autocompleteOptions$!: Observable<Array<string>>;
  private searchControlSubscription: Subscription | undefined;
  
  public seachControl: FormControl;
  public filteredOptions$!: Observable<Array<string>>;

  constructor(private store: Store<AppState>) {
    this.seachControl = new FormControl('');
    this.autocompleteOptions$ = this.store.select(selectSavedQueries);
  }

  ngOnInit(): void {
    this.filteredOptions$ = this.seachControl.valueChanges.pipe(
      debounceTime(300),
      startWith(''),
      switchMap(value => this.filterOptionsByInput(value))
    );
  }

  ngOnDestroy(): void {
    this.searchControlSubscription?.unsubscribe();
  }

  private filterOptionsByInput(input: string): Observable<Array<string>> {
    return this.autocompleteOptions$.pipe(
      map(values => values.filter(option => { 
        return option.toLowerCase().includes(input.toLowerCase())
     }))
    );
  }

  public onSearchClick(): void {
    const query = this.seachControl.value;
    if (!query) {
      return;
    }
    this.store.dispatch(clearCurrentResult());
    this.store.dispatch(loadQueryInitialData({query}));
  }

  public onClearClick(): void {
    this.seachControl.setValue('');
    this.store.dispatch(clearCurrentResult());
  }
}
