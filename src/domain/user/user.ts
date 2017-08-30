export class User {

  constructor(
    public email: string = '',
    public creditos: number = 25,
    public data_nascimento: string = '',
    public password: string = '',
    public is_superuser: boolean = true,
  ) {}
}
