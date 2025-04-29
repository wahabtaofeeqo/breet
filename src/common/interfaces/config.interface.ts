export declare interface Config {
    env: string;
    port: string | number;
    jwt: {
      secret: string;
      accessExpirationMinutes: number;
      refreshExpirationDays: number;
    };
    database: {
      url: string;
      options: object;
    }
  }