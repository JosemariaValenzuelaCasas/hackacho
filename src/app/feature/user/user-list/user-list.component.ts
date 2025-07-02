import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { user } from '../../../core/interface/user';
import { UserService } from '../../../core/service/user.service';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, UserFormComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  users: user[] = [];
  selectedUser: user | null = null;
  isModalOpen = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.findAll().subscribe(data => this.users = data);
  }

  findByStatus(status: boolean): void {
    this.userService.findByStatus(status).subscribe(data => this.users = data);
  }

  delete(id: number): void {
    this.userService.delete(id).subscribe(() => this.loadUsers());
  }

  restore(id: number): void {
    this.userService.restore(id).subscribe(() => this.loadUsers());
  }

  addUser(): void {
    console.log("Abriendo modal para nuevo usuario"); // 👈
    this.selectedUser = null;
    this.isModalOpen = true;
  }

  openModal(user: user): void {
    this.selectedUser = user;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.loadUsers();
  }
}
