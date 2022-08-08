import { Component, OnInit } from '@angular/core';



import { PostService } from 'src/app/post.service';
// modulos necesarios para trabajar con formularios
import { FormBuilder , FormGroup } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  public postForm : FormGroup
  constructor(
    public postService: PostService,
    public formBuilder:FormBuilder,
    public router: Router
  ) {
    // esto nos permite inicializar los campos de ese formulario
    this.postForm = this.formBuilder.group({
          title: [''],
          content: [''],
          author: [''],
    })
   }

  ngOnInit(): void {
  }
  onSubmit(){

    this.postService.createPost(this.postForm.value)
    // navega al componente show
    this.router.navigate([''])
  }
}
