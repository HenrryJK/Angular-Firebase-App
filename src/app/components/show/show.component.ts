import { Component, OnInit } from '@angular/core';

// Importamos el modelo y el servicio
import { Post } from 'src/app/post.model';
import { PostService } from 'src/app/post.service';



@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
    Posts : Post[]
    // mientras que el constructor se ejecuta antes.
  constructor(private postService:PostService) { }
  /// el onInit ejecuta todo , una vez que la pagina // ya esta renderizada , cuando el componente ha // sido inicializado
  ngOnInit(): void {
    //llamamos a nuestro servicio
    // susbscribe es un metodo que conecta el observer o observador
    // alert("HOLA SE HA CONECTADO CON FIREBASE!..")
    // console.log(this.postService.getPosts())
    this.postService.getPosts().subscribe( (res) =>{
        this.Posts = res.map ((e)=> {
            return{
              id: e.payload.doc.id,
              // lo que hace es un operador que simplifica la
           //   recogida de valores en una estructura de datos
              ...(e.payload.doc.data() as Post)
            };
        });
     //   console.log(this.Posts)
    });
  }
    deleteRow =(post) => this.postService.deletePost(post);


}
