import { Injectable } from '@angular/core';
// importamos los modulos para BD con Firestore
import { AngularFirestore } from '@angular/fire/compat/firestore';
// Importamos nuestra clase modelo
import { Post } from './post.model';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private angularfirestore:AngularFirestore ) { }
  // metodos para el CRUD
  getPosts(){
    return this.angularfirestore
              .collection("posts")
              .snapshotChanges()
  }
  getPostById(id){
    return this.angularfirestore
              .collection("posts")
              .doc(id)
              .valueChanges()
  }
  createPost(post:Post){
    return new Promise<any>  ((resolve , reject) => {
      this.angularfirestore
            .collection("posts")
            .add(post)
            .then((response)=>{
              console.log(response)
            },
            (error) =>{
               reject(error)
            })
    })
  }
  updatePost(post:Post,id){
      return this.angularfirestore
            .collection("posts")
            .doc(id)
            .update({
              title: post.title,
              content: post.content,
              author: post.author
            });

  }
  deletePost(post){
     return this.angularfirestore
            .collection("posts")
            .doc(post.id)
            .delete()
  }

}
