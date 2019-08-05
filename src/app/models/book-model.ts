import { DatetimeChangeEventDetail } from '@ionic/core';

export class BookModel {
  id: number;
  title: string;
  author: string;
  description: string;
  isLent: boolean;
  borrower: string;
  lendDate: string;

  constructor(title: string, author: string, description: string) {
    this.title = title;
    this.author = author;
    this.description = description;
    this.isLent = false;
    this.borrower = "";
    this.lendDate = "";
  }
}
