import { CadastroService } from './../../cadastro/services/cadastro.service';
import { States } from '../../shared/models/states.model';
import { Entity } from '../../shared/models/entity.model';
import { Subscription } from 'rxjs';
import { DashboardService } from './../services/dashboard.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Company } from './../../shared/models/company';
import { Component, OnInit, Input, AfterViewInit, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-editar-cadastro',
  templateUrl: './editar-cadastro.component.html',
  styleUrls: ['./editar-cadastro.component.scss'],
})
export class EditarCadastroComponent implements OnInit, AfterViewInit {
  @Input() companyToEdit!: Company;
  private subscriptions = new Subscription();
  formsEditCompany: FormGroup;
  entities: Entity[] = [];
  states: States[] = [];
  @Output() finishData = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    private cadastroService: CadastroService
  ) {
    this.formsEditCompany = this.formBuilder.group({
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

  ngOnInit(): void {
    this.setDataToForm();
  }

  ngAfterViewInit() {
    this.getEntityRegister();
    this.getStates();
  }

  private setDataToForm() {
    this.formsEditCompany.patchValue({
      responsavel: this.companyToEdit.solicitante.ds_responsavel,
      cpf: this.companyToEdit.solicitante.nu_cpf,
      dataNascimento: this.companyToEdit.solicitante.date_nascimento,
      empresa: this.companyToEdit.empresa.ds_nome_fantasia,
      entidade: this.companyToEdit.empresa.co_entidade_registro,
      cep: this.companyToEdit.empresa.endereco.co_cep,
      endereco: this.companyToEdit.empresa.endereco.ds_logradouro,
      bairro: this.companyToEdit.empresa.endereco.ds_bairro,
      complemento: this.companyToEdit.empresa.endereco.ds_complemento,
      cidade: this.companyToEdit.empresa.endereco.ds_municipio,
      estado: this.companyToEdit.empresa.endereco.co_uf,
    });
  }

  private setDataToUpdateCompany(): Company {
    const updateCompany = new Company();
    const form = this.formsEditCompany.value;

    updateCompany.solicitante.ds_responsavel = form.responsavel;
    updateCompany.solicitante.nu_cpf = form.cpf;
    updateCompany.solicitante.date_nascimento = form.dataNascimento;
    updateCompany.empresa.ds_nome_fantasia = form.empresa;
    updateCompany.empresa.co_entidade_registro = form.entidade.key;
    updateCompany.empresa.endereco.co_cep = form.cep;
    updateCompany.empresa.endereco.ds_logradouro = form.endereco;
    updateCompany.empresa.endereco.ds_bairro = form.bairro;
    updateCompany.empresa.endereco.ds_complemento = form.complemento;
    updateCompany.empresa.endereco.ds_municipio = form.cidade;
    updateCompany.empresa.endereco.co_uf = form.estado;
    updateCompany.id = this.companyToEdit.id;

    return updateCompany;
  }

  update() {
    const company = this.setDataToUpdateCompany();

    this.subscriptions.add(
      this.dashboardService.update(company).subscribe((response) => {
        Swal.fire('Sucesso', 'Dados atualizados com sucesso');
        this.finishData.emit(true);
      })
    );
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
}
