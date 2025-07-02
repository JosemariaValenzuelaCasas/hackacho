import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { user } from '../../../core/interface/user';
import { UserService } from '../../../core/service/user.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit {
  @Input() user: user | null = null;
  @Output() close = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      birthdate: ['', Validators.required]
    });

    if (this.user) {
      this.form.patchValue(this.user);
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const userData: user = {
      ...this.form.value,
      idUser: this.user?.idUser
    };

    const request$ = this.user
      ? this.userService.update(userData)
      : this.userService.save(userData);

    request$.subscribe(() => this.close.emit()); // Cierra el modal después de guardar
  }

  cancel(): void {
    this.close.emit(); // Cierra sin guardar
  }
}
