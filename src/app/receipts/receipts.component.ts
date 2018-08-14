import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

interface Ticket {
  fotoTicket: string,
  fecha: number,
  tienda: string,
  total: number,
}

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.scss']
})
export class ReceiptsComponent implements OnInit {
  ticketsCollection: AngularFirestoreCollection<Ticket>;
  tickets: Observable<Ticket[]>;

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.ticketsCollection = this.afs.collection('tickets') //reference
    this.tickets = this.ticketsCollection.valueChanges()
  }

}
