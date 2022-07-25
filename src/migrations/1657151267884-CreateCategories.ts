import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateCategories1657151267884 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"users",
                columns:[
                    {
                        name:'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy:'increment',
                    },
                    {
                        name:'first_name',
                        type: 'text',
                        isNullable:false,
                    },
                    {
                        name: 'last_name',
                        type:'text',
                        isNullable:false,
                    },
                    {
                        name:'phone_number',
                        type:'bigint',
                        isUnique:true,
                        isNullable:false,
                    },
                    {
                        name:'id_country',
                        type:'text',
                        isNullable:false,
                        isUnique:true,
                    },
                    {
                        name:'email',
                        type:'text',
                        isUnique:true,
                        isNullable:false,
                    },
                    {
                        name:'encryption_password',
                        type:'text',
                        isNullable:false,
                    },
                    {
                        name:'created_date',
                        type:'timestamptz',
                        isNullable:false,
                        default: '(CURRENT_TIMESTAMP)'
                    },
                    {
                        name:'update_date',
                        type:'timestamptz',
                        isNullable:false,
                        default: '(CURRENT_TIMESTAMP)'
                    },
                    {
                        name:'status',//status
                        type:'text',
                        default:"'NULL'",
                    },
                ],
            }),
            false,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`DROP TABLE users`);
    }

}
