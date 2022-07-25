import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: '127.0.0.1',
        port: 5432,
        username: 'postgres',
        database: 'JobtrainDB',
        password: '+postgres123',
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: false,
        migrations:["dist/migrations/*{.ts,.js}"],
        migrationsTableName: "migrations_typeorm",
        migrationsRun: true,
        logging: false,
      });

      return dataSource.initialize();
    },
  },
];
