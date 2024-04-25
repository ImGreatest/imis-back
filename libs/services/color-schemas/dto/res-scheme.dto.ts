export interface IResScheme {
  [language: string]: IResScheme | IResSchemeResult;
}

export interface IResSchemeResult {
  color: string;
  url: string;
}
