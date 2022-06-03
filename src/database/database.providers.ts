import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: '127.0.0.1',
        port: 5432,
        username: 'postgres',
        database: 'jobtraindatabase',
        password: '+postgres123',
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
      });

      return dataSource.initialize();
    },
  },
];
