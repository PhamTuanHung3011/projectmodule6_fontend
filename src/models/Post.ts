

export class Post{
  id!: number;
  content!: string;
  status!: string;
  date_Post!: Date;
  count_Like!: number;
  users!: any;
  comment!: Comment;
  listImage!: any;


  constructor( content: string, status: string, date_Post: Date, count_Like: number, ) {

    this.content = content;
    this.status = status;
    this.date_Post = date_Post;
    this.count_Like = count_Like;
  }


}
