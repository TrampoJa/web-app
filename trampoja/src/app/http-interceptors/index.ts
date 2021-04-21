import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { NoopInterceptor } from './noop-interceptor';
import { LoggingInterceptor } from './logging-interceptor';
import { LoginInterceptor } from './login-interceptor';
import { AuthInterceptor } from './auth-interceptor';
import { GroupInterceptor } from './group-interceptor';
import { UploadInterceptor } from './upload-interceptor';
import { RecoveryInterceptor } from './recovery-interceptor';

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RecoveryInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: GroupInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoginInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: UploadInterceptor, multi: true }

];