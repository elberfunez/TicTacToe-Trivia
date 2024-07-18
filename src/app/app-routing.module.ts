import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameboardComponent } from './components/gameboard/gameboard.component';
import { HomeComponent } from './components/home/home.component';
import { QuestionbankComponent } from './components/questionbank/questionbank.component';

const routes: Routes = [
  {path: 'gameboard', component: GameboardComponent},
  {path: 'questionbank', component: QuestionbankComponent},
  {path: '', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
