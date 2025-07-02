import { Routes } from '@angular/router';
import { UserListComponent } from './feature/user/user-list/user-list.component';
import { UserFormComponent } from './feature/user/user-form/user-form.component';
export const routes: Routes = [
    {path:'user-list',component:UserListComponent},
    {path:'user-form',component:UserFormComponent},
];
