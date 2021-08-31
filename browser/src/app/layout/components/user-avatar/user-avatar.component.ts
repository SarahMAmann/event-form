import { Component, Input, OnInit } from '@angular/core';
import { UserAvatar } from '@app/layout/components/user-avatar/user.avatar';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss']
})
export class UserAvatarComponent implements OnInit {
  @Input() size: any;

  @Input() set user(user: UserAvatar) {
    if (user.firstName?.length) this.firstInitial = user.firstName[0];
    if (user.lastName?.length) this.lastInitial = user.lastName[0];
    this.color = this.userAvatarColor(this.lastInitial);
    this.avatarImageUrl = user.avatarImageUrl;
  };

  private blueGroup = /^[a-eA-E]+$/;
  private yellowGroup = /^[f-jF-J]+$/;
  private purpleGroup = /^[k-oK-O]+$/;
  private tealGroup = /^[p-tP-T]+$/;
  private orangeGroup = /^[u-zU-Z]+$/;

  public firstInitial = '';
  public lastInitial = '';
  public color = 'blue';
  public avatarImageUrl: string;

  constructor() {
  }

  ngOnInit() {
  }

  private userAvatarColor(letter: string) {
    if (letter.match(this.blueGroup)) return 'blue';
    if (letter.match(this.yellowGroup)) return 'yellow';
    if (letter.match(this.purpleGroup)) return 'purple';
    if (letter.match(this.tealGroup)) return 'teal';
    if (letter.match(this.orangeGroup)) return 'orange';
    // default
    return 'blue';
  }
}
