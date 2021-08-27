import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OfertasComponent } from './ofertas/ofertas/ofertas.component';
import { DetailOfertasComponent } from './ofertas/detail-ofertas/detail-ofertas.component';
import { CreateOfertasComponent } from './ofertas/create-ofertas/create-ofertas.component';
import { ProfileOfertasComponent } from './ofertas/profile-ofertas/profile-ofertas.component';

import { InteressesComponent } from './interesses/interesses/interesses.component';

import { ConfirmadosComponent } from './confirmados/confirmados/confirmados.component';

import { DetailEstabelecimentoComponent } from './estabelecimentos/detail-estabelecimento/detail-estabelecimento.component';
import { CreateEstabelecimentoComponent } from './estabelecimentos/create-estabelecimento/create-estabelecimento.component';
import { ProfileEstabelecimentoComponent } from './estabelecimentos/profile-estabelecimento/profile-estabelecimento.component';

import { DetailFreelancerComponent } from './freelancers/detail-freelancer/detail-freelancer.component';
import { CreateFreelancerComponent } from './freelancers/create-freelancer/create-freelancer.component';
import { ProfileFreelancerComponent } from './freelancers/profile-freelancer/profile-freelancer.component';
import { HistoricoFreelancerComponent } from './freelancers/historico-freelancer/historico-freelancer.component';
import { UploadDocsComponent } from './freelancers/upload-docs/upload-docs.component';

import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

import { RegisterComponent } from'./users/register/register/register.component';
import { LoginComponent } from './users/login/login/login.component';
import { GroupsComponent } from './users/groups/groups/groups.component';

import { ConfigComponent } from './config/config/config.component';

import { RecoveryPswdComponent } from './users/recovery-pswd/recovery-pswd/recovery-pswd.component';

import { CanceladosComponent } from './cancelados/cancelados/cancelados.component';
import { PlanosComponent } from './planos/planos/planos.component';
import { TermosServicoComponent } from './documentos/termos-servico/termos-servico.component';
import { PoliticaPrivacidadeComponent } from './documentos/politica-privacidade/politica-privacidade.component';

import { ReportesComponent } from './reportes/reportes/reportes.component';


const routes: Routes = [
  { path: '',   redirectTo: '/dashboard', pathMatch: 'full' },

  { path: 'trampos', component: OfertasComponent },
  { path: 'novo-trampo', component: CreateOfertasComponent },
  { path: 'meus-trampos', component: ProfileOfertasComponent },
  { path: 'detalhes-do-trampo/:id', component: DetailOfertasComponent },

  { path: 'interesses', component: InteressesComponent },

  { path: 'confirmados', component: ConfirmadosComponent },

  { path: 'detalhes-do-estabelecimento/:id', component: DetailEstabelecimentoComponent },
  { path: 'novo-estabelecimento', component: CreateEstabelecimentoComponent },
  { path: 'profile', component: ProfileEstabelecimentoComponent },

  { path: 'detalhes-do-freelancer/:id', component: DetailFreelancerComponent },
  { path: 'novo-freelancer', component: CreateFreelancerComponent },
  { path: 'perfil', component: ProfileFreelancerComponent },
  { path: 'historico/:id', component: HistoricoFreelancerComponent },
  // { path: 'upload', component: UploadDocsComponent },

  { path: 'dashboard', component: DashboardComponent },

  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'options', component: GroupsComponent },

  { path: 'configuracoes', component: ConfigComponent },

  { path: 'recuperacao-senha', component: RecoveryPswdComponent },

  { path: 'cancelados', component: CanceladosComponent },
  
  { path: 'planos', component: PlanosComponent },

  { path: 'reportes/:id', component: ReportesComponent },

  { path: 'termos-servico', component: TermosServicoComponent},
  { path: 'politica-privacidade', component: PoliticaPrivacidadeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
