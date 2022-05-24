import { States } from '../shared/models/states.model';
import { Entity } from '../shared/models/entity.model';
import { Input } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Company } from '../shared/models/company';
import { CadastroService } from './services/cadastro.service';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() formsDataCompany: FormGroup;
  private subscriptions = new Subscription();
  entities: Entity[] = [];
  states: States[] = [];

  constructor(
    private FormBuilder: FormBuilder,
    private cadastroService: CadastroService,
    private router: Router
  ) {
    this.formsDataCompany = this.FormBuilder.group({
      responsavel: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      dataNascimento: ['', [Validators.required]],
      empresa: ['', [Validators.required]],
      entidade: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      endereco: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      complemento: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      estado: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  saveDataCompany() {
    const newCompany = this.setDataToCreateNewCompany();

    this.subscriptions.add(
      this.cadastroService.save(newCompany).subscribe(
        (response) => {
          Swal.fire('Sucesso', 'Solicitação cadastrada com sucesso');
        },
        (error) => {
          Swal.fire('Erro', 'Não foi possivél cadastra está empresa');
        },
        () => this.router.navigateByUrl('/dashboard')
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private setDataToCreateNewCompany(): Company {
    const newCompany = new Company();
    const form = this.formsDataCompany.value;

    newCompany.solicitante.ds_responsavel = form.responsavel;
    newCompany.solicitante.nu_cpf = form.cpf;
    newCompany.solicitante.date_nascimento = form.dataNascimento;
    newCompany.empresa.ds_nome_fantasia = form.empresa;
    newCompany.empresa.co_entidade_registro = form.entidade.key;
    newCompany.empresa.endereco.co_cep = form.cep;
    newCompany.empresa.endereco.ds_logradouro = form.endereco;
    newCompany.empresa.endereco.ds_bairro = form.bairro;
    newCompany.empresa.endereco.ds_complemento = form.complemento;
    newCompany.empresa.endereco.ds_municipio = form.cidade;
    newCompany.empresa.endereco.co_uf = form.estado;

    return newCompany;
  }

  getEntityRegister() {
    this.subscriptions.add(
      this.cadastroService.getEntityRegister().subscribe((response) => {
        this.entities = response;
      })
    );
  }

  getStates() {
    this.subscriptions.add(
      this.cadastroService.getStates().subscribe((response) => {
        this.states = response;
      })
    );
  }

  ngAfterViewInit() {
    this.getEntityRegister();
    this.getStates();
  }
}
