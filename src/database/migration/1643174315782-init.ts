import {MigrationInterface, QueryRunner,Table,TableForeignKey} from "typeorm";

export class init1643174315782 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        // menu
        await queryRunner.createTable(new Table({
            name: "menus",
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'sequence',
                    type: 'int',
                    isPrimary: true,
                    generationStrategy: 'increment',
                    isGenerated:true
                },
                {
                    name: "name",
                    type: "varchar"
                },
                {
                    name: "order",
                    type: "int"
                },
                {
                    name: "description",
                    type: "text",
                    isNullable:true
                },
                {
                    name: "parentid",
                    type: "int",
                    isNullable:true
                },
                {
                    name: "url",
                    type: "varchar"
                },
                {
                    name: "status",
                    type: "int"
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()',
                    isNullable:true
                },
                {
                    name:'user_created',
                    type:'int'
                },
                {
                    name:'user_updated',
                    type:'int',
                    isNullable:true
                },
                {
                    name:'icon',
                    type:'varchar',
                    isNullable:true
                }
            ]
        }), true)

        await queryRunner.createForeignKey("menus", new TableForeignKey({
            columnNames: ["parentid"],
            referencedColumnNames: ["sequence"],
            referencedTableName: "menus",
            onDelete: "CASCADE"
        }));

        // profile
        await queryRunner.createTable(new Table({
            name: "profiles",
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'sequence',
                    type: 'int',
                    isPrimary: true,
                    generationStrategy: 'increment',
                    isGenerated:true
                },
                {
                    name: "name",
                    type: "varchar"
                },
                {
                    name: "description",
                    type: "text",
                    isNullable:true
                },
                {
                    name: "status",
                    type: "int"
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()',
                    isNullable:true
                },
                {
                    name:'user_created',
                    type:'int'
                },
                {
                    name:'user_updated',
                    type:'int',
                    isNullable:true
                },
                {
                    name:'icon',
                    type:'varchar',
                    isNullable:true
                }
            ]
        }), true)

            // menus_has_profiles
            await queryRunner.createTable(new Table({
                name: "menus_has_profiles",
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'sequence',
                        type: 'int',
                        isPrimary: true,
                        generationStrategy: 'increment',
                        isGenerated:true
                    },
                    {
                        name: "menus_sequence",
                        type: "int"
                    },
                    {
                        name: "profiles_sequence",
                        type: "int"
                    },
                    {
                        name: "status",
                        type: "int"
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                        isNullable:true
                    },
                    {
                        name:'user_created',
                        type:'int'
                    },
                    {
                        name:'user_updated',
                        type:'int',
                        isNullable:true
                    }
                ]
            }), true)

            await queryRunner.createForeignKey("menus_has_profiles", new TableForeignKey({
                columnNames: ["menus_sequence"],
                referencedColumnNames: ["sequence"],
                referencedTableName: "menus",
                onDelete: "CASCADE"
            }));

            await queryRunner.createForeignKey("menus_has_profiles", new TableForeignKey({
                columnNames: ["profiles_sequence"],
                referencedColumnNames: ["sequence"],
                referencedTableName: "profiles",
                onDelete: "CASCADE"
            }));

            await queryRunner.query("ALTER TABLE menus_has_profiles ADD CONSTRAINT menus_sequence_profiles_sequence UNIQUE (menus_sequence,profiles_sequence);");


             // users
             await queryRunner.createTable(new Table({
                name: "users",
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'sequence',
                        type: 'int',
                        isPrimary: true,
                        generationStrategy: 'increment',
                        isGenerated:true
                    },
                    {
                        name: "name",
                        type: "varchar"
                    },
                    {
                        name: "last_name",
                        type: "varchar"
                    },
                    {
                        name: "phone",
                        type: "varchar"
                    },
                    {
                        name: "email",
                        type: "varchar"
                    },
                    {
                        name: "identification",
                        type: "varchar"
                    },
                    {
                        name: "password",
                        type: "varchar"
                    },
                    {
                        name: "status",
                        type: "int"
                    },
                    {
                        name: "profiles_sequence",
                        type: "int"
                    },
                    {
                        name: "role",
                        type: "int"
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                        isNullable:true
                    },
                    {
                        name:'user_created',
                        type:'int'
                    },
                    {
                        name:'user_updated',
                        type:'int',
                        isNullable:true
                    }
                ]
            }), true)
            
            await queryRunner.createForeignKey("users", new TableForeignKey({
                columnNames: ["profiles_sequence"],
                referencedColumnNames: ["sequence"],
                referencedTableName: "profiles",
                onDelete: "CASCADE"
            }));


            // users_authentications
            await queryRunner.createTable(new Table({
                name: "users_authentications",
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'sequence',
                        type: 'int',
                        isPrimary: true,
                        generationStrategy: 'increment',
                        isGenerated:true
                    },
                    {
                        name: "user_sequence",
                        type: "int",
                        isUnique:true
                    },
                    {
                        name: "code_auth",
                        type: "varchar"
                    },
                    {
                        name: "code_type",
                        type: "varchar",
                        length:"2"
                    },
                    {
                        name: "code_secret",
                        type: "varchar"
                    },
                    {
                        name: "code_imagen",
                        type: "text"
                    },
                    {
                        name: "status",
                        type: "int"
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                        isNullable:true
                    },
                    {
                        name:'user_created',
                        type:'int'
                    },
                    {
                        name:'user_updated',
                        type:'int',
                        isNullable:true
                    }
                ]
            }), true)


            await queryRunner.createForeignKey("users_authentications", new TableForeignKey({
                columnNames: ["user_sequence"],
                referencedColumnNames: ["sequence"],
                referencedTableName: "users",
                onDelete: "CASCADE"
            }));

            await queryRunner.query("ALTER TABLE users_authentications ADD CONSTRAINT code_type_user_sequence UNIQUE (code_type,user_sequence)");
            //notifications
            await queryRunner.createTable(new Table({
                name: "notifications",
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'sequence',
                        type: 'int',
                        isPrimary: true,
                        generationStrategy: 'increment',
                        isGenerated:true
                    },
                    {
                        name: "title",
                        type: "varchar"
                    },
                    {
                        name: "description",
                        type: "text"
                    },
                    {
                        name: "description_short",
                        type: "varchar"
                    },
                    {
                        name: "status",
                        type: "int"
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                        isNullable:true
                    },
                    {
                        name:'user_created',
                        type:'int'
                    },
                    {
                        name:'user_updated',
                        type:'int',
                        isNullable:true
                    }
                ]
            }), true)

            //notifications_users
            await queryRunner.createTable(new Table({
                name: "notifications_users",
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'sequence',
                        type: 'int',
                        isPrimary: true,
                        generationStrategy: 'increment',
                        isGenerated:true
                    },
                    {
                        name: "status",
                        type: "int"
                    },
                    {
                        name: "notifications_sequence",
                        type: "int"
                    },
                    {
                        name: "users_sequence",
                        type: "int"
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                        isNullable:true
                    },
                    {
                        name:'user_created',
                        type:'int'
                    },
                    {
                        name:'user_updated',
                        type:'int',
                        isNullable:true
                    }
                ]
            }), true)


            await queryRunner.createForeignKey("notifications_users", new TableForeignKey({
                columnNames: ["users_sequence"],
                referencedColumnNames: ["sequence"],
                referencedTableName: "users",
                onDelete: "CASCADE"
            }));

            await queryRunner.createForeignKey("notifications_users", new TableForeignKey({
                columnNames: ["notifications_sequence"],
                referencedColumnNames: ["sequence"],
                referencedTableName: "notifications",
                onDelete: "CASCADE"
            }));


            await queryRunner.createTable(new Table({
                name: "message_errors",
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'sequence',
                        type: 'int',
                        isPrimary: true,
                        generationStrategy: 'increment',
                        isGenerated:true
                    },
                    {
                        name: "title",
                        type: "varchar"
                    },
                    {
                        name: "code",
                        type: "varchar"
                    },
                    {
                        name: "description",
                        type: "text"
                    },
                    {
                        name: "status",
                        type: "int"
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                        isNullable:true
                    },
                    {
                        name:'user_created',
                        type:'int'
                    },
                    {
                        name:'user_updated',
                        type:'int',
                        isNullable:true
                    }
                ]
            }), true)

            
         

            await queryRunner.createTable(new Table({
                name: "users_password_historys",
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'sequence',
                        type: 'int',
                        isPrimary: true,
                        generationStrategy: 'increment',
                        isGenerated:true
                    },
                    {
                        name: "user_admin_sequence",
                        type: "int"
                    },
                    {
                        name: "password_new",
                        isNullable:true,
                        type: "varchar"
                    },
                    {
                        name: "password_old",
                        isNullable:true,
                        type: "varchar"
                    },
                    {
                        name: "status",
                        type: "int"
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                        isNullable:true
                    },
                    {
                        name:'user_created',
                        type:'int'
                    },
                    {
                        name:'user_updated',
                        type:'int',
                        isNullable:true
                    }
                ]
            }), true)

            await queryRunner.createForeignKey("users_password_historys", new TableForeignKey({
                columnNames: ["user_admin_sequence"],
                referencedColumnNames: ["sequence"],
                referencedTableName: "users",
                onDelete: "CASCADE"
            }));


    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        
        await queryRunner.dropTable("users_password_historys");
        await queryRunner.dropTable("message_errors");
        await queryRunner.dropTable("notifications_users");
        await queryRunner.dropTable("notifications");
        await queryRunner.dropTable("users_authentications");
        await queryRunner.dropTable("users");
        await queryRunner.dropTable("menus_has_profiles");
        await queryRunner.dropTable("profiles");
        await queryRunner.dropTable("menus");
    }
}