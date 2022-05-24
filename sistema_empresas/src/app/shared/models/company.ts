export class Company {
  solicitante = new Solicitante();
  empresa = new Empresa();
  id!: number;
}

class Solicitante {
  ds_responsavel!: string;
  nu_cpf!: string;
  date_nascimento!: string;
}

class Empresa {
  ds_nome_fantasia!: string;
  co_entidade_registro!: number;
  co_natureza_juridica!: number;
  endereco = new Endereco();
}

class Endereco {
  co_cep!: number;
  ds_logradouro!: string;
  co_numero!: string;
  ds_complemento!: string;
  ds_bairro!: string;
  ds_municipio!: string;
  co_uf!: string;
}
