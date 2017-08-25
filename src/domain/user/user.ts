export class User {

  constructor(
    public email: string = '',
    public data_nascimento: string = '',
    public password: string = '',
    public creditos: number = 25,
    public is_superuser: boolean = true,
  ) {}
}
