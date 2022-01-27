import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FeedStore } from 'src/modules/feed/feed.store';
import { Room } from '../../room.model';
import { RoomStore } from '../../room.store';
import { RoomQueries } from '../../services/room.queries';
import { RoomService } from '../../services/room.service';
import { RoomSocketService } from '../../services/room.socket.service';
@Component({
  selector: 'app-room-menu',
  templateUrl: './room-menu.component.html',
  styleUrls: ['./room-menu.component.less']
})
export class RoomMenuComponent implements OnInit {
  roomId$: Observable<string | undefined>;
  rooms: Room[];

  constructor(private feedStore: FeedStore, private queries: RoomQueries, private roomSocketService: RoomSocketService, private router:Router) {
    
    this.roomId$ = feedStore.roomId$;
    this.rooms = [];
  }

  async ngOnInit() {
    this.rooms = await this.queries.getAll();
    if(this.feedStore.value.roomId == null) {
      this.router.navigate([`app/${this.feedStore.value.roomId}`]);
    }
  }

  goToRoom(room: Room) {
    // TODO naviguer vers app/[id de la room]
    console.log("app/"+room.id);
    this.router.navigate([`app/${room.id}`]);
  }

}
