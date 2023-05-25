import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { InternalRoutingModule } from './internal-routing.module';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'environments/environment';

const config: SocketIoConfig = { url: environment.socketUrl, options: environment.socketOptions };


@NgModule({
  declarations: [
  ],
  imports: [
    SocketIoModule.forRoot(config),
    InternalRoutingModule,
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class InternalModule { }
