export class DiskModel {
  id: number;
  title: string;
  artist: string;
  songs: {index: number; title: string}[];
  isLent: boolean;
  borrower: string;
  lendDate: string;

  constructor(title: string, artist: string) {
    this.title = title;
    this.artist = artist;
    this.songs = [];
    this.isLent = false;
    this.borrower = "";
    this.lendDate = "";
  }  
}
