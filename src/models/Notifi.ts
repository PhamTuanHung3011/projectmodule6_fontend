export class Notifi{
  id!:any;
  since!:any;
  content!:any;
  from!:any;
  to!:any;
  status!:string;


  constructor(id: any, since: any, content: any, from: any, to: any, status: string) {
    this.id = id;
    this.since = since;
    this.content = content;
    this.from = from;
    this.to = to;
    this.status = status;
  }
}
