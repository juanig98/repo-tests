import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChatService } from '@internalModule/services/chat.service';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  display: boolean = false;
  chatForm: FormGroup = new FormGroup({
    message: new FormControl('', [Validators.minLength(2)]),
  })
  zoom: number = localStorage.getItem('zoom-chat') ? Number(localStorage.getItem('zoom-chat')) : 100;

  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
  }

  onSubmitChatForm(): void {
    console.log(this.chatForm.get('message')?.value);

    // this.chatService.sendMessage({ message: this.chatForm.get('message')?.value })

  }

  keyPress(event: any): void {
    if (event.charCode === 13 && this.chatForm.valid) this.onSubmitChatForm()
  }
}
