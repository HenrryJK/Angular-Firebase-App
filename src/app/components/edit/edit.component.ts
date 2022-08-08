import { Component, OnInit } from '@angular/core';
// importamos las librerias de los servicios y del formulario reactivo y el enrutador o la libreria de rutas
import { PostService } from 'src/app/post.service';
import { FormBuilder,FormGroup } from "@angular/forms";
import { Router , ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  public editForm: FormGroup
  postRef:any

  constructor(
    public postService: PostService,
    public formBuilder:FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.formBuilder.group({
      title:[''],
      content:[''],
      author:['']
    })
   }

  ngOnInit(): void {
    // obtenemos el id por medio de una constante
    const id = this.activeRoute.snapshot.paramMap.get('id')
      //observables
      this.postService.getPostById(id).subscribe(res =>{
        this.postRef = res
        this.editForm = this.formBuilder.group({
          title: [this.postRef.title],
          content: [this.postRef.content],
          author: [this.postRef.author],
        })
      })
      console.log(id)
  }
    // llamamos a nuestro metodo que hemos creado
    onSubmit(){
       const id = this.activeRoute.snapshot.paramMap.get('id')
       // llamos por medio del servicio al observable y declaramos los valores almacenados en el editForm y el id de la constante
       this.postService.updatePost(this.editForm.value,id)
       this.router.navigate([''])
    }
}
