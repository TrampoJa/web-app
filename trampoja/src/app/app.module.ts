import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder }  from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMaskModule } from 'ngx-mask'

import { AppRoutingModule } from './app-routing.module';

import { AppService } from './app.service';
import { OfertaService } from './ofertas/oferta.service';
import { InteresseService } from './interesses/interesse.service';
import { ConfirmadoService } from './confirmados/confirmado.service';
import { EstabelecimentoService } from './estabelecimentos/estabelecimento.service';
import { FreelancerService } from './freelancers/freelancer.service';
import { EnderecoService } from './enderecos/endereco.service';
import { UserService } from './users/user.service';
import { AvalicaoService } from './avaliacoes/avaliacao.service'; 
import { CanceladoService } from './cancelados/cancelado.service';
import { PlanoService } from './planos/planos.service';
import { ReporteService } from './reportes/reporte.service';

import { HttpErrorHandler } from './http-error-handler.service';
import { httpInterceptorProviders } from './http-interceptors/index';

import { AppComponent } from './app.component';
import { OfertasComponent } from './ofertas/ofertas/ofertas.component';
import { DetailOfertasComponent } from './ofertas/detail-ofertas/detail-ofertas.component';
import { CreateOfertasComponent } from './ofertas/create-ofertas/create-ofertas.component';
import { ProfileOfertasComponent } from './ofertas/profile-ofertas/profile-ofertas.component';
import { InteressesComponent } from './interesses/interesses/interesses.component';
import { CreateInteresseComponent } from './interesses/create-interesse/create-interesse.component';
import { ConfirmadosComponent } from './confirmados/confirmados/confirmados.component';
import { DetailEstabelecimentoComponent } from './estabelecimentos/detail-estabelecimento/detail-estabelecimento.component';
import { DetailFreelancerComponent } from './freelancers/detail-freelancer/detail-freelancer.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { ProfileEstabelecimentoComponent } from './estabelecimentos/profile-estabelecimento/profile-estabelecimento.component';
import { ProfileFreelancerComponent } from './freelancers/profile-freelancer/profile-freelancer.component';
import { CreateFreelancerComponent } from './freelancers/create-freelancer/create-freelancer.component';
import { HistoricoFreelancerComponent } from './freelancers/historico-freelancer/historico-freelancer.component';
import { UploadDocsComponent } from './freelancers/upload-docs/upload-docs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './users/register/register/register.component';
import { LoginComponent } from './users/login/login/login.component';
import { GroupsComponent } from './users/groups/groups/groups.component';
import { CreateEstabelecimentoComponent } from './estabelecimentos/create-estabelecimento/create-estabelecimento.component';
import { ConfigComponent } from './config/config/config.component';
import { CreateAvaliacaoComponent } from './avaliacoes/create-avaliacao/create-avaliacao.component';
import { CancelarComponent } from './cancelados/cancelar/cancelar.component';
import { CanceladosComponent } from './cancelados/cancelados/cancelados.component';
import { RecoveryPswdComponent } from './users/recovery-pswd/recovery-pswd/recovery-pswd.component';
import { PlanosComponent } from './planos/planos/planos.component';
import { TermosServicoComponent } from './documentos/termos-servico/termos-servico.component';
import { PoliticaPrivacidadeComponent } from './documentos/politica-privacidade/politica-privacidade.component';
import { ReportarComponent } from './reportes/reportar/reportar.component';
import { ReportesComponent } from './reportes/reportes/reportes.component';

import { TimePipe } from './pipes/time/time.pipe';
import { RealPipe } from './pipes/real/real.pipe';
import { FonePipe } from './pipes/fone/fone.pipe';
import { AgePipe } from './pipes/age/age.pipe';
import { FormatPipe } from './pipes/format/format.pipe';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    DataTablesModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    FlexLayoutModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [
    AppComponent,
    OfertasComponent,
    DetailOfertasComponent,
    CreateOfertasComponent,
    ProfileOfertasComponent,
    InteressesComponent,
    CreateInteresseComponent,
    ConfirmadosComponent,
    DetailEstabelecimentoComponent,
    DetailFreelancerComponent,
    DashboardComponent,
    ProfileEstabelecimentoComponent,
    ProfileFreelancerComponent,
    CreateFreelancerComponent,
    HistoricoFreelancerComponent,
    UploadDocsComponent,
    RegisterComponent,
    LoginComponent,
    GroupsComponent,
    CreateEstabelecimentoComponent,
    ConfigComponent,
    CreateAvaliacaoComponent,
    CancelarComponent,
    CanceladosComponent,
    RecoveryPswdComponent,
    PlanosComponent,
    TermosServicoComponent,
    PoliticaPrivacidadeComponent,
    ReportarComponent,
    ReportesComponent,
    TimePipe,
    RealPipe,
    FonePipe,
    AgePipe,
    FormatPipe
  ],
  providers: [
    AppService,
    OfertaService,
    InteresseService,
    ConfirmadoService,
    EstabelecimentoService,
    FreelancerService,
    EnderecoService,
    UserService,
    AvalicaoService,
    CanceladoService,
    PlanoService,
    ReporteService,
    HttpErrorHandler,
    FormBuilder,
    httpInterceptorProviders,
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule { }
