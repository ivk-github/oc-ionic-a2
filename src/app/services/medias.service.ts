import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Storage } from '@ionic/storage';

import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

import { BookModel } from '../models/book-model';
import { DiskModel } from '../models/disk-model';

@Injectable({
  providedIn: 'root'
})
export class MediasService {

  booksList$ = new Subject<BookModel[]>();
  booksList: BookModel[] = [];
/*
  booksList: BookModel[] = [
    {
      id: 1,
      title: "Harry Potter à l'école des sorciers",
      author: "J. K. Rowling",
      description: "Description du livre Harry Potter à l'école des sorciers",
      isLent: false,
      borrower: "",
      lendDate: ""
    },
    {
      id: 2,
      title: "Harry Potter et la Chambre des secrets",
      author: "J. K. Rowling",
      description: "Description du livre Harry Potter et la Chambre des secrets",
      isLent: false,
      borrower: "",
      lendDate: ""
    },
    {
      id: 3,
      title: "Harry Potter et le Prisonnier d'Azkaban",
      author: "J. K. Rowling",
      description: "Description du livre Harry Potter et le Prisonnier d'Azkaban",
      isLent: false,
      borrower: "",
      lendDate: ""
    },
    {
      id: 4,
      title: "Harry Potter et la Coupe de feu",
      author: "J. K. Rowling",
      description: "Description du livre Harry Potter et la Coupe de feu",
      isLent: false,
      borrower: "",
      lendDate: ""
    },
    {
      id: 5,
      title: "Harry Potter et l'Ordre du phénix",
      author: "J. K. Rowling",
      description: "Description du livre Harry Potter et l'Ordre du phénix",
      isLent: false,
      borrower: "",
      lendDate: ""
    },
    {
      id: 6,
      title: "Harry Potter et le Prince de sang-mêlé",
      author: "J. K. Rowling",
      description: "Description du livre Harry Potter et le Prince de sang-mêlé",
      isLent: false,
      borrower: "",
      lendDate: ""
    },
    {
      id: 7,
      title: "Harry Potter et les Reliques de la Mort",
      author: "J. K. Rowling",
      description: "Description du livre Harry Potter et les Reliques de la Mort",
      isLent: false,
      borrower: "",
      lendDate: ""
    }
  ];
*/

  disksList$ = new Subject<DiskModel[]>();
  disksList: DiskModel[] = [];
/*
  disksList: DiskModel[] = [
    {
      id: 1,
      title: "Please Please Me",
      artist: "The Beatles",
      songs: [
        {index: 1, title: "I Saw Her Standing There"},
        {index: 2, title: "Misery"},
        {index: 3, title: "Anna (Go to Him)"},
        {index: 4, title: "Chains"},
        {index: 5, title: "Boys"},
        {index: 6, title: "Ask Me Why"},
        {index: 7, title: "Please Please Me"},
        {index: 8, title: "Love Me Do"},
        {index: 9, title: "P.S. I Love You"},
        {index: 10, title: "Baby It's You"},
        {index: 11, title: "Do You Want to Know a Secret"},
        {index: 12, title: "A Taste of Honey"},
        {index: 13, title: "There's a Place"},
        {index: 14, title: "Twist and Shout"}
      ],
      isLent: false,
      borrower: "",
      lendDate: ""
    },
    {
      id: 2,
      title: "Help!",
      artist: "The Beatles",
      songs: [
        {index: 1, title: "Help!"},
        {index: 2, title: "The Night Before"},
        {index: 3, title: "You've Got to Hide Your Love Away"},
        {index: 4, title: "I Need You"},
        {index: 5, title: "Another Girl"},
        {index: 6, title: "You're Going to Lose That Girl"},
        {index: 7, title: "Ticket to Ride"},
        {index: 8, title: "Act Naturally"},
        {index: 9, title: "It's Only Love"},
        {index: 10, title: "You Like Me Too Much"},
        {index: 11, title: "Tell Me What You See"},
        {index: 12, title: "I've Just Seen a Face"},
        {index: 13, title: "Yesterday"},
        {index: 14, title: "Dizzy Miss Lizzy"}
      ],
      isLent: false,
      borrower: "",
      lendDate: ""
    },
    {
      id: 3,
      title: "Let It Be",
      artist: "The Beatles",
      songs: [
        {index: 1, title: "Two of Us"},
        {index: 2, title: "Dig a Pony"},
        {index: 3, title: "Across the Universe"},
        {index: 4, title: "I Me Mine"},
        {index: 5, title: "Dig It"},
        {index: 6, title: "Let It Be"},
        {index: 7, title: "Maggie Mae"},
        {index: 8, title: "I've Got a Feeling"},
        {index: 9, title: "One After 909"},
        {index: 10, title: "The Long and Winding Road"},
        {index: 11, title: "For You Blue"},
        {index: 12, title: "Get Back"}
      ],
      isLent: false,
      borrower: "",
      lendDate: ""
    }
  ];
*/

  constructor(private storage: Storage) {
    this.loadListsFromDevice();
  }

  emitBooks() {
    this.booksList$.next(this.booksList);
  }

  emitDisks() {
    this.disksList$.next(this.disksList);
  }

  isLentManager(media: any, lend: boolean, borrower: string, lendDate: string) {
    return new Promise((resolve, reject) => {
      if (media) {
        media.isLent = lend;
        media.borrower = borrower;
        media.lendDate = lendDate;
        this.saveListsOnDevice();
        resolve();
      } else {
        reject("Error update media !");
      }
    });
  }

  saveListsOnDevice() {
    this.saveBooksListOnDevice();
    this.saveDisksListOnDevice();
  }

  saveBooksListOnDevice() {
    this.storage.set('books', this.booksList);
  }

  saveDisksListOnDevice() {
    this.storage.set('disks', this.disksList);
  }

  loadListsFromDevice() {
    this.loadBooksListFromDevice();
    this.loadDisksListFromDevice();
  }

  loadBooksListFromDevice() {
    this.storage.get('books').then(
      (list) => {
        if (list && list.length) {
          this.booksList = list.slice();
        }
        this.emitBooks();
      }
    );
  }

  loadDisksListFromDevice() {
    this.storage.get('disks').then(
      (list) => {
        if (list && list.length) {
          this.disksList = list.slice();
        }
        this.emitDisks();
      }
    );
  }

  loadListsFromBackEnd() {
    return new Promise((resolve, reject) => {
      firebase.database().ref('books').once('value').then(
        (data: DataSnapshot) => {
          this.booksList = data.val();
          this.emitBooks();

          firebase.database().ref('disks').once('value').then(
            (data: DataSnapshot) => {
              this.disksList = data.val();
              this.emitDisks();
              resolve("Données récupérées avec succès !");
            },
            (error) => {
              reject(error);
            }
          );
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  saveListsOnBackEnd() {
    return new Promise((resolve, reject) => {
      firebase.database().ref('books').set(this.booksList).then(
        (data: DataSnapshot) => {
          firebase.database().ref('disks').set(this.disksList).then(
            (data: DataSnapshot) => {
              resolve("Données sauvegardées avec succès !");
            },
            (error) => {
              reject(error);
            }
          );
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
