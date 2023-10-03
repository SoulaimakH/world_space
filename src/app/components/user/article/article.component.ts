import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from '../../authentification/services/token-storage.service';
import { ArticleService } from '../all-articles/article.service';
import { articleModel } from '../Models/articleModel';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  // @Input() title : String = "title";
  // @Input() author : String = "author name";
  // @Input() text : String = "text";
  image :any
  imageBlobUrl
  article : articleModel = new articleModel()
  link
  articleId
  comment
  comments:[]=[]
  curentUser
  constructor(private tokenStorage: TokenStorageService,private sanitizer: DomSanitizer,private router: ActivatedRoute,private articleService: ArticleService) { 
    const reader = new FileReader();
    this.curentUser=this.tokenStorage.getUser()
    router.params.subscribe((params) => { 
      this.articleId=params['id']
     this.getArticle(params['id']) 
      
    });
  }

  ngOnInit(): void {
  }

  onSend(){
let comment={
  arcticleId:this.articleId,
  text:this.comment,
  UserId:this.curentUser.id,
  UserName:this.curentUser.login
}

this.articleService.addComment(comment).subscribe(
  (res) => {
    console.log(comment)
    this.comment=''
    this.getArticle(this.articleId)
  },
  (err) => {
  
  })
}


getArticle(id){
  this.articleService.getArticle(id) 
  .subscribe(
    data => {
     this.article=data.article
     this.comments=data.comments
      if(data.image){
        const ab = new ArrayBuffer(data.image.data.length);
        const view = new Uint8Array(ab);
        for (let i = 0; i <data.image.data.length; i++) {
          view[i] = data.image.data[i];
        }
    
        let blob = new Blob([ab], {type: data.imagetype});
         this.imageBlobUrl=blob
        this.link=this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob))
      }
  
  },
    err => {
    }
  );
}
}
