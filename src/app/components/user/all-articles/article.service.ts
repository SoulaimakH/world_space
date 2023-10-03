import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConstantURL } from "src/app/ConstantsUrl";
import { articleModel } from "../Models/articleModel";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: "root",
})
export class ArticleService {
  articles: articleModel[] = [
    
  ];
  constructor(private http: HttpClient) {}

  addArticle(title: String, author: String, text: String):Observable<any> {
    return this.http.post(ConstantURL.ADD_ARTICLE_URL, {
      "title":title,
      "author":author,
      "text":text,
    }, httpOptions);
  }

  getArticle(id: number):Observable<any> {
    return this.http.get(ConstantURL.ADD_ARTICLE_URL+'/'+id);
  }
  getArticles(): articleModel[] {
    this.articles = [];
    this.http.get(ConstantURL.ARTICLES_LIST_URL).subscribe((article) => {
      Object.keys(article).map((i) => {
        this.articles.push(article[i]);
      });
    });
    return this.articles;
  }
  loggerArticle() {
    console.log(this.articles);
  }
  deleteArticle(article: articleModel) {
    const index = this.articles.indexOf(article);
    if (index < 0) {
      alert("Article innexistant");
    } else {
      this.articles.splice(index, 1);
    }
  }

  public uploadImage(image: File,id): Observable<any> {
    const formData = new FormData();

    formData.append('image', image);

    return this.http.post(ConstantURL.ADD_ARTICLE_image+id, formData);
  }
  
  addComment(comment):Observable<any> {
    return this.http.post(ConstantURL.ADD_ARTICLE_comment,comment, httpOptions);
  }
  
}
