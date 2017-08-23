export class User {

  constructor(
    public nome: string = '',
    public email: string = '',
    public nascimento: string = '',
    public senha: string = '',
    public senha2: string = '',
    public creditos: number = 0,
    public isAdmin: boolean = false,
  ) {}
}
